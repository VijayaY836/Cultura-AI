import { useState } from 'react';
import { MapPin, Users } from 'lucide-react';

export default function TouristSites({ entities, onSiteSelect, selectedSite }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  // Filter tourist sites
  const touristSites = entities.filter(entity => entity.type === 'tourist-site');
  
  // Get unique states
  const states = [...new Set(touristSites.map(site => site.state))].sort();
  
  // Categorize sites
  const siteCategories = {
    'wildlife': { name: 'Wildlife & Nature', icon: '🦏', color: 'from-green-500 to-emerald-500' },
    'spiritual': { name: 'Spiritual & Historic', icon: '🏛️', color: 'from-purple-500 to-indigo-500' },
    'unique': { name: 'Unique Attractions', icon: '🌉', color: 'from-blue-500 to-cyan-500' },
    'memorial': { name: 'War Memorials', icon: '⚔️', color: 'from-red-500 to-orange-500' }
  };

  const categorizeSite = (site) => {
    const name = site.name.toLowerCase();
    
    if (name.includes('park') || name.includes('valley') || name.includes('lake') || name.includes('mountain')) {
      return 'wildlife';
    } else if (name.includes('temple') || name.includes('monastery') || name.includes('fort') || name.includes('palace')) {
      return 'spiritual';
    } else if (name.includes('war') || name.includes('cemetery') || name.includes('battle')) {
      return 'memorial';
    } else {
      return 'unique';
    }
  };

  // Filter sites
  const filteredSites = touristSites.filter(site => {
    const matchesCategory = selectedCategory === 'all' || categorizeSite(site) === selectedCategory;
    const matchesState = selectedState === 'all' || site.state === selectedState;
    return matchesCategory && matchesState;
  });

  // Group sites by category
  const groupedSites = filteredSites.reduce((acc, site) => {
    const category = categorizeSite(site);
    if (!acc[category]) acc[category] = [];
    acc[category].push(site);
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            🏛️
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Tourist Sites & Attractions</h2>
            <p className="text-gray-600">Discover Northeast India's heritage sites</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{touristSites.length}</div>
          <div className="text-sm text-gray-600">Heritage Sites</div>
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
            All Categories ({touristSites.length})
          </button>
          
          {Object.entries(siteCategories).map(([key, category]) => {
            const count = touristSites.filter(site => categorizeSite(site) === key).length;
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
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {Object.entries(groupedSites).map(([categoryKey, sites]) => {
              const categoryInfo = siteCategories[categoryKey];
              if (!sites.length) return null;
              
              return (
                <div key={categoryKey} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${categoryInfo.color} flex items-center justify-center text-white shadow-lg`}>
                      {categoryInfo.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{categoryInfo.name}</h3>
                      <p className="text-sm text-gray-600">{sites.length} sites</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sites.map(site => (
                      <SiteCard 
                        key={site.id} 
                        site={site} 
                        isSelected={selectedSite?.id === site.id}
                        onClick={() => onSiteSelect(site)}
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
            {filteredSites.map(site => {
              const categoryInfo = siteCategories[categorizeSite(site)];
              return (
                <SiteCard 
                  key={site.id} 
                  site={site} 
                  isSelected={selectedSite?.id === site.id}
                  onClick={() => onSiteSelect(site)}
                  categoryColor={categoryInfo.color}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredSites.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-gray-400" size={24} />
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">No Sites Found</h4>
            <p className="text-gray-500 text-sm">
              Try selecting a different category or state
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-4 gap-4 text-center">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-green-700">
            {touristSites.filter(s => categorizeSite(s) === 'wildlife').length}
          </div>
          <div className="text-xs text-green-600">Nature Sites</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-purple-700">
            {touristSites.filter(s => categorizeSite(s) === 'spiritual').length}
          </div>
          <div className="text-xs text-purple-600">Historic Sites</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-blue-700">
            {touristSites.filter(s => categorizeSite(s) === 'unique').length}
          </div>
          <div className="text-xs text-blue-600">Unique Sites</div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-xl">
          <div className="text-lg font-bold text-red-700">
            {touristSites.filter(s => categorizeSite(s) === 'memorial').length}
          </div>
          <div className="text-xs text-red-600">Memorials</div>
        </div>
      </div>
    </div>
  );
}

// SiteCard Component
function SiteCard({ site, isSelected, onClick, categoryColor }) {
  const getSeasonIcon = (season) => {
    const icons = {
      spring: '🌸',
      summer: '☀️',
      monsoon: '🌧️',
      autumn: '🍂',
      winter: '❄️',
      all: '🌟'
    };
    return icons[season] || '🌟';
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
          🏛️
        </div>
        
        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
          isSelected 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {getSeasonIcon(site.season)}
          <span className="capitalize">{site.season}</span>
        </div>
      </div>
      
      <h4 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {site.name}
      </h4>
      
      <div className={`space-y-2 text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>{site.region}, {site.state}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} />
          <span>{site.communities.slice(0, 2).join(', ')}</span>
        </div>
      </div>
      
      <p className={`text-sm mt-3 line-clamp-3 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        {site.description}
      </p>

      <div className={`mt-4 text-xs ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
        Historical Context: {site.historicalContext.substring(0, 100)}...
      </div>
    </div>
  );
}