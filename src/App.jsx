import { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import KnowledgeGraph from './components/KnowledgeGraph';
import EntityDetails from './components/EntityDetails';
import InteractiveMap from './components/InteractiveMap';
import LanguageSelector from './components/LanguageSelector';
import AchievementShowcase from './components/AchievementShowcase';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import SellerDashboard from './components/seller/SellerDashboard';
import CulturaErrorBoundary, { useErrorHandler } from './components/ErrorBoundary';
import { CartProvider, useCart } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { getAllCulturalData } from './services/api';
import { Sparkles, MessageCircle, Search, Globe, Filter, X, Menu, Bell, User, MapPin, Network, Languages, Bot, ShoppingBag } from 'lucide-react';

function AppContent() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'festival', 'ritual', 'tradition'
  const [showProfile, setShowProfile] = useState(false);
  
  const handleError = useErrorHandler();
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, isCustomer, isSeller, loading } = useAuth();

  // Set default tab based on user mode
  const getDefaultTab = () => {
    if (isSeller) return 'seller-dashboard';
    return 'map';
  };
  
  const [activeTab, setActiveTab] = useState(getDefaultTab());

  // Update active tab when user mode changes
  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [isSeller, isCustomer]);

  // Show login screen if not authenticated
  if (!isAuthenticated && !loading) {
    return <Login />;
  }

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl text-white">🛍️</span>
          </div>
          <p className="text-gray-600">Loading CULTURA...</p>
        </div>
      </div>
    );
  }
  
  let allEntities = [];
  try {
    allEntities = getAllCulturalData();
  } catch (error) {
    handleError(error, { context: 'Loading cultural data' });
    allEntities = [];
  }
  
  // Filter entities by selected state and search
  let displayEntities = selectedState
    ? allEntities.filter(e => e.state === selectedState.name)
    : allEntities;

  // Apply type filter
  if (filterType !== 'all') {
    displayEntities = displayEntities.filter(e => e.type === filterType);
  }

  // Search functionality
  const handleSearch = (query) => {
    try {
      setSearchQuery(query);
      if (query.trim()) {
        const results = allEntities.filter(entity =>
          entity.name.toLowerCase().includes(query.toLowerCase()) ||
          entity.description.toLowerCase().includes(query.toLowerCase()) ||
          entity.communities.some(community => 
            community.toLowerCase().includes(query.toLowerCase())
          ) ||
          entity.rituals.some(ritual => 
            ritual.toLowerCase().includes(query.toLowerCase())
          ) ||
          entity.symbols.some(symbol => 
            symbol.toLowerCase().includes(query.toLowerCase())
          )
        );
        setSearchResults(results);
        setShowSearch(true);
      } else {
        setSearchResults([]);
        setShowSearch(false);
      }
    } catch (error) {
      handleError(error, { context: 'Search functionality' });
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  const selectFromSearch = (entity) => {
    try {
      setSelectedEntity(entity);
      // Switch to cultural tab when selecting an entity from search
      setActiveTab('cultural');
      clearSearch();
    } catch (error) {
      handleError(error, { context: 'Entity selection' });
    }
  };

  const handleStateSelect = (state) => {
    try {
      setSelectedState(state);
    } catch (error) {
      handleError(error, { context: 'State selection' });
    }
  };

  const handleEntitySelect = (entity) => {
    try {
      setSelectedEntity(entity);
    } catch (error) {
      handleError(error, { context: 'Entity selection from graph' });
    }
  };

  const handleLanguageChange = (lang) => {
    try {
      setLanguage(lang);
    } catch (error) {
      handleError(error, { context: 'Language change' });
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Modern Header with Background */}
      <header 
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-[2px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/logo.png" alt="CULTURA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  CULTURA
                </h1>
                <p className="text-base text-gray-700 font-medium drop-shadow-sm">Northeast India Cultural Heritage</p>
              </div>
            </div>
            
            {/* Right side navigation */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Platform
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <User size={20} className="text-gray-600" />
                  )}
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden">
                  <Menu size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search festivals, rituals, communities, or traditions..."
                className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl pl-12 pr-12 py-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-2xl mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 z-50 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Found {searchResults.length} results
                  </div>
                  <div className="space-y-2">
                    {searchResults.slice(0, 8).map((entity) => (
                      <button
                        key={entity.id}
                        onClick={() => selectFromSearch(entity)}
                        className="w-full text-left p-3 rounded-xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {entity.type === 'festival' ? '🎉' : 
                             entity.type === 'ritual' ? '🕯️' : 
                             entity.type === 'tradition' ? '✨' :
                             entity.type === 'food' ? '🍽️' :
                             entity.type === 'art' ? '🎨' :
                             entity.type === 'dance' ? '💃' :
                             entity.type === 'tourist-site' ? '🏛️' :
                             entity.type === 'historical-figure' ? '👑' : '⭐'}
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">{entity.name}</div>
                            <div className="text-sm text-gray-600">{entity.region}, {entity.state}</div>
                            <div className="text-xs text-gray-500 capitalize">{entity.type}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {showSearch && searchResults.length === 0 && searchQuery.trim() && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-2xl mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 z-50">
                <div className="p-6 text-center">
                  <div className="text-gray-500 mb-2">No results found for "{searchQuery}"</div>
                  <div className="text-sm text-gray-400">Try searching for festivals, rituals, or community names</div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {/* Show different tabs based on user mode */}
              {isCustomer && (
                <>
                  <button
                    onClick={() => setActiveTab('map')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'map'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <MapPin size={18} />
                    <span className="hidden sm:inline">Interactive Map</span>
                    <span className="sm:hidden">Map</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cultural')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'cultural'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <Network size={18} />
                    <span className="hidden sm:inline">Cultural Connections</span>
                    <span className="sm:hidden">Cultural</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('translator')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'translator'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <Languages size={18} />
                    <span className="hidden sm:inline">Language Translator</span>
                    <span className="sm:hidden">Translator</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('assistant')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'assistant'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <Bot size={18} />
                    <span className="hidden sm:inline">AI Assistant</span>
                    <span className="sm:hidden">AI</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'shop'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <ShoppingBag size={18} />
                    <span className="hidden sm:inline">Handloom Shop</span>
                    <span className="sm:hidden">Shop</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cart')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                      activeTab === 'cart'
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                    }`}
                  >
                    <div className="relative">
                      <span className="text-lg">🛒</span>
                      {getCartItemsCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {getCartItemsCount()}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:inline">Cart</span>
                    <span className="sm:hidden">Cart</span>
                  </button>
                </>
              )}

              {/* Seller Mode Tabs */}
              {isSeller && (
                <button
                  onClick={() => setActiveTab('seller-dashboard')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'seller-dashboard'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                  }`}
                >
                  <span className="text-lg">🏪</span>
                  <span className="hidden sm:inline">Seller Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </button>
              )}

              {/* Common tabs for both modes */}
              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'about'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:scale-105'
                }`}
              >
                <span className="text-lg">ℹ️</span>
                <span className="hidden sm:inline">About</span>
                <span className="sm:hidden">About</span>
              </button>
            </div>

            {/* Filter Controls - show for cultural tab */}
            {activeTab === 'cultural' && (
              <div className="flex items-center gap-2">
                <Filter className="text-gray-600" size={16} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-white/60 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Types</option>
                  <option value="festival">Festivals</option>
                  <option value="ritual">Rituals</option>
                  <option value="tradition">Traditions</option>
                  <option value="food">Food & Cuisine</option>
                  <option value="art">Arts & Crafts</option>
                  <option value="dance">Dance & Performance</option>
                  <option value="tourist-site">Tourist Sites</option>
                  <option value="historical-figure">Historical Figures</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Content */}
        {activeTab === 'map' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Interactive Map - Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-indigo-600" size={24} />
                    <h2 className="text-xl font-bold text-gray-800">Interactive Map of Northeast India</h2>
                  </div>
                  <CulturaErrorBoundary>
                    <InteractiveMap
                      selectedState={selectedState}
                      onStateSelect={handleStateSelect}
                    />
                  </CulturaErrorBoundary>
                </div>
              </div>

              {/* Map Info Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Map Information</h3>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div>
                      <strong>Total States:</strong> 8 Northeast States
                    </div>
                    <div>
                      <strong>Cultural Entities:</strong> {allEntities.length}+
                    </div>
                    <div>
                      <strong>Languages:</strong> 6+ Regional Languages
                    </div>
                    <div>
                      <strong>Communities:</strong> 50+ Tribal Communities
                    </div>
                  </div>
                </div>

                {selectedState && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Selected State</h3>
                    <div className="space-y-3">
                      <div className="text-lg font-semibold text-indigo-600">{selectedState.name}</div>
                      <div className="text-sm text-gray-600">
                        Cultural entities in this state: {allEntities.filter(e => e.state === selectedState.name).length}
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {['festival', 'ritual', 'tradition', 'food', 'art', 'dance'].map(type => {
                          const count = allEntities.filter(e => e.state === selectedState.name && e.type === type).length;
                          if (count === 0) return null;
                          return (
                            <div key={type} className="bg-gray-50 rounded-lg p-2 text-center">
                              <div className="text-sm font-semibold capitalize">{type}s</div>
                              <div className="text-lg font-bold text-indigo-600">{count}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                  <h3 className="font-semibold text-indigo-800 mb-3">How to Use</h3>
                  <div className="space-y-2 text-sm text-indigo-700">
                    <div>• Click on any state to explore its cultural heritage</div>
                    <div>• Hover over states to see basic information</div>
                    <div>• Use the search bar to find specific cultural elements</div>
                    <div>• Switch to other tabs to explore connections and translations</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {/* Map content ends here */}
            </div>
          </>
        )}

        {activeTab === 'cultural' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cultural Connections - Main Content */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Network className="text-emerald-600" size={24} />
                    <h2 className="text-xl font-bold text-gray-800">Cultural Connections & Heritage Discovery</h2>
                  </div>
                  {filterType !== 'all' && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium capitalize">
                      {filterType}s
                    </span>
                  )}
                </div>
                <CulturaErrorBoundary>
                  <KnowledgeGraph
                    selectedEntity={null}
                    entities={displayEntities}
                    allEntities={allEntities}
                    onNodeClick={handleEntitySelect}
                  />
                </CulturaErrorBoundary>
              </div>
            </div>

            {/* Entity Details Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="text-purple-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Discover Cultural Heritage</h3>
                </div>
                <CulturaErrorBoundary>
                  <EntityDetails entity={selectedEntity} language={language} />
                </CulturaErrorBoundary>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tourist-sites' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Tourist Sites - Main Content */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏛️</span>
                    <h2 className="text-xl font-bold text-gray-800">Tourist Sites & Historic Attractions</h2>
                  </div>
                  {filterType !== 'all' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                      {filterType}s
                    </span>
                  )}
                </div>
                <CulturaErrorBoundary>
                  <KnowledgeGraph
                    selectedEntity={null}
                    entities={displayEntities.filter(e => e.type === 'tourist-site')}
                    allEntities={allEntities}
                    onNodeClick={handleEntitySelect}
                  />
                </CulturaErrorBoundary>
              </div>
            </div>

            {/* Tourist Sites Info Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px] overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">🗺️</span>
                  <h3 className="font-semibold text-gray-800">Site Details</h3>
                </div>
                
                {selectedEntity && selectedEntity.type === 'tourist-site' ? (
                  <CulturaErrorBoundary>
                    <EntityDetails entity={selectedEntity} language={language} />
                  </CulturaErrorBoundary>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🦏 Wildlife & Nature</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• Kaziranga National Park (Assam)</div>
                        <div>• Dzukou Valley (Nagaland)</div>
                        <div>• Loktak Lake (Manipur)</div>
                        <div>• Phawngpui Blue Mountain (Mizoram)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">🏛️ Spiritual & Historic</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <div>• Kamakhya Temple (Assam)</div>
                        <div>• Tawang Monastery (Arunachal Pradesh)</div>
                        <div>• Kangla Fort (Manipur)</div>
                        <div>• Rumtek Monastery (Sikkim)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-2">🌉 Unique Attractions</h4>
                      <div className="text-sm text-emerald-700 space-y-1">
                        <div>• Living Root Bridges (Meghalaya)</div>
                        <div>• Unakoti Rock Sculptures (Tripura)</div>
                        <div>• Nathula Pass (Sikkim)</div>
                        <div>• Majuli Island (Assam)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">⚔️ War Memorials</h4>
                      <div className="text-sm text-orange-700 space-y-1">
                        <div>• Kohima War Cemetery (Nagaland)</div>
                        <div>• Battle of Saraighat sites (Assam)</div>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mt-6 p-4 bg-gray-50 rounded-xl">
                      Select any site to explore its history, significance, and cultural connections!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'historical-figures' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Historical Figures - Main Content */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👑</span>
                    <h2 className="text-xl font-bold text-gray-800">Historical Figures & Prominent Personalities</h2>
                  </div>
                  {filterType !== 'all' && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium capitalize">
                      {filterType}s
                    </span>
                  )}
                </div>
                <CulturaErrorBoundary>
                  <KnowledgeGraph
                    selectedEntity={null}
                    entities={displayEntities.filter(e => e.type === 'historical-figure')}
                    allEntities={allEntities}
                    onNodeClick={handleEntitySelect}
                  />
                </CulturaErrorBoundary>
              </div>
            </div>

            {/* Historical Figures Info Sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px] overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📜</span>
                  <h3 className="font-semibold text-gray-800">Biography</h3>
                </div>
                
                {selectedEntity && selectedEntity.type === 'historical-figure' ? (
                  <CulturaErrorBoundary>
                    <EntityDetails entity={selectedEntity} language={language} />
                  </CulturaErrorBoundary>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">⚔️ Freedom Fighters & Warriors</h4>
                      <div className="text-sm text-red-700 space-y-1">
                        <div>• Lachit Borphukan (Assam)</div>
                        <div>• Rani Gaidinliu (Nagaland)</div>
                        <div>• Bir Tikendrajit Singh (Manipur)</div>
                        <div>• U Tirot Sing (Meghalaya)</div>
                        <div>• Kiang Nangbah (Meghalaya)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">🕉️ Spiritual & Cultural Leaders</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• Srimanta Sankardev (Assam)</div>
                        <div>• 14th Dalai Lama (Arunachal Pradesh)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">👑 Royal Personalities</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <div>• Maharaja Bir Bikram (Tripura)</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                      <h4 className="font-semibold text-emerald-800 mb-2">🏆 Modern Icons</h4>
                      <div className="text-sm text-emerald-700 space-y-1">
                        <div>• MC Mary Kom (Manipur)</div>
                        <div>• Laldenga (Mizoram)</div>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 mt-6 p-4 bg-gray-50 rounded-xl">
                      Select any figure to learn about their life, contributions, and historical significance!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'translator' && (
          <div className="max-w-6xl mx-auto">
            {/* Language Translator - Optimized Layout */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Languages className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Language Translator</h2>
                  <p className="text-gray-600">Powered by BHASHINI API - Government of India</p>
                </div>
              </div>

              {/* Main Translator Interface */}
              <div className="mb-8">
                <CulturaErrorBoundary>
                  <LanguageSelector
                    selectedLang={language}
                    onLanguageChange={handleLanguageChange}
                  />
                </CulturaErrorBoundary>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Real-time Translation</h3>
                  <p className="text-sm text-purple-700">Instant translation using advanced AI models</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Languages className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">5 Languages</h3>
                  <p className="text-sm text-blue-700">English, Assamese, Manipuri, Bengali, Hindi</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Cultural Context</h3>
                  <p className="text-sm text-emerald-700">Culturally aware translations with context</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <Search className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Smart Caching</h3>
                  <p className="text-sm text-orange-700">Offline fallback for common phrases</p>
                </div>
              </div>

              {/* Language Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center bg-white/60 rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Supported Languages</div>
                </div>
                <div className="text-center bg-white/60 rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-blue-600 mb-1">100+</div>
                  <div className="text-sm text-gray-600">Cultural Terms</div>
                </div>
                <div className="text-center bg-white/60 rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">1000+</div>
                  <div className="text-sm text-gray-600">Cached Translations</div>
                </div>
                <div className="text-center bg-white/60 rounded-xl p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>

              {/* Supported Languages Grid */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">Supported Languages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'English', native: 'English', script: 'Latin', flag: '🇬🇧' },
                    { name: 'Assamese', native: 'অসমীয়া', script: 'Bengali', flag: '🇮🇳' },
                    { name: 'Manipuri', native: 'ꯃꯅꯤꯄꯨꯔꯤ', script: 'Meetei Mayek', flag: '🇮🇳' },
                    { name: 'Bengali', native: 'বাংলা', script: 'Bengali', flag: '🇧🇩' },
                    { name: 'Hindi', native: 'हिन्दी', script: 'Devanagari', flag: '🇮🇳' }
                  ].map((lang, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-semibold text-gray-800">{lang.name}</div>
                          <div className="text-sm text-gray-600">{lang.native}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Script: {lang.script}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Assistant - Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 h-[700px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden bg-white">
                    <img src="/chatbot.png" alt="AI Assistant" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">AI Cultural Assistant</h2>
                    <p className="text-gray-600">Ask questions about Northeast India's cultural heritage</p>
                  </div>
                </div>
                <CulturaErrorBoundary>
                  <ChatInterface onEntitySelect={handleEntitySelect} />
                </CulturaErrorBoundary>
              </div>
            </div>

            {/* Assistant Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">How to Use</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Ask questions about festivals, rituals, and traditions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Get detailed information about cultural practices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Discover connections between different cultures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Learn about historical significance</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-4">AI Capabilities</h3>
                <div className="space-y-3 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-blue-600" />
                    <span>Natural language conversations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search size={16} className="text-blue-600" />
                    <span>Cultural knowledge search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Network size={16} className="text-blue-600" />
                    <span>Entity relationship mapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages size={16} className="text-blue-600" />
                    <span>Multi-language support</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Sample Questions</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    "Tell me about Bihu festival"
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    "What are the main rituals in Manipur?"
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    "How are festivals celebrated in Assam?"
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    "What is the significance of Hornbill Festival?"
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <CulturaErrorBoundary>
            <Shop />
          </CulturaErrorBoundary>
        )}

        {activeTab === 'cart' && (
          <CulturaErrorBoundary>
            <Cart />
          </CulturaErrorBoundary>
        )}

        {activeTab === 'seller-dashboard' && isSeller && (
          <CulturaErrorBoundary>
            <SellerDashboard />
          </CulturaErrorBoundary>
        )}

        {activeTab === 'about' && (
          <div className="max-w-6xl mx-auto">
            {/* About - Main Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  ℹ️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">About CULTURA</h2>
                  <p className="text-gray-600">Northeast India Cultural Heritage Platform</p>
                </div>
              </div>

              {/* Platform Overview */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Platform Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  CULTURA is a comprehensive digital platform dedicated to preserving, showcasing, and promoting the rich cultural heritage of Northeast India. 
                  Our mission is to create a bridge between traditional knowledge and modern technology, making the diverse cultures of the region accessible to everyone.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The platform covers all 8 Northeast states with authentic, community-verified information about festivals, traditions, tourist sites, 
                  historical figures, arts, crafts, cuisine, and more. We believe in respectful representation and proper attribution of indigenous knowledge.
                </p>
              </div>

              {/* Achievement Showcase */}
              <div className="mb-8">
                <CulturaErrorBoundary>
                  <AchievementShowcase entities={allEntities} />
                </CulturaErrorBoundary>
              </div>

              {/* Data Sources & Attribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Cultural Data Sources */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📚</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Cultural Heritage Data</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Northeast India Cultural Heritage Database</div>
                    <div>• Community-contributed festival information</div>
                    <div>• Tribal community documentation</div>
                    <div>• Academic research publications</div>
                    <div>• State tourism departments</div>
                    <div>• Archaeological Survey of India</div>
                  </div>
                </div>

                {/* Technology Partners */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🔧</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Technology Stack</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• BHASHINI API (Government of India)</div>
                    <div>• Leaflet Maps & OpenStreetMap</div>
                    <div>• React 19 & Vite</div>
                    <div>• Tailwind CSS</div>
                    <div>• Offline-first AI Architecture</div>
                    <div>• Progressive Web App (PWA)</div>
                  </div>
                </div>

                {/* Community Acknowledgment */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🤝</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Community Partners</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Assamese Cultural Organizations</div>
                    <div>• Manipuri Heritage Groups</div>
                    <div>• Northeast Tribal Councils</div>
                    <div>• Academic Institutions</div>
                    <div>• State Cultural Departments</div>
                    <div>• Local Community Leaders</div>
                  </div>
                </div>
              </div>

              {/* Ethical Data Practices */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h4 className="font-semibold text-green-800">Ethical Data Practices</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                  <div>• Community consent and attribution for all cultural data</div>
                  <div>• Respectful representation of indigenous knowledge</div>
                  <div>• Open source datasets with proper licensing</div>
                  <div>• Privacy-compliant data collection and storage</div>
                  <div>• Cultural sensitivity in content presentation</div>
                  <div>• Regular community feedback and updates</div>
                </div>
              </div>

              {/* Features Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Platform Features</h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div>🗺️ Interactive map of Northeast India</div>
                    <div>🔗 Cultural connections and relationships</div>
                    <div>🏛️ Tourist sites and heritage locations</div>
                    <div>👑 Historical figures and personalities</div>
                    <div>🌐 Multi-language translation support</div>
                    <div>🤖 AI-powered cultural assistant</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">Educational Value</h4>
                  <div className="space-y-2 text-sm text-purple-700">
                    <div>📚 Comprehensive cultural database</div>
                    <div>🎓 Perfect for students and researchers</div>
                    <div>🧭 Tourism and travel planning</div>
                    <div>🌍 Cultural awareness and appreciation</div>
                    <div>🔍 Historical context and significance</div>
                    <div>🎨 Arts, crafts, and traditional practices</div>
                  </div>
                </div>
              </div>

              {/* Contact and Contribution */}
              <div className="text-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Community Contribution</h4>
                <p className="text-sm text-gray-600 mb-4">
                  This platform is built with respect for Northeast India's rich cultural heritage. 
                  We welcome contributions, corrections, and feedback from community members to ensure accuracy and authenticity.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                  <span>© 2024 CULTURA Platform</span>
                  <span>•</span>
                  <span>Built for cultural preservation</span>
                  <span>•</span>
                  <span>Community-driven content</span>
                  <span>•</span>
                  <span>Open source initiative</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Summary */}
        {showSearch && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                Search Results for "{searchQuery}"
              </h3>
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Found {searchResults.length} cultural elements matching your search. Click any result to explore in Cultural Connections.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map((entity) => (
                <button
                  key={entity.id}
                  onClick={() => selectFromSearch(entity)}
                  className="text-left p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      {entity.type === 'festival' ? '🎉' : entity.type === 'ritual' ? '🕯️' : entity.type === 'tourist-site' ? '🏛️' : entity.type === 'historical-figure' ? '👑' : '✨'}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{entity.name}</div>
                      <div className="text-sm text-gray-600">{entity.region}, {entity.state}</div>
                    </div>
                    <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      Click to explore
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {entity.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        </div>
      </main>

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

// Wrap the main app content with error boundary
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CulturaErrorBoundary>
          <AppContent />
        </CulturaErrorBoundary>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;