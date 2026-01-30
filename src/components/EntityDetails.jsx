import { MapPin, Calendar, Users, Sparkles, Languages, Star, Clock, Heart } from 'lucide-react';
import { useState } from 'react';
import { translateText } from '../services/bhashini';

export default function EntityDetails({ entity, language = 'en' }) {
  const [translatedDesc, setTranslatedDesc] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!entity) return;
    setIsTranslating(true);
    const translated = await translateText(entity.description, 'en', language);
    setTranslatedDesc(translated);
    setIsTranslating(false);
  };

  if (!entity) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-cultural rounded-full flex items-center justify-center mx-auto mb-4 shadow-cultural animate-pulse-soft">
            <Sparkles className="text-white" size={36} />
          </div>
          <h3 className="text-lg font-display font-semibold text-gray-700 mb-2">Discover Cultural Heritage</h3>
          <p className="text-gray-500">Select a cultural element from the map or graph to explore</p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'festival': return '🎉';
      case 'ritual': return '🕯️';
      case 'tradition': return '🎭';
      default: return '✨';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'festival': return 'from-orange-500 to-red-500';
      case 'ritual': return 'from-purple-500 to-indigo-500';
      case 'tradition': return 'from-emerald-500 to-teal-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="overflow-y-auto h-full animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(entity.type)} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
            {getTypeIcon(entity.type)}
          </div>
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getTypeColor(entity.type)} text-white rounded-full text-sm font-semibold mb-2 capitalize shadow-md`}>
              {entity.type}
            </span>
            <h2 className="text-2xl font-display font-bold text-gray-800 leading-tight">{entity.name}</h2>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-primary-600" size={18} />
            <span className="font-semibold text-gray-700">Location</span>
          </div>
          <p className="text-gray-800 font-medium">{entity.region}</p>
          <p className="text-sm text-gray-600">{entity.state}</p>
        </div>

        <div className="bg-gradient-to-r from-secondary-50 to-accent-50 p-4 rounded-xl border border-secondary-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-secondary-600" size={18} />
            <span className="font-semibold text-gray-700">Season</span>
          </div>
          <p className="text-gray-800 font-medium capitalize">{entity.season}</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock size={14} className="text-gray-500" />
            <span className="text-sm text-gray-600">Traditional timing</span>
          </div>
        </div>
      </div>

      {/* Communities */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-accent-600" size={20} />
          <h3 className="font-display font-semibold text-gray-800">Communities</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {entity.communities.map((community, i) => (
            <span key={i} className="px-3 py-2 bg-gradient-to-r from-accent-100 to-accent-50 text-accent-800 rounded-lg text-sm font-medium border border-accent-200 hover:scale-105 transition-transform duration-200">
              {community}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="text-cultural-saffron" size={20} />
            <h3 className="font-display font-semibold text-gray-800">Description</h3>
          </div>
          {language !== 'en' && (
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Languages size={14} />
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          )}
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {translatedDesc || entity.description}
          </p>
        </div>
      </div>

      {/* Key Rituals */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-cultural-emerald" size={20} />
          <h3 className="font-display font-semibold text-gray-800">Key Rituals</h3>
        </div>
        <div className="space-y-3">
          {entity.rituals.map((ritual, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:scale-[1.02] transition-transform duration-200">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white text-sm font-bold">{i + 1}</span>
              </div>
              <span className="text-gray-700 leading-relaxed">{ritual}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Symbols */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="text-cultural-purple" size={20} />
          <h3 className="font-display font-semibold text-gray-800">Cultural Symbols</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {entity.symbols.map((symbol, i) => (
            <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200 hover:scale-105 transition-transform duration-200 shadow-sm">
              {symbol}
            </span>
          ))}
        </div>
      </div>

      {/* Historical Context */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-gray-800 mb-3">Historical Context</h3>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
          <p className="text-gray-700 leading-relaxed">{entity.historicalContext}</p>
        </div>
      </div>

      {/* Attribution Footer */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="text-xs text-gray-600 space-y-2">
          <div>
            <span className="font-semibold text-gray-700">Source Attribution:</span>
            <br />
            {entity.attribution}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Primary Language:</span> {entity.language}
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-500">Verified cultural data</span>
          </div>
        </div>
      </div>
    </div>
  );
}