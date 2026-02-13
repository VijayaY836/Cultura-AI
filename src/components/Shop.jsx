import { useState } from 'react';
import { Filter, Search, Star, Heart, ShoppingCart, ShoppingBag, SearchX } from 'lucide-react';
import { categories, states } from '../data/shopData';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';
import { ProductGridSkeleton, LoadingButton } from './LoadingComponents';
import ProductDetails from './ProductDetails';
import Wishlist from './Wishlist';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState('shop'); // 'shop' or 'wishlist'
  const [quantities, setQuantities] = useState({}); // Track quantities for each product
  
  const { addToCart, isInCart } = useCart();
  const { getAllProducts } = useProducts();
  const { addToWishlist, removeFromWishlist, isInWishlist, getWishlistItemsCount } = useWishlist();
  const { showSuccess, showCart, showWishlist } = useToast();
  
  // Get all products from the global context (includes both initial and seller products)
  const handloomProducts = getAllProducts();

  // Filter products
  let filteredProducts = handloomProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesState = selectedState === 'All States' || product.state === selectedState;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesState && matchesSearch;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    showCart(`${quantity} x ${product.name} added to cart!`);
    // Reset quantity after adding to cart
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const updateQuantity = (productId, quantity) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, quantity) }));
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showWishlist(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showWishlist(`${product.name} added to wishlist!`);
    }
  };

  // Show wishlist view
  if (activeView === 'wishlist') {
    return <Wishlist onBack={() => setActiveView('shop')} />;
  }

  if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity = 1) => {
          addToCart(product, quantity);
          showCart(`${quantity} x ${product.name} added to cart!`);
        }}
        isInCart={isInCart(selectedProduct.id)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Handloom Shop</h1>
              <p className="text-gray-600">Authentic Northeast Indian Traditional Wear</p>
            </div>
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={() => setActiveView('wishlist')}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-xl hover:bg-pink-200 transition-colors"
          >
            <Heart size={20} />
            <span className="hidden sm:inline">Wishlist</span>
            {getWishlistItemsCount() > 0 && (
              <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getWishlistItemsCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search handloom products..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
          >
            <Filter size={16} />
            Filters
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[0].startsWith('data:') ? product.images[0] : `${product.images[0]}?t=${Date.now()}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', product.images[0]);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center absolute inset-0" style={{display: product.images && product.images.length > 0 ? 'none' : 'flex'}}>
                  <img 
                    src={
                      product.category === 'Sarees' ? '/muga-silk-saree.jpg' :
                      product.category === 'Shawls' ? '/Elephants.jpg' :
                      '/HandCrafts.jpg'
                    } 
                    alt="Product placeholder" 
                    className="w-full h-full object-cover opacity-40" 
                  />
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className={`p-2 rounded-full transition-colors shadow-lg ${
                      isInWishlist(product.id) 
                        ? 'bg-pink-500 hover:bg-pink-600' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                  >
                    <Heart 
                      size={16} 
                      className={`${
                        isInWishlist(product.id) 
                          ? 'text-white fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    {product.state}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                <div className="text-xs text-gray-600 mb-3">
                  By {product.artisan} • {product.village}
                </div>

                {/* Quantity Selection */}
                {!isInCart(product.id) && product.inStock && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) - 1)}
                        disabled={(quantities[product.id] || 1) <= 1}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                        disabled={(quantities[product.id] || 1) >= (product.stock || product.stockCount || 10)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.stock || product.stockCount || 10} available)
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <LoadingButton
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock || isInCart(product.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !product.inStock 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isInCart(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {!product.inStock ? (
                      'Out of Stock'
                    ) : isInCart(product.id) ? (
                      'In Cart'
                    ) : (
                      <div className="flex items-center gap-1">
                        <ShoppingCart size={16} />
                        {quantities[product.id] && quantities[product.id] > 1 && (
                          <span className="text-xs">({quantities[product.id]})</span>
                        )}
                      </div>
                    )}
                  </LoadingButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <SearchX size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}