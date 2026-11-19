import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { FloralDivider } from '../components/UI';

// This is the public Google Apps Script Web App endpoint.
const RSVP_API_URL = 'https://script.google.com/macros/s/AKfycbyvMAtyZQRPx5vSzdGCZQFc6H_3jcBDdLoLyyxx5DtJ9CTzrpQbhbERVWlJ58tvF_5lnw/exec';

const requestRsvpApi = (params) => new Promise((resolve, reject) => {
  const callbackName = `__weddingRsvpCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const script = document.createElement('script');
  const query = new URLSearchParams({ ...params, callback: callbackName, _: String(Date.now()) });
  let timeoutId;

  const cleanup = () => {
    if (timeoutId) window.clearTimeout(timeoutId);
    delete window[callbackName];
    script.remove();
  };

  window[callbackName] = (result) => {
    cleanup();
    resolve(result);
  };

  script.onerror = () => {
    cleanup();
    reject(new Error('සම්බන්ධතාවයේ ගැටලුවක් ඇතිවුණා. නැවත උත්සාහ කරන්න.'));
  };

  timeoutId = window.setTimeout(() => {
    cleanup();
    reject(new Error('ප්‍රතිචාරය ලැබීමට ප්‍රමාදයි. නැවත උත්සාහ කරන්න.'));
  }, 20000);

  script.src = `${RSVP_API_URL}?${query.toString()}`;
  document.body.appendChild(script);
});

const RSVP = () => {
  const invitationToken = new URLSearchParams(window.location.search).get('guest') || '';
  const [guest, setGuest] = useState(null);
  const [loadingGuest, setLoadingGuest] = useState(true);
  const [guestError, setGuestError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    attending: 'Yes',
    guestCount: '1',
    message: '',
  });

  useEffect(() => {
    let active = true;

    if (!invitationToken) {
      setGuestError('මෙම RSVP පෝරමය භාවිතා කිරීමට ඔබට ලැබුණු විශේෂ ආරාධනා සබැඳිය විවෘත කරන්න.');
      setLoadingGuest(false);
      return () => { active = false; };
    }

    requestRsvpApi({ action: 'guest', token: invitationToken })
      .then((result) => {
        if (!active) return;
        if (result?.status !== 'success' || !result.guest) {
          setGuestError(result?.message || 'මෙම ආරාධනා සබැඳිය වලංගු නැහැ. කරුණාකර අපව අමතන්න.');
          return;
        }
        setGuest(result.guest);
        setFormData((previous) => ({
          ...previous,
          guestCount: '1',
        }));
      })
      .catch((error) => {
        if (active) setGuestError(error.message);
      })
      .finally(() => {
        if (active) setLoadingGuest(false);
      });

    return () => { active = false; };
  }, [invitationToken]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!guest || submitting) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const result = await requestRsvpApi({
        action: 'submit',
        token: invitationToken,
        attending: formData.attending,
        guestCount: formData.attending === 'Yes' ? formData.guestCount : '0',
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (result?.status !== 'success') {
        throw new Error(result?.message || 'ඔබගේ පිළිතුර සුරැකීමට නොහැකි වුණා. නැවත උත්සාහ කරන්න.');
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message || 'දෝෂයක් ඇතිවුණා. නැවත උත්සාහ කරන්න.');
    } finally {
      setSubmitting(false);
    }
  };

  const maxGuests = Math.max(1, Number(guest?.maxGuests) || 1);
  const isFamily = String(guest?.type || '').toLowerCase() === 'family';

  if (submitted) {
    return (
      <section id="rsvp" className="py-32 px-4 bg-gradient-to-b from-champagne via-cream to-ivory">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
              >
                <CheckCircle className="text-gold" size={80} />
              </motion.div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-maroon mb-4">ස්තුතියි!</h2>
            <p className="text-xl md:text-2xl text-dark-text/70 mb-4 font-serif">ඔබගේ පිළිතුර සාර්ථකව ලැබුණා.</p>
            <p className="text-lg text-dark-text/60 font-serif">
              {formData.attending === 'Yes'
                ? 'එදිනට ඔබගේ පැමිණීම අපි සතුටින් බලාපොරොත්තු වෙමු.'
                : 'ඔබගේ පිළිතුර අපට දැනුම් දුන්නාට ස්තුතියි.'}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-32 px-4 bg-gradient-to-b from-champagne via-cream to-ivory">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-deep-maroon mb-6">
              අපේ සතුට බෙදාගන්න ඔබත් එනවාද?
            </h2>
            <FloralDivider />
            <p className="text-lg md:text-xl text-dark-text/70 font-serif">
              කරුණාකර ඔබගේ සහභාගිත්වය තහවුරු කරන්න
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {loadingGuest ? (
            <div className="rounded-3xl border-2 border-gold/20 bg-ivory p-10 text-center text-deep-maroon font-serif">
              <Loader2 className="animate-spin mx-auto mb-3" size={32} />
              ඔබගේ ආරාධනාව පරීක්ෂා කරමින්...
            </div>
          ) : guestError ? (
            <div className="rounded-3xl border-2 border-gold/20 bg-ivory p-8 text-center text-deep-maroon font-serif" role="alert">
              {guestError}
            </div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-ivory to-cream rounded-3xl shadow-luxury p-6 md:p-12 space-y-8 border-2 border-gold border-opacity-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <label className="block text-deep-maroon font-serif font-semibold mb-3 text-lg">
                  ආරාධනා කරනු ලබන්නේ
                </label>
                <div className="w-full px-4 py-3 border-2 border-gold/30 rounded-xl bg-ivory/50 text-dark-text font-serif">
                  {guest?.name}
                </div>
                <p className="mt-2 text-sm text-dark-text/60 font-serif">
                  {isFamily ? `පවුලේ සාමාජිකයන් සඳහා උපරිම ${maxGuests} දෙනෙකුට පිළිතුරු ලබාදිය හැකියි.` : 'මෙම ආරාධනාව ඔබ වෙනුවෙන් නිකුත් කර ඇත.'}
                </p>
              </div>

              <div>
                <label className="block text-deep-maroon font-serif font-semibold mb-4 text-lg">සහභාගී වනවාද? *</label>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center cursor-pointer group">
                    <input type="radio" name="attending" value="Yes" checked={formData.attending === 'Yes'} onChange={handleChange} className="mr-3 w-5 h-5 accent-gold" />
                    <span className="text-dark-text font-serif text-lg group-hover:text-gold transition-colors">ඔව්, සහභාගි වීමට බලාපොරොත්තු වෙමි.</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input type="radio" name="attending" value="No" checked={formData.attending === 'No'} onChange={handleChange} className="mr-3 w-5 h-5 accent-gold" />
                    <span className="text-dark-text font-serif text-lg group-hover:text-gold transition-colors">සමාවෙන්න, සහභාගි වීමට නොහැකියි.</span>
                  </label>
                </div>
              </div>

              {formData.attending === 'Yes' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <label className="block text-deep-maroon font-serif font-semibold mb-3 text-lg">පැමිණෙන අමුත්තන් ගණන *</label>
                  <select
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-xl focus:outline-none focus:border-opacity-100 focus:shadow-gold-glow transition-all bg-ivory/50 text-dark-text font-serif"
                  >
                    {Array.from({ length: maxGuests }, (_, index) => index + 1).map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'අමුත්තා' : 'අමුත්තන්'}</option>
                    ))}
                  </select>
                </motion.div>
              )}

              <div>
                <label className="block text-deep-maroon font-serif font-semibold mb-3 text-lg">දුරකථන අංකය (විකල්ප)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-xl focus:outline-none focus:border-opacity-100 focus:shadow-gold-glow transition-all bg-ivory/50 text-dark-text font-serif"
                  placeholder="07XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-deep-maroon font-serif font-semibold mb-3 text-lg">විද්‍යුත් තැපෑල (විකල්ප)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-xl focus:outline-none focus:border-opacity-100 focus:shadow-gold-glow transition-all bg-ivory/50 text-dark-text font-serif"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-deep-maroon font-serif font-semibold mb-3 text-lg">පණිවිඩය (විකල්ප)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gold border-opacity-30 rounded-xl focus:outline-none focus:border-opacity-100 focus:shadow-gold-glow transition-all resize-none bg-ivory/50 text-dark-text font-serif"
                  placeholder="ඔබගේ පණිවිඩය..."
                  rows="4"
                />
              </div>

              {submitError && <p className="text-red-700 text-sm font-serif text-center" role="alert">{submitError}</p>}

              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="btn-luxury relative px-8 md:px-12 py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={submitting ? undefined : { scale: 1.05 }}
                  whileTap={submitting ? undefined : { scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : <Heart size={20} />}
                    {submitting ? 'යවමින්...' : 'ඔබගේ පිළිතුරු තහවුරු කරන්න'}
                  </span>
                </motion.button>
              </div>
            </motion.form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default RSVP;
