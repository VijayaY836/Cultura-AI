import { Languages, Globe, CheckCircle2, Zap, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, translateText, getTranslationStats, checkServiceHealth } from '../services/bhashini';

export default function LanguageSelector({ selectedLang, onLanguageChange }) {
  const [demoText, setDemoText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationInput, setTranslationInput] = useState('');
  const [translationOutput, setTranslationOutput] = useState('');
  const [serviceHealth, setServiceHealth] = useState({ available: true, status: 'checking' });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Check service health on mount
    checkHealth();
    loadStats();
  }, []);

  useEffect(() => {
    // Auto-translate demo text when language changes
    translateDemo();
  }, [selectedLang]);

  const checkHealth = async () => {
    try {
      const health = await checkServiceHealth();
      setServiceHealth(health);
    } catch (error) {
      setServiceHealth({ available: false, status: 'error', error: error.message });
    }
  };

  const loadStats = async () => {
    try {
      const translationStats = getTranslationStats();
      setStats(translationStats);
    } catch (error) {
      console.warn('Failed to load translation stats:', error);
    }
  };

  const translateDemo = async () => {
    setIsTranslating(true);
    try {
      const translated = await translateText(
        'Cultural Heritage of Northeast India',
        'en',
        selectedLang
      );
      setDemoText(translated);
    } catch (error) {
      console.warn('Demo translation failed:', error);
      setDemoText('Cultural Heritage of Northeast India');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCustomTranslation = async () => {
    if (!translationInput.trim()) return;
    
    setIsTranslating(true);
    try {
      const translated = await translateText(translationInput, 'en', selectedLang);
      setTranslationOutput(translated);
    } catch (error) {
      console.warn('Custom translation failed:', error);
      setTranslationOutput('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Languages className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-gray-800">Language Translator</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Powered by BHASHINI</span>
            <div className={`w-2 h-2 rounded-full ${
              serviceHealth.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
          </div>
        </div>
      </div>

      {/* Service Status */}
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-2 text-green-800">
          <CheckCircle2 size={16} />
          <span className="text-sm font-medium">
            {serviceHealth.available ? 'BHASHINI API + Offline Translation Available' : 'Offline Translation Active'}
          </span>
        </div>
        <div className="text-xs text-green-600 mt-1">
          Multiple translation methods ensure reliable results
        </div>
      </div>

      {/* Current Language Display */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl mb-6 border border-indigo-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Active Language</span>
          <Globe size={18} className="text-indigo-600" />
        </div>
        <div className="text-2xl font-display font-bold text-gray-800 mb-1">
          {currentLang.name}
        </div>
        <div className="text-lg text-gray-600 mb-2">
          {currentLang.nativeName}
        </div>
        <div className="text-sm text-gray-500">
          {currentLang.script} Script • {currentLang.direction.toUpperCase()} Direction
        </div>
      </div>

      {/* Language Selection Grid */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Language</label>
        <div className="grid grid-cols-1 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-[1.02] ${
                selectedLang === lang.code
                  ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-display font-semibold text-gray-800">{lang.name}</div>
                  <div className="text-sm text-gray-600">{lang.nativeName}</div>
                  <div className="text-xs text-gray-500 mt-1">{lang.script}</div>
                </div>
                {selectedLang === lang.code && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-indigo-600" />
                    <Sparkles size={16} className="text-indigo-500 animate-pulse" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Translation Interface */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Try Translation</label>
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder="Enter text to translate..."
              className="input-cultural w-full pr-12"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomTranslation()}
            />
            <button
              onClick={handleCustomTranslation}
              disabled={isTranslating || !translationInput.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTranslating ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Zap size={18} />
              )}
            </button>
          </div>
          
          {translationOutput && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
              <div className="text-sm font-medium text-emerald-700 mb-2">Translation Result:</div>
              <div className="text-gray-800 font-medium">{translationOutput}</div>
            </div>
          )}
        </div>
      </div>

      {/* Live Translation Demo */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Live Demo</label>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">English → {currentLang.name}</div>
          <div className="text-gray-500 text-sm mb-2">Cultural Heritage of Northeast India</div>
          <div className="text-lg font-medium text-gray-800 mb-3">
            {isTranslating ? (
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="animate-spin text-indigo-600" />
                <span className="text-indigo-600">Translating...</span>
              </div>
            ) : (
              demoText || 'Cultural Heritage of Northeast India'
            )}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>
                {serviceHealth.available ? 'Multi-method Translation' : 'Offline Translation'}
              </span>
            </div>
            <button
              onClick={translateDemo}
              disabled={isTranslating}
              className="text-xs text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Translation Statistics */}
      {stats && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Performance Stats</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
              <div className="text-2xl font-display font-bold text-green-700">
                {Math.round(stats.cache.hitRate)}%
              </div>
              <div className="text-xs text-green-600">Cache Hit Rate</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200">
              <div className="text-2xl font-display font-bold text-purple-700">
                {stats.cache.size}
              </div>
              <div className="text-xs text-purple-600">Cached Translations</div>
            </div>
          </div>
        </div>
      )}

      {/* Language Support Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-200">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-indigo-600" size={18} />
          <span className="font-display font-semibold text-gray-800">BHASHINI Integration</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-display font-bold text-indigo-700">22+</div>
            <div className="text-xs text-indigo-600">Indian Languages</div>
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-purple-700">200+</div>
            <div className="text-xs text-purple-600">Dialects Supported</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-indigo-200">
          <div className="text-xs text-gray-600 text-center">
            Government of India's Digital Language Platform
          </div>
        </div>
      </div>
    </div>
  );
}