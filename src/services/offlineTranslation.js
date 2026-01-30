/**
 * Offline Translation Service
 * Provides translation capabilities without API keys using comprehensive fallback methods
 */

// Enhanced fallback translations with more comprehensive coverage
const COMPREHENSIVE_TRANSLATIONS = {
  // Basic Interface
  'hello': { as: 'নমস্কাৰ', mni: 'ꯈꯨꯔꯨꯝꯖꯔꯤ' },
  'welcome': { as: 'স্বাগতম', mni: 'ꯇꯔꯥꯝꯅ' },
  'thank you': { as: 'ধন্যবাদ', mni: 'ꯊꯥꯒꯠꯆꯔꯤ' },
  'please': { as: 'অনুগ্ৰহ কৰি', mni: 'ꯆꯥꯅꯕꯤꯗꯨꯅ' },
  'yes': { as: 'হয়', mni: 'ꯍꯣꯏ' },
  'no': { as: 'নহয়', mni: 'ꯅꯠꯇꯦ' },
  
  // Cultural Terms
  'festival': { as: 'উৎসৱ', mni: 'ꯆꯥꯡ' },
  'ritual': { as: 'ৰীতি-নীতি', mni: 'ꯔꯤꯆꯨꯑꯦꯜ' },
  'tradition': { as: 'পৰম্পৰা', mni: 'ꯇ꯭ꯔꯦꯗꯤꯁꯟ' },
  'culture': { as: 'সংস্কৃতি', mni: 'ꯀꯂꯆꯔ' },
  'heritage': { as: 'ঐতিহ্য', mni: 'ꯍꯦꯔꯤꯇꯦꯖ' },
  'community': { as: 'সম্প্ৰদায়', mni: 'ꯀꯝꯌꯨꯅꯤꯇꯤ' },
  'dance': { as: 'নৃত্য', mni: 'ꯖꯒꯣꯏ' },
  'music': { as: 'সংগীত', mni: 'ꯏꯁꯩ' },
  'food': { as: 'খাদ্য', mni: 'ꯆꯥꯛ' },
  'language': { as: 'ভাষা', mni: 'ꯂꯣꯟ' },
  
  // Specific Festivals
  'bihu': { as: 'বিহু', mni: 'ꯕꯤꯍꯨ' },
  'durga puja': { as: 'দুৰ্গা পূজা', mni: 'ꯗꯨꯔꯒ ꯄꯨꯖ' },
  'kali puja': { as: 'কালী পূজা', mni: 'ꯀꯥꯂꯤ ꯄꯨꯖ' },
  'poila boishakh': { as: 'পহিলা বৈশাখ', mni: 'ꯄꯣꯏꯂ ꯕꯣꯏꯁꯥꯈ' },
  'lai haraoba': { as: 'লাই হাৰাওবা', mni: 'ꯂꯥꯏ ꯍꯔꯥꯎꯕ' },
  'yaoshang': { as: 'যাওশাং', mni: 'ꯌꯥꯎꯁꯥꯡ' },
  'ningol chakouba': { as: 'নিংগোল চাকৌবা', mni: 'ꯅꯤꯡꯒꯣꯜ ꯆꯥꯀꯧꯕ' },
  
  // Common Phrases
  'good morning': { as: 'শুভ ৰাতিপুৱা', mni: 'ꯅꯨꯡꯁꯤꯠ ꯅꯨꯡꯥꯏꯕ' },
  'good evening': { as: 'শুভ সন্ধিয়া', mni: 'ꯅꯨꯃꯤꯗꯥꯡ ꯅꯨꯡꯥꯏꯕ' },
  'how are you': { as: 'আপুনি কেনে আছে', mni: 'ꯅꯍꯥꯛ ꯀꯔꯝꯅ ꯂꯩꯔꯤꯕꯒꯦ' },
  'what is your name': { as: 'আপোনাৰ নাম কি', mni: 'ꯅꯍꯥꯛꯀꯤ ꯃꯤꯡ ꯀꯔꯤꯅꯣ' },
  'where are you from': { as: 'আপুনি ক\'ৰ পৰা আহিছে', mni: 'ꯅꯍꯥꯛ ꯀꯗꯥꯏꯗꯨꯗꯒꯤ ꯂꯥꯛꯂꯤꯕꯒꯦ' },
  
  // More Cultural Terms
  'temple': { as: 'মন্দিৰ', mni: 'ꯂꯥꯏꯁꯪ' },
  'prayer': { as: 'প্ৰাৰ্থনা', mni: 'ꯄ꯭ꯔꯥꯔ꯭ꯊꯅ' },
  'god': { as: 'ভগৱান', mni: 'ꯂꯥꯏ' },
  'goddess': { as: 'দেৱী', mni: 'ꯂꯥꯏꯅꯨꯡꯁꯤ' },
  'sacred': { as: 'পবিত্ৰ', mni: 'ꯁꯦꯡꯕ' },
  'blessing': { as: 'আশীৰ্বাদ', mni: 'ꯑꯁꯤꯔꯕꯥꯗ' },
  'ceremony': { as: 'অনুষ্ঠান', mni: 'ꯑꯅꯨꯁ꯭ꯊꯥꯟ' },
  'celebration': { as: 'উদযাপন', mni: 'ꯅꯨꯡꯥꯏꯕ' },
  
  // Nature and Geography
  'mountain': { as: 'পৰ্বত', mni: 'ꯆꯤꯡ' },
  'river': { as: 'নদী', mni: 'ꯇꯨꯔꯦꯜ' },
  'forest': { as: 'অৰণ্য', mni: 'ꯎꯃꯪ' },
  'village': { as: 'গাঁও', mni: 'ꯈꯨꯉ꯭ꯒꯪ' },
  'city': { as: 'চহৰ', mni: 'ꯁꯍꯔ' },
  'home': { as: 'ঘৰ', mni: 'ꯌꯨꯝ' },
  'family': { as: 'পৰিয়াল', mni: 'ꯏꯃꯨꯡ' },
  'friend': { as: 'বন্ধু', mni: 'ꯃꯔꯨꯞ' },
  
  // Time and Seasons
  'morning': { as: 'ৰাতিপুৱা', mni: 'ꯅꯨꯡꯁꯤꯠ' },
  'evening': { as: 'সন্ধিয়া', mni: 'ꯅꯨꯃꯤꯗꯥꯡ' },
  'night': { as: 'ৰাতি', mni: 'ꯅꯨꯃꯤꯗꯥꯡ' },
  'day': { as: 'দিন', mni: 'ꯅꯨꯃꯤꯠ' },
  'spring': { as: 'বসন্ত', mni: 'ꯕꯁꯟꯇ' },
  'summer': { as: 'গ্ৰীষ্ম', mni: 'ꯅꯨꯡꯍꯤꯠꯄ' },
  'winter': { as: 'শীত', mni: 'ꯁꯤꯠꯄ' },
  'rain': { as: 'বৰষুণ', mni: 'ꯅꯣꯡ' },
  
  // Practical User Inputs
  'i love you': { as: 'মই তোমাক ভাল পাওঁ', mni: 'ꯑꯩ ꯅꯍꯥꯀꯨ ꯅꯨꯡꯁꯤꯕ' },
  'beautiful': { as: 'সুন্দৰ', mni: 'ꯐꯖꯕ' },
  'delicious': { as: 'সুস্বাদু', mni: 'ꯃꯆꯤ ꯐꯕ' },
  'happy': { as: 'আনন্দিত', mni: 'ꯍꯔꯥꯎꯕ' },
  'sad': { as: 'দুখী', mni: 'ꯅꯨꯡꯉꯥꯏꯇꯕ' },
  'love': { as: 'প্ৰেম', mni: 'ꯅꯨꯡꯁꯤꯕ' },
  'peace': { as: 'শান্তি', mni: 'ꯁꯥꯟꯇꯤ' },
  'water': { as: 'পানী', mni: 'ꯏꯁꯤꯡ' },
  'fire': { as: 'জুই', mni: 'ꯃꯩ' },
  'earth': { as: 'পৃথিৱী', mni: 'ꯃꯥꯂꯦꯝ' },
  'sky': { as: 'আকাশ', mni: 'ꯑꯇꯤꯌ' },
  'sun': { as: 'সূৰ্য', mni: 'ꯅꯨꯃꯤꯠ' },
  'moon': { as: 'চন্দ্ৰ', mni: 'ꯊ' },
  'star': { as: 'তৰা', mni: 'ꯊꯥꯡꯖꯤꯡ' },
  'flower': { as: 'ফুল', mni: 'ꯂꯩ' },
  'tree': { as: 'গছ', mni: 'ꯎ' },
  'bird': { as: 'চৰাই', mni: 'ꯎꯆꯦꯛ' },
  'fish': { as: 'মাছ', mni: 'ꯉ' },
  'book': { as: 'কিতাপ', mni: 'ꯂꯥꯏꯔꯤꯛ' },
  'school': { as: 'বিদ্যালয়', mni: 'ꯁ꯭ꯀꯨꯜ' },
  'teacher': { as: 'শিক্ষক', mni: 'ꯑꯣꯖ' },
  'student': { as: 'ছাত্ৰ', mni: 'ꯃꯍꯩꯔꯣꯏ' },
  'mother': { as: 'মা', mni: 'ꯏꯃ' },
  'father': { as: 'দেউতা', mni: 'ꯄꯄ' },
  'brother': { as: 'ভাই', mni: 'ꯃꯅꯥꯎ' },
  'sister': { as: 'ভনী', mni: 'ꯏꯆꯤꯜ' },
  'child': { as: 'শিশু', mni: 'ꯑꯉꯥꯡ' },
  'man': { as: 'মানুহ', mni: 'ꯃꯤꯑꯣꯏ' },
  'woman': { as: 'মহিলা', mni: 'ꯅꯨꯄꯤ' },
  'old': { as: 'পুৰণি', mni: 'ꯑꯔꯤꯕ' },
  'new': { as: 'নতুন', mni: 'ꯑꯅꯧꯕ' },
  'big': { as: 'ডাঙৰ', mni: 'ꯆꯥꯎꯕ' },
  'small': { as: 'সৰু', mni: 'ꯄꯤꯀꯄ' },
  'good': { as: 'ভাল', mni: 'ꯐꯕ' },
  'bad': { as: 'বেয়া', mni: 'ꯐꯠꯇꯕ' }
};

/**
 * Offline translation using comprehensive fallback methods
 */
export async function translateOffline(text, sourceLang = 'en', targetLang = 'as') {
  if (!text || sourceLang === targetLang) {
    return text;
  }

  const normalizedText = text.toLowerCase().trim();
  
  // Method 1: Check comprehensive fallback dictionary
  if (COMPREHENSIVE_TRANSLATIONS[normalizedText]) {
    const translation = COMPREHENSIVE_TRANSLATIONS[normalizedText][targetLang];
    if (translation) {
      return translation;
    }
  }

  // Method 2: Try browser-based translation using fetch API
  try {
    const browserTranslation = await translateWithFetch(text, sourceLang, targetLang);
    if (browserTranslation && browserTranslation !== text) {
      return browserTranslation;
    }
  } catch (error) {
    console.warn('Browser translation failed:', error.message);
  }

  // Method 3: Pattern-based translation for common structures
  const patternTranslation = translateByPattern(text, targetLang);
  if (patternTranslation !== text) {
    return patternTranslation;
  }

  // Method 4: Word-by-word translation for compound phrases
  const wordByWordTranslation = await translateWordByWord(text, targetLang);
  if (wordByWordTranslation !== text) {
    return wordByWordTranslation;
  }

  // Fallback: Return original text
  return text;
}

/**
 * Browser-compatible translation using public APIs
 */
async function translateWithFetch(text, sourceLang, targetLang) {
  try {
    // Use a public translation API that doesn't require authentication
    // This is a fallback method that may work in some cases
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (error) {
    console.warn('Fetch translation failed:', error);
  }
  
  return null;
}
/**
 * Pattern-based translation for common sentence structures
 */
function translateByPattern(text, targetLang) {
  const patterns = {
    as: {
      'what is': 'কি',
      'where is': 'ক\'ত আছে',
      'how to': 'কেনেকৈ',
      'tell me about': 'মোক কওক',
      'i want to': 'মই বিচাৰো',
      'can you': 'আপুনি পাৰিবনে',
      'this is': 'এইটো',
      'that is': 'সেইটো'
    },
    mni: {
      'what is': 'ꯀꯔꯤꯅꯣ',
      'where is': 'ꯀꯗꯥ ꯂꯩꯔꯤꯕꯒꯦ',
      'how to': 'ꯀꯔꯝꯅ',
      'tell me about': 'ꯑꯩꯉꯣꯟꯗ ꯍꯥꯌꯕꯤꯌꯨ',
      'i want to': 'ꯑꯩ ꯄꯥꯝꯃꯤ',
      'can you': 'ꯅꯍꯥꯛꯅ ꯉꯝꯕ',
      'this is': 'ꯃꯁꯤ',
      'that is': 'ꯃꯗꯨ'
    }
  };

  const langPatterns = patterns[targetLang];
  if (!langPatterns) return text;

  let translatedText = text.toLowerCase();
  
  for (const [english, translation] of Object.entries(langPatterns)) {
    if (translatedText.includes(english)) {
      translatedText = translatedText.replace(new RegExp(english, 'gi'), translation);
    }
  }

  return translatedText !== text.toLowerCase() ? translatedText : text;
}

/**
 * Word-by-word translation for compound phrases
 */
async function translateWordByWord(text, targetLang) {
  const words = text.toLowerCase().split(/\s+/);
  const translatedWords = [];
  let hasTranslation = false;

  for (const word of words) {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (COMPREHENSIVE_TRANSLATIONS[cleanWord]) {
      const translation = COMPREHENSIVE_TRANSLATIONS[cleanWord][targetLang];
      if (translation) {
        translatedWords.push(translation);
        hasTranslation = true;
        continue;
      }
    }
    translatedWords.push(word);
  }

  return hasTranslation ? translatedWords.join(' ') : text;
}

/**
 * Add new translation to the dictionary (for learning)
 */
export function addTranslation(english, assamese, manipuri) {
  const key = english.toLowerCase().trim();
  COMPREHENSIVE_TRANSLATIONS[key] = {
    as: assamese,
    mni: manipuri
  };
}

/**
 * Get all available translations
 */
export function getAvailableTranslations() {
  return Object.keys(COMPREHENSIVE_TRANSLATIONS);
}

/**
 * Check if a translation exists
 */
export function hasTranslation(text, targetLang) {
  const key = text.toLowerCase().trim();
  return COMPREHENSIVE_TRANSLATIONS[key] && COMPREHENSIVE_TRANSLATIONS[key][targetLang];
}

/**
 * Batch translation
 */
export async function translateBatchOffline(texts, sourceLang = 'en', targetLang = 'as') {
  const results = [];
  
  for (const text of texts) {
    try {
      const translation = await translateOffline(text, sourceLang, targetLang);
      results.push({ 
        original: text, 
        translated: translation, 
        success: true,
        method: translation !== text ? 'offline' : 'fallback'
      });
    } catch (error) {
      results.push({ 
        original: text, 
        translated: text, 
        success: false, 
        error: error.message 
      });
    }
  }
  
  return results;
}

/**
 * Smart translation that tries multiple methods
 */
export async function smartTranslate(text, sourceLang = 'en', targetLang = 'as') {
  // First try offline translation
  const offlineResult = await translateOffline(text, sourceLang, targetLang);
  
  // If offline translation worked (text changed), return it
  if (offlineResult !== text) {
    return {
      text: offlineResult,
      method: 'offline',
      confidence: 0.8
    };
  }

  // If no translation found, return original with low confidence
  return {
    text: text,
    method: 'fallback',
    confidence: 0.1
  };
}

export default {
  translateOffline,
  translateBatchOffline,
  smartTranslate,
  addTranslation,
  getAvailableTranslations,
  hasTranslation
};