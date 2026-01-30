import { useState } from 'react';
import { Grid3X3, Filter, Search, Calendar, MapPin, Users } from 'lucide-react';

export default function KnowledgeGraph({ selectedEntity, entities, allEntities, onNodeClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  // Filter entities based on category and search
  const filteredEntities = entities.filter(entity => {
    const matchesCategory = selectedCategory === 'all' || entity.type === selectedCategory;
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.communities.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Group filtered entities by category (for display)
  const groupedEntities = filteredEntities.reduce((acc, entity) => {
    const category = entity.type;
    if (!acc[category]) acc[category] = [];
    acc[category].push(entity);
    return acc;
  }, {});

  // Calculate counts from displayed entities (filtered by state and search)
  const getCategoryCount = (categoryId) => {
    // Use the filtered entities for count calculation when a state is selected
    const countEntities = entities; // This already contains the filtered entities from App.jsx
    if (categoryId === 'all') return countEntities.length;
    return countEntities.filter(entity => entity.type === categoryId).length;
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🌟', color: 'from-gray-500 to-gray-600' },
    { id: 'festival', name: 'Festivals', icon: '🎉', color: 'from-amber-500 to-orange-500' },
    { id: 'ritual', name: 'Rituals', icon: '🕯️', color: 'from-purple-500 to-indigo-500' },
    { id: 'tradition', name: 'Traditions', icon: '✨', color: 'from-emerald-500 to-teal-500' },
    { id: 'food', name: 'Food & Cuisine', icon: '🍽️', color: 'from-red-500 to-pink-500' },
    { id: 'art', name: 'Arts & Crafts', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { id: 'dance', name: 'Dance & Performance', icon: '💃', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Grid3X3 className="text-accent-500" size={20} />
          <h3 className="font-display font-semibold text-gray-800">Cultural Heritage</h3>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search cultural elements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          {/* View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            <Grid3X3 size={16} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span>{category.name}</span>
            <span className="text-xs opacity-75">
              ({getCategoryCount(category.id)})
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {selectedCategory === 'all' ? (
          // Show all categories
          <div className="space-y-8">
            {Object.entries(groupedEntities).map(([categoryType, categoryEntities]) => {
              const categoryInfo = categories.find(c => c.id === categoryType);
              if (!categoryInfo || categoryEntities.length === 0) return null;
              
              return (
                <div key={categoryType} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white text-lg shadow-lg`}>
                      {categoryInfo.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-gray-800">{categoryInfo.name}</h4>
                      <p className="text-sm text-gray-600">{categoryEntities.length} items</p>
                    </div>
                  </div>
                  
                  <div className={viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                    : "space-y-3"
                  }>
                    {categoryEntities.map(entity => (
                      <EntityCard 
                        key={entity.id} 
                        entity={entity} 
                        isSelected={selectedEntity?.id === entity.id}
                        onClick={() => onNodeClick(entity)}
                        viewMode={viewMode}
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
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
            : "space-y-3"
          }>
            {filteredEntities.map(entity => {
              const categoryInfo = categories.find(c => c.id === entity.type);
              return (
                <EntityCard 
                  key={entity.id} 
                  entity={entity} 
                  isSelected={selectedEntity?.id === entity.id}
                  onClick={() => onNodeClick(entity)}
                  viewMode={viewMode}
                  categoryColor={categoryInfo?.color || 'from-gray-500 to-gray-600'}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredEntities.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h4 className="font-display font-semibold text-gray-700 mb-2">No Results Found</h4>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          <div className="text-2xl font-display font-bold text-blue-700">{entities.length}</div>
          <div className="text-sm text-blue-600">Total Items</div>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl">
          <div className="text-2xl font-display font-bold text-emerald-700">
            {Object.keys(groupedEntities).length}
          </div>
          <div className="text-sm text-emerald-600">Categories</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
          <div className="text-2xl font-display font-bold text-purple-700">
            {new Set(entities.flatMap(e => e.communities)).size}
          </div>
          <div className="text-sm text-purple-600">Communities</div>
        </div>
      </div>
    </div>
  );
}

// EntityCard Component
function EntityCard({ entity, isSelected, onClick, viewMode, categoryColor }) {
  const getEmojiForType = (type) => {
    const emojis = {
      festival: '🎉',
      ritual: '🕯️',
      tradition: '✨',
      food: '🍽️',
      art: '🎨',
      dance: '💃'
    };
    return emojis[type] || '⭐';
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
          isSelected 
            ? `border-transparent bg-gradient-to-r ${categoryColor} text-white shadow-lg scale-[1.02]`
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
          isSelected ? 'bg-white/20' : `bg-gradient-to-r ${categoryColor} text-white`
        }`}>
          {getEmojiForType(entity.type)}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-display font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
            {entity.name}
          </h4>
          <div className={`flex items-center gap-4 text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
            <div className="flex items-center gap-1">
              <MapPin size={12} />
              <span>{entity.region}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span className="capitalize">{entity.season}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{entity.communities.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
          isSelected 
            ? 'bg-white/20 scale-110' 
            : `bg-gradient-to-r ${categoryColor} text-white group-hover:scale-110`
        }`}>
          {getEmojiForType(entity.type)}
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {entity.type}
        </div>
      </div>
      
      <h4 className={`font-display font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {entity.name}
      </h4>
      
      <div className={`space-y-2 text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{entity.region}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span className="capitalize">{entity.season}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>{entity.communities.slice(0, 2).join(', ')}</span>
        </div>
      </div>
      
      {entity.description && (
        <p className={`text-sm mt-3 line-clamp-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
          {entity.description}
        </p>
      )}
    </div>
  );
}