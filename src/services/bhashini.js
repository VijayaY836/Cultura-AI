/**
 * Enhanced BHASHINI Translation Service
 * Provides comprehensive translation capabilities for Northeast Indian languages
 * with proper API integration, caching, and offline fallback mechanisms
 */

import { translateOffline, smartTranslate } from './offlineTranslation';

// BHASHINI API Configuration
const BHASHINI_CONFIG = {
  AUTH_URL: 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline',
  COMPUTE_URL: 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/compute',
  PIPELINE_SEARCH_URL: 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline',
  USER_ID: import.meta.env.VITE_BHASHINI_USER_ID || 'demo_user',
  API_KEY: import.meta.env.VITE_BHASHINI_API_KEY || 'demo_key',
  TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000 // 1 second
};

// Supported languages with enhanced metadata
export const SUPPORTED_LANGUAGES = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    script: 'Latin', 
    direction: 'ltr',
    bhashiniCode: 'en'
  },
  { 
    code: 'as', 
    name: 'Assamese', 
    nativeName: 'অসমীয়া',
    script: 'Bengali', 
    direction: 'ltr',
    bhashiniCode: 'as'
  },
  { 
    code: 'mni', 
    name: 'Manipuri', 
    nativeName: 'ꯃꯅꯤꯄꯨꯔꯤ',
    script: 'Meetei Mayek', 
    direction: 'ltr',
    bhashiniCode: 'mni'
  },
  { 
    code: 'bn', 
    name: 'Bengali', 
    nativeName: 'বাংলা',
    script: 'Bengali', 
    direction: 'ltr',
    bhashiniCode: 'bn'
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    nativeName: 'हिन्दी',
    script: 'Devanagari', 
    direction: 'ltr',
    bhashiniCode: 'hi'
  }
];

// Enhanced fallback translations with cultural context
const FALLBACK_TRANSLATIONS = {
  // App Interface
  'Cultural Heritage of Northeast India': {
    en: 'Cultural Heritage of Northeast India',
    as: 'উত্তৰ-পূৰ্ব ভাৰতৰ সাংস্কৃতিক ঐতিহ্য',
    mni: 'ꯅꯣꯡꯄꯣꯛ-ꯅꯨꯡꯁꯤꯠꯀꯤ ꯚꯥꯔꯇꯀꯤ ꯀꯂꯆꯔꯦꯜ ꯍꯦꯔꯤꯇꯦꯖ',
    bn: 'উত্তর-পূর্ব ভারতের সাংস্কৃতিক ঐতিহ্য',
    hi: 'उत्तर-पूर्व भारत की सांस्कृतिक विरासत'
  },
  'Explore traditions, festivals, and rituals': {
    en: 'Explore traditions, festivals, and rituals',
    as: 'পৰম্পৰা, উৎসৱ আৰু ৰীতি-নীতি অন্বেষণ কৰক',
    mni: 'ꯇ꯭ꯔꯦꯗꯤꯁꯟ, ꯐꯦꯁ꯭ꯇꯤꯚꯦꯜ ꯑꯃꯁꯨꯡ ꯔꯤꯆꯨꯑꯦꯜ ꯊꯤꯖꯤꯅꯕ',
    bn: 'ঐতিহ্য, উৎসব এবং আচার-অনুষ্ঠান অন্বেষণ করুন',
    hi: 'परंपराओं, त्योहारों और रीति-रिवाजों का अन्वेषण करें'
  },
  
  // Cultural Terms
  'Festival': {
    en: 'Festival',
    as: 'উৎসৱ',
    mni: 'ꯆꯥꯡ',
    bn: 'উৎসব',
    hi: 'त्योहार'
  },
  'Ritual': {
    en: 'Ritual',
    as: 'ৰীতি-নীতি',
    mni: 'ꯔꯤꯆꯨꯑꯦꯜ',
    bn: 'আচার',
    hi: 'रीति'
  },
  'Community': {
    en: 'Community',
    as: 'সম্প্ৰদায়',
    mni: 'ꯀꯝꯌꯨꯅꯤꯇꯤ',
    bn: 'সম্প্রদায়',
    hi: 'समुदाय'
  },
  'Tradition': {
    en: 'Tradition',
    as: 'পৰম্পৰা',
    mni: 'ꯇ꯭ꯔꯦꯗꯤꯁꯟ',
    bn: 'ঐতিহ্য',
    hi: 'परंपरा'
  },
  
  // Specific Cultural Elements
  'Bihu Festival': {
    en: 'Bihu Festival',
    as: 'বিহু উৎসৱ',
    mni: 'ꯕꯤꯍꯨ ꯆꯥꯡ',
    bn: 'বিহু উৎসব',
    hi: 'बिहू त्योहार'
  },
  'Hornbill Festival': {
    en: 'Hornbill Festival',
    as: 'হৰ্নবিল উৎসৱ',
    mni: 'ꯍꯣꯔꯅꯕꯤꯜ ꯆꯥꯡ',
    bn: 'হর্নবিল উৎসব',
    hi: 'हॉर्नबिल त्योहार'
  },
  'Lai Haraoba': {
    en: 'Lai Haraoba',
    as: 'লাই হাৰাওবা',
    mni: 'ꯂꯥꯏ ꯍꯔꯥꯎꯕ',
    bn: 'লাই হারাওবা',
    hi: 'लाई हराओबा'
  }
};

// Translation cache for performance optimization
class TranslationCache {
  constructor(maxSize = 1000, ttl = 3600000) { // 1 hour TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  generateKey(text, sourceLang, targetLang) {
    return `${sourceLang}-${targetLang}-${text}`;
  }

  get(text, sourceLang, targetLang) {
    const key = this.generateKey(text, sourceLang, targetLang);
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      cached.hitCount++;
      return cached.translation;
    }
    
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  set(text, sourceLang, targetLang, translation) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    const key = this.generateKey(text, sourceLang, targetLang);
    this.cache.set(key, {
      translation,
      timestamp: Date.now(),
      hitCount: 0
    });
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate()
    };
  }

  calculateHitRate() {
    let totalHits = 0;
    let totalRequests = 0;
    
    for (const entry of this.cache.values()) {
      totalHits += entry.hitCount;
      totalRequests += entry.hitCount + 1; // +1 for initial miss
    }
    
    return totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;
  }
}

// Global cache instance
const translationCache = new TranslationCache();

// Custom error classes
export class BhashiniError extends Error {
  constructor(message, code = 'BHASHINI_ERROR', details = null) {
    super(message);
    this.name = 'BhashiniError';
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends BhashiniError {
  constructor(message, details = null) {
    super(message, 'NETWORK_ERROR', details);
  }
}

export class AuthenticationError extends BhashiniError {
  constructor(message, details = null) {
    super(message, 'AUTH_ERROR', details);
  }
}

export class RateLimitError extends BhashiniError {
  constructor(message, details = null) {
    super(message, 'RATE_LIMIT_ERROR', details);
  }
}

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validateLanguageCode(langCode) {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === langCode);
}

function getBhashiniLanguageCode(langCode) {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
  return lang ? lang.bhashiniCode : langCode;
}

// Core translation functions
async function fetchWithRetry(url, options, retries = BHASHINI_CONFIG.MAX_RETRIES) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), BHASHINI_CONFIG.TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 429) {
        throw new RateLimitError('Rate limit exceeded', { status: response.status });
      }
      
      if (response.status === 401 || response.status === 403) {
        throw new AuthenticationError('Authentication failed', { status: response.status });
      }
      
      if (!response.ok) {
        throw new BhashiniError(`HTTP error ${response.status}`, 'HTTP_ERROR', { status: response.status });
      }
      
      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout', { timeout: BHASHINI_CONFIG.TIMEOUT });
      }
      
      if (i === retries) {
        throw error;
      }
      
      // Exponential backoff for retries
      await delay(BHASHINI_CONFIG.RETRY_DELAY * Math.pow(2, i));
    }
  }
}

async function searchPipeline(sourceLang, targetLang) {
  const requestBody = {
    pipelineTasks: [
      {
        taskType: "translation",
        config: {
          language: {
            sourceLanguage: getBhashiniLanguageCode(sourceLang),
            targetLanguage: getBhashiniLanguageCode(targetLang)
          }
        }
      }
    ],
    pipelineRequestConfig: {
      pipelineId: "64392f96daac500b55c543cd"
    }
  };

  const response = await fetchWithRetry(BHASHINI_CONFIG.PIPELINE_SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'userID': BHASHINI_CONFIG.USER_ID,
      'ulcaApiKey': BHASHINI_CONFIG.API_KEY
    },
    body: JSON.stringify(requestBody)
  });

  return response.json();
}

async function computeTranslation(text, pipelineResponse) {
  const computePayload = {
    pipelineTasks: pipelineResponse.pipelineResponseConfig,
    inputData: {
      input: [
        {
          source: text
        }
      ]
    }
  };

  const response = await fetchWithRetry(BHASHINI_CONFIG.COMPUTE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': pipelineResponse.pipelineInferenceAPIEndPoint.inferenceApiKey?.value || ''
    },
    body: JSON.stringify(computePayload)
  });

  return response.json();
}

// Main translation function with offline fallback
export async function translateText(text, sourceLang = 'en', targetLang = 'as') {
  // Input validation
  if (!text || typeof text !== 'string') {
    throw new BhashiniError('Invalid input text', 'INVALID_INPUT');
  }

  if (!validateLanguageCode(sourceLang) || !validateLanguageCode(targetLang)) {
    throw new BhashiniError('Unsupported language code', 'UNSUPPORTED_LANGUAGE');
  }

  // Return original text if source and target are the same
  if (sourceLang === targetLang) {
    return text;
  }

  // Check cache first
  const cachedTranslation = translationCache.get(text, sourceLang, targetLang);
  if (cachedTranslation) {
    return cachedTranslation;
  }

  // Try fallback translations first for common phrases
  const fallbackTranslation = FALLBACK_TRANSLATIONS[text]?.[targetLang];
  if (fallbackTranslation) {
    translationCache.set(text, sourceLang, targetLang, fallbackTranslation);
    return fallbackTranslation;
  }

  // Try offline translation first (always works, no API key needed)
  try {
    const offlineResult = await translateOffline(text, sourceLang, targetLang);
    if (offlineResult && offlineResult !== text) {
      translationCache.set(text, sourceLang, targetLang, offlineResult);
      return offlineResult;
    }
  } catch (error) {
    console.warn('Offline translation failed:', error.message);
  }

  // Try BHASHINI API as secondary option
  try {
    // Search for appropriate pipeline
    const pipelineResponse = await searchPipeline(sourceLang, targetLang);
    
    if (!pipelineResponse.pipelineResponseConfig) {
      throw new BhashiniError('No translation pipeline available', 'NO_PIPELINE');
    }

    // Compute translation
    const computeResponse = await computeTranslation(text, pipelineResponse);
    
    if (!computeResponse.pipelineResponse?.[0]?.output?.[0]?.target) {
      throw new BhashiniError('Invalid translation response', 'INVALID_RESPONSE');
    }

    const translatedText = computeResponse.pipelineResponse[0].output[0].target;
    
    // Cache the result
    translationCache.set(text, sourceLang, targetLang, translatedText);
    
    return translatedText;
  } catch (error) {
    console.warn('Bhashini translation failed:', error.message);
  }

  // Final fallback: try smart translation
  try {
    const smartResult = await smartTranslate(text, sourceLang, targetLang);
    if (smartResult.text !== text) {
      translationCache.set(text, sourceLang, targetLang, smartResult.text);
      return smartResult.text;
    }
  } catch (error) {
    console.warn('Smart translation failed:', error.message);
  }

  // Ultimate fallback: return original text
  return text;
}

// Batch translation function
export async function translateBatch(texts, sourceLang = 'en', targetLang = 'as') {
  const results = [];
  
  for (const text of texts) {
    try {
      const translation = await translateText(text, sourceLang, targetLang);
      results.push({ original: text, translated: translation, success: true });
    } catch (error) {
      results.push({ original: text, translated: text, success: false, error: error.message });
    }
  }
  
  return results;
}

// Language detection (placeholder - would need actual implementation)
export async function detectLanguage(text) {
  // Simple heuristic-based detection for demo
  const assameesePattern = /[\u0980-\u09FF]/;
  const manipuriPattern = /[\uAAE0-\uAAFF]/;
  const bengaliPattern = /[\u0980-\u09FF]/;
  const hindiPattern = /[\u0900-\u097F]/;
  
  if (manipuriPattern.test(text)) return 'mni';
  if (assameesePattern.test(text)) return 'as';
  if (bengaliPattern.test(text)) return 'bn';
  if (hindiPattern.test(text)) return 'hi';
  
  return 'en'; // Default to English
}

// Get supported language pairs
export function getSupportedLanguagePairs() {
  const pairs = [];
  
  for (const source of SUPPORTED_LANGUAGES) {
    for (const target of SUPPORTED_LANGUAGES) {
      if (source.code !== target.code) {
        pairs.push({
          source: source.code,
          target: target.code,
          sourceName: source.name,
          targetName: target.name
        });
      }
    }
  }
  
  return pairs;
}

// Get translation statistics
export function getTranslationStats() {
  return {
    cache: translationCache.getStats(),
    supportedLanguages: SUPPORTED_LANGUAGES.length,
    fallbackTranslations: Object.keys(FALLBACK_TRANSLATIONS).length
  };
}

// Clear translation cache
export function clearTranslationCache() {
  translationCache.clear();
}

// Check if Bhashini service is available
export async function checkServiceHealth() {
  try {
    const response = await fetchWithRetry(BHASHINI_CONFIG.PIPELINE_SEARCH_URL, {
      method: 'GET',
      headers: {
        'userID': BHASHINI_CONFIG.USER_ID,
        'ulcaApiKey': BHASHINI_CONFIG.API_KEY
      }
    });
    
    return { available: true, status: 'healthy' };
  } catch (error) {
    return { 
      available: false, 
      status: 'unhealthy', 
      error: error.message 
    };
  }
}

// Export all functions and constants
export {
  FALLBACK_TRANSLATIONS,
  translationCache,
  validateLanguageCode,
  getBhashiniLanguageCode,
  translateOffline,
  smartTranslate
};

export default {
  translateText,
  translateBatch,
  detectLanguage,
  getSupportedLanguagePairs,
  getTranslationStats,
  clearTranslationCache,
  checkServiceHealth,
  SUPPORTED_LANGUAGES,
  BhashiniError,
  NetworkError,
  AuthenticationError,
  RateLimitError
};