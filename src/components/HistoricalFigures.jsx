import { useState } from 'react';
import { MapPin, Users } from 'lucide-react';

function HistoricalFigures({ entities, onFigureSelect, selectedFigure }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  // Filter historical figures
  const historicalFigures = entities.filter(entity => entity.type === 'historical-figure');
  
  // Get unique states
  const states = [...new Set(historicalFigures.map(figure => figure.state))].sort();
  
  // Categorize figures
  const figureCategories = {
    'freedom-fighter': { name: 'Freedom Fighters', icon: '⚔️', color: 'from-red-500 to-orange-500' },
    'spiritual-leader': { name: 'Spiritual Leaders', icon: '🕉️', color: 'from-blue-500 to-indigo-500' },
    'royal': { name: 'Royal Personalities', icon: '👑', color: 'from-purple-500 to-pink-500' },
    'modern-icon': { name: 'Modern Icons', icon: '🏆', color: 'from-emerald-500 to-teal-500' }
  };

  const categorizeFigure = (figure) => {
    const description = figure.description.toLowerCase();
    
    if (description.includes('freedom fighter') || description.includes('resistance') || description.includes('battle') || description.includes('war')) {
      return 'freedom-fighter';
    } else if (description.includes('saint') || description.includes('spiritual') || description.includes('dalai lama') || description.includes('religious')) {
      return 'spiritual-leader';
    } else if (description.includes('king') || description.includes('prince') || description.includes('royal') || description.includes('maharaja')) {
      return 'royal';
    } else if (description.includes('olympic') || description.includes('boxer') || description.includes('modern') || description.includes('chief minister')) {
      return 'modern-icon';
    } else {
      return 'freedom-fighter'; // Default for most historical figures
    }
  };

  // Filter figures
  const filteredFigures = historicalFigures.filter(figure => {
    const matchesCategory = selectedCategory === 'all' || categorizeFigure(figure) === selectedCategory;
    const matchesState = selectedState === 'all' || figure.state === selectedState;
    return matchesCategory && matchesState;
  });

  // Group figures by category
  const groupedFigures = filteredFigures.reduce((acc, figure) => {
    const category = categorizeFigure(figure);
    if (!acc[category]) acc[category] = [];
    acc[category].push(figure);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            👑
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Historical Figures & Personalities</h2>
            <p className="text-gray-600">Heroes and leaders of Northeast India</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-amber-600">{historicalFigures.length}</div>
          <div className="text-sm text-gray-600">Personalities</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Categories ({historicalFigures.length})
          </button>
          
          {Object.entries(figureCategories).map(([key, category]) => {
            const count = historicalFigures.filter(figure => categorizeFigure(figure) === key).length;
            if (count === 0) return null;
            
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All States</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {selectedCategory === 'all' ? (
          // Show all categories
          <div className="space-y-8">
            {Object.entries(groupedFigures).map(([categoryKey, figures]) => {
              const categoryInfo = figureCategories[categoryKey];
              if (!figures.length) return null;
              
              return (
                <div key={categoryKey} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white shadow-lg`}>
                      {categoryInfo.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{categoryInfo.name}</h3>
                      <p className="text-sm text-gray-600">{figures.length} personalities</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {figures.map(figure => (
                      <FigureCard 
                        key={figure.id} 
                        figure={figure} 
                        isSelected={selectedFigure?.id === figure.id}
                        onClick={() => onFigureSelect(figure)}
                        categoryColor={categoryInfo.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Show single category
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFigures.map(figure => {
              const categoryInfo = figureCategories[categorizeFigure(figure)];
              return (
                <FigureCard 
                  key={figure.id} 
                  figure={figure} 
                  isSelected={selectedFigure?.id === figure.id}
                  onClick={() => onFigureSelect(figure)}
                  categoryColor={categoryInfo.color}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredFigures.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👑</span>
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">No Figures Found</h4>
            <p className="text-gray-500 text-sm">
              Try selecting a different category or state
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-4 gap-4 text-center">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-red-700">
            {historicalFigures.filter(f => categorizeFigure(f) === 'freedom-fighter').length}
          </div>
          <div className="text-xs text-red-600">Freedom Fighters</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-blue-700">
            {historicalFigures.filter(f => categorizeFigure(f) === 'spiritual-leader').length}
          </div>
          <div className="text-xs text-blue-600">Spiritual Leaders</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-purple-700">
            {historicalFigures.filter(f => categorizeFigure(f) === 'royal').length}
          </div>
          <div className="text-xs text-purple-600">Royal Figures</div>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-emerald-700">
            {historicalFigures.filter(f => categorizeFigure(f) === 'modern-icon').length}
          </div>
          <div className="text-xs text-emerald-600">Modern Icons</div>
        </div>
      </div>
    </div>
  );
}

// FigureCard Component
function FigureCard({ figure, isSelected, onClick, categoryColor }) {
  const getCategoryIcon = (figure) => {
    const description = figure.description.toLowerCase();
    
    if (description.includes('freedom fighter') || description.includes('resistance')) {
      return '⚔️';
    } else if (description.includes('saint') || description.includes('spiritual') || description.includes('dalai lama')) {
      return '🕉️';
    } else if (description.includes('king') || description.includes('prince') || description.includes('royal')) {
      return '👑';
    } else if (description.includes('olympic') || description.includes('boxer') || description.includes('modern')) {
      return '🏆';
    } else {
      return '⚔️';
    }
  };

  const getLifeSpan = (figure) => {
    const context = figure.historicalContext;
    const bornMatch = context.match(/Born (\d{4})/);
    const diedMatch = context.match(/died (\d{4})/);
    
    if (bornMatch && diedMatch) {
      return `${bornMatch[1]} - ${diedMatch[1]}`;
    } else if (bornMatch) {
      return `Born ${bornMatch[1]}`;
    } else {
      return 'Historical Period';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
        isSelected 
          ? `border-transparent bg-gradient-to-br ${categoryColor} text-white shadow-xl scale-105`
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${
          isSelected 
            ? 'bg-white/20 scale-110' 
            : `bg-gradient-to-r ${categoryColor} text-white group-hover:scale-110`
        }`}>
          {getCategoryIcon(figure)}
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {getLifeSpan(figure)}
        </div>
      </div>
      
      <h4 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {figure.name}
      </h4>
      
      <div className={`space-y-2 text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{figure.region}, {figure.state}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>{figure.communities.slice(0, 2).join(', ')}</span>
        </div>
      </div>
      
      <p className={`text-sm mt-3 line-clamp-3 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        {figure.description}
      </p>

      <div className={`mt-4 text-xs ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
        Legacy: {figure.historicalContext.substring(0, 100)}...
      </div>

      {/* Key Achievements */}
      <div className="mt-3 flex flex-wrap gap-1">
        {figure.symbols.slice(0, 3).map((symbol, index) => (
          <span 
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${
              isSelected 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {symbol}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HistoricalFigures;