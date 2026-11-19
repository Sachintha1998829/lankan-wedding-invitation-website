import songTrack from '../assets/Song.mp3';
import brideImage from '../assets/bride.jpeg';
import groomImage from '../assets/groom.jpeg';

import image01 from '../assets/Image 01.jpeg';
import image02 from '../assets/Image 02.jpeg';
import image03 from '../assets/Image 03.jpeg';
import image04 from '../assets/Image 04.jpeg';


export const weddingData = {
  // === COUPLE NAMES (in Sinhala) ===
  bride: 'Prathibhashini Diwarathna',
  groom: 'Sachintha Pasindu',
  tagline: 'අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන්',
  
  // === WEDDING DATE (Edit this) ===
  weddingDate: '2027-01-20',
  weddingDateFormatted: '2027 ජනවාරි 20',
  
  // === INVITATION MESSAGE ===
  invitationTitle: 'ශ්‍රී සුභ මංගලම්',
  invitationMessage: 'දෙහදක් එක්වී, එකම සිහිනයක් ඔස්සේ අලුත් ජීවිතයකට පියනඟන සුන්දර මොහොතේ.අපගේ ජීවිතයේ සොඳුරුතම දිනය වන අපගේ විවාහ මංගල්‍යයට ඔබගේ ආදරණීය සහභාගීත්වය අපේක්ෂා කරමු.ඔබගේ පැමිණීමෙන් අපගේ සතුට තවත් අර්ථවත් වනු ඇත.',

  // === COUPLE DETAILS ===
  couple: {
    bride: {
      name: 'Prathibhashini Diwarathna',
      role: 'Bride',
      bio: 'නවරත්න බන්ඩාර මැතිතුමන් සහ එම මැතිණියගේ ආදරණීය දියණියයි. වෘත්තියෙන් රස පරීක්ෂක සහයිකාවක් වන ඇය, ගුණවත්කමින් හා දයාවෙන් පිරි හදවතක් ඇති යුවතියකි.',
      image: brideImage
    },
    groom: {
      name: 'Sachintha Pasindu',
      role: 'Groom',
      bio: 'ජගත් බාලසූරිය මැතිතුමන් සහ එම මැතිණියගේ ආදරණීය පුත්‍රයායි. වෘත්තියෙන් සංඛ්‍යාණ සහකාර වන ඔහු, බුද්ධිමත් මෙන්ම නිහතමානී ගතිගුණවලින් පිරි තරුණයෙකි.',
      image: groomImage
    }
  },

  // === LOVE STORY TIMELINE (Edit this) ===
  story: [
    {
      year: '2020',
      title: 'පළමු හමුවීම',
      description: 'අහම්බෙන් සිදුවූ ඒ පළමු හමුවීම අපේ ජීවිතවල සුන්දරම කතාවක ආරම්භය වේවි කියලා එදා අපි හිතුවේ නැහැ.'
    },
    {
      year: '2020',
      title: 'අපේ ආදර කතාවේ ආරම්භය',
      description: 'පුංචි සිනහවකින්, නිහඬ බැල්මකින් ඇරඹුණු ඒ හමුවීම කාලයත් සමඟ ආදරයක් බවට පත්වුණා. අද ඒ ආදරය ජීවිත කාලය පුරාම එකට ගමන් කරන සුන්දර පොරොන්දුවක් බවට පත්වෙලා. ❤️'
    },
    {
      year: '2025',
      title: 'දෙමාපියන්ගේ ආශීර්වාදය ලැබුණු දා',
      description: 'පේ ආදරය විවාහ දිවියක් කරා ගෙන යාමට පවුල් දෙකේම ආශීර්වාදය සහ ආදරය හිමි වූ ඒ මොහොත අපේ ජීවිතයේ අමතක නොවන සොඳුරු මතකයක් ලෙස සදා රැඳෙනු ඇත. ❤️💍'
    },
    {
      year: '2027',
      title: 'අපගේ විශේෂ දිනය',
      description: 'ආදරයෙන් ඇරඹුණු අපේ ගමන, දෙමාපියන්ගේ ආශීර්වාදය මැද ජීවිත කාලය පුරාම එකට අත්වැල් බැඳගෙන යාමට ගත් සුන්දර තීරණයක් බවට පත්වුණා. අද ඒ සියලු සිහින සැබෑ කරමින්, අපේ ජීවිත දෙක එකම ගමනකට එක්වන සොඳුරු දිනයයි. ආදරය, විශ්වාසය සහ සතුට පිරුණු නව දිවියකට අපි පියනඟන්නෙමු. ❤️'
    }
  ],

  // === EVENT DETAILS (Edit these) ===
  eventDetails: {
    venue: 'නෙත්මි උත්සව ශාලාව, දිවුලපිටිය',
    venueEn: 'Nethmi Hotel & Banquet, Divulapitiya',
    address: 'කුරුනෑගල පාර, දිවුලපිටිය',
    addressEn: 'Kurunagala Road,Divulapitiya',
    date: '2027 ජනවාරි 20',
    time: 'පෙ.ව. 10:00',
    dressCode: 'සිංහල සාම්ප්‍රදායික මංගල ඇඳුම් විලාසිතා',
    dressCodeEn: 'Traditional Sinhala Wedding Attire',
    contact: '757405459 / 716239180',
    email: 'pasindubalasooriya1998@gmail.com'
  },

  // === GALLERY IMAGES ===
gallery: [
  image01,
  image02,
  image03,
  image04
],

  // === MUSIC CONFIG (Edit audio file path) ===
  music: {
    enabled: true,
    audioPath: songTrack,
    showEnterOverlay: true
  }
};
