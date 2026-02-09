import { useState } from 'react';
import { ShoppingBag, Filter, Search, Star, Heart, ShoppingCart } from 'lucide-react';
import { handloomProducts, categories, states } from '../data/shopData';
import { useCart } from '../contexts/CartContext';
import ProductDetails from './ProductDetails';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart, items } = useCart();

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
    addToCart(product);
    // Show success message (you can implement toast notifications)
    alert(`${product.name} added to cart!`);
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  if (selectedProduct) {
    return (
      <ProductDetails 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={isInCart(selectedProduct.id)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
              🛍️
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Handloom Shop</h1>
              <p className="text-gray-600">Authentic Northeast Indian Traditional Wear</p>
            </div>
          </div>
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
              <div className="relative h-64 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                <div className="text-6xl opacity-50">🧵</div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart size={16} className="text-gray-600" />
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

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
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
                      <ShoppingCart size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}