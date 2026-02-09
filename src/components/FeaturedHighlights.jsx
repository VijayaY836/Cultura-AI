import { useState } from 'react';
import { Star, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedHighlights({ entities, onEntitySelect }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured entities - handpicked for their significance
  const featuredEntities = [
    // Tourist Sites
    entities.find(e => e.id === 'kaziranga-national-park'),
    entities.find(e => e.id === 'kamakhya-temple'),
    entities.find(e => e.id === 'tawang-monastery'),
    entities.find(e => e.id === 'living-root-bridges'),
    entities.find(e => e.id === 'loktak-lake'),
    
    // Historical Figures
    entities.find(e => e.id === 'lachit-borphukan'),
    entities.find(e => e.id === 'srimanta-sankardev'),
    entities.find(e => e.id === 'rani-gaidinliu'),
    entities.find(e => e.id === 'mary-kom'),
    
    // Cultural Elements
    entities.find(e => e.id === 'bihu-assam'),
    entities.find(e => e.id === 'hornbill-festival'),
    entities.find(e => e.id === 'manipuri-classical-dance'),
    entities.find(e => e.id === 'cheraw-dance')
  ].filter(Boolean); // Remove any undefined entities

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredEntities.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredEntities.length / 3)) % Math.ceil(featuredEntities.length / 3));
  };

  const getEntityIcon = (entity) => {
    const icons = {
      'tourist-site': '🏛️',
      'historical-figure': '👑',
      'festival': '🎉',
      'dance': '💃',
      'ritual': '🕯️',
      'tradition': '✨',
      'food': '🍽️',
      'art': '🎨'
    };
    return icons[entity.type] || '⭐';
  };

  const getEntityColor = (entity) => {
    const colors = {
      'tourist-site': 'from-blue-500 to-indigo-500',
      'historical-figure': 'from-amber-500 to-yellow-500',
      'festival': 'from-orange-500 to-red-500',
      'dance': 'from-pink-500 to-rose-500',
      'ritual': 'from-purple-500 to-indigo-500',
      'tradition': 'from-emerald-500 to-teal-500',
      'food': 'from-red-500 to-pink-500',
      'art': 'from-blue-500 to-cyan-500'
    };
    return colors[entity.type] || 'from-gray-500 to-gray-600';
  };

  const currentEntities = featuredEntities.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Star size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Featured Highlights</h3>
            <p className="text-sm text-gray-600">Must-know cultural treasures of Northeast India</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={featuredEntities.length <= 3}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600 px-2">
            {currentSlide + 1} / {Math.ceil(featuredEntities.length / 3)}
          </span>
          <button
            onClick={nextSlide}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={featuredEntities.length <= 3}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Featured Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentEntities.map((entity, index) => (
          <div
            key={entity.id}
            onClick={() => onEntitySelect(entity)}
            className="group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${getEntityColor(entity)} p-4 text-white`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{getEntityIcon(entity)}</div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
                  {entity.type.replace('-', ' ')}
                </div>
              </div>
              <h4 className="font-bold text-lg leading-tight">{entity.name}</h4>
              <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                <MapPin size={12} />
                <span>{entity.state}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {entity.description}
              </p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  <span className="capitalize">{entity.season}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={12} />
                  <span>{entity.communities.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {/* Special Highlights */}
              {entity.id === 'kaziranga-national-park' && (
                <div className="mt-3 bg-green-50 p-2 rounded-lg">
                  <div className="text-xs font-semibold text-green-800">UNESCO World Heritage Site</div>
                  <div className="text-xs text-green-600">2/3rd of world's one-horned rhinos</div>
                </div>
              )}
              
              {entity.id === 'lachit-borphukan' && (
                <div className="mt-3 bg-red-50 p-2 rounded-lg">
                  <div className="text-xs font-semibold text-red-800">Military Genius</div>
                  <div className="text-xs text-red-600">Defeated Mughals at Saraighat</div>
                </div>
              )}
              
              {entity.id === 'mary-kom' && (
                <div className="mt-3 bg-pink-50 p-2 rounded-lg">
                  <div className="text-xs font-semibold text-pink-800">Olympic Medalist</div>
                  <div className="text-xs text-pink-600">6x World Champion</div>
                </div>
              )}
              
              {entity.id === 'living-root-bridges' && (
                <div className="mt-3 bg-emerald-50 p-2 rounded-lg">
                  <div className="text-xs font-semibold text-emerald-800">Bio-engineering Marvel</div>
                  <div className="text-xs text-emerald-600">500+ years old bridges</div>
                </div>
              )}
            </div>

            {/* Click to Explore */}
            <div className="px-4 pb-4">
              <div className="text-center text-xs text-gray-400 bg-gray-50 py-2 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                Click to explore →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {featuredEntities.length > 3 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(featuredEntities.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-6 text-center text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-xl border border-orange-200">
        <span className="font-semibold text-orange-800">✨ Featuring {featuredEntities.length} handpicked cultural treasures</span>
        <span className="text-orange-600"> from across Northeast India's rich heritage</span>
      </div>
    </div>
  );
}