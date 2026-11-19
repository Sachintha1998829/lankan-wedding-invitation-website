import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Footer = ({ bride, groom, weddingDateFormatted }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-deep-maroon via-maroon to-dark-text text-ivory">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="text-gold" size={32} />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold">
                ස්තුතියි
              </h2>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
              >
                <Heart className="text-gold" size={32} />
              </motion.div>
            </div>
            <p className="text-xl md:text-2xl font-serif font-light italic mb-6 text-cream">
              ඔබට අපගේ ආදරණීය ස්තුතිය! 🌸
            </p>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg font-serif leading-relaxed">
              ඔබගේ පැමිණීම, ආශීර්වාද සහ සුබ පැතුම් අපට වචනයෙන් විස්තර කළ නොහැකි තරම් වටිනවා. අපගේ මේ සුන්දර ගමනේ කොටස්කරුවන් වීම පිළිබඳව ඔබ සැමට බෙහෙවින් ස්තූතියි. ❤️
            </p>
          </motion.div>
        </ScrollReveal>

        <motion.div
          className="border-t border-gold/30 pt-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Couple Name */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gold/70 text-sm font-serif font-semibold mb-3 tracking-widest">
                මනාල යුවල
              </p>
              <p className="font-serif text-3xl font-bold text-gold">
                {bride} & {groom}
              </p>
            </motion.div>

            {/* Date */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gold/70 text-sm font-serif font-semibold mb-3 tracking-widest">
                දිනය
              </p>
              <p className="font-serif text-3xl font-bold text-gold">
                {weddingDateFormatted}
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gold/70 text-sm font-serif font-semibold mb-3 tracking-widest">
                අපට සම්බන්ධ වෙන්න
              </p>
              <p className="font-serif text-lg font-semibold">
                pasindubalasooriya1998@gmail.com
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Social/Contact Links */}
        <motion.div
          className="flex justify-center gap-8 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="mailto:pasindubalasooriya1998@gmail.com"
            className="flex items-center gap-3 text-cream/70 hover:text-gold transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
          >
            <div className="p-3 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-all">
              <Mail size={20} className="group-hover:text-gold transition-colors" />
            </div>
            <span className="font-serif">විද්‍යුත් තැපෑල</span>
          </motion.a>
          <motion.a
            href="tel:+9471 623 9180"
            className="flex items-center gap-3 text-cream/70 hover:text-gold transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
          >
            <div className="p-3 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-all">
              <Phone size={20} className="group-hover:text-gold transition-colors" />
            </div>
            <span className="font-serif">දුරකථන</span>
          </motion.a>
          <div className="flex items-center gap-3 text-cream/70">
            <div className="p-3 bg-gold/10 rounded-full">
              <MapPin size={20} />
            </div>
            <span className="font-serif">ශ්‍රී ලංකා</span>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          className="border-t border-gold/30 pt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-cream/60 font-serif text-lg mb-2">
           ......
          </p>
          <p className="text-cream/50 text-sm font-serif">
            © {currentYear} {bride} & {groom}..
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
