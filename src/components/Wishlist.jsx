import { useState } from 'react';
import { Heart, ShoppingCart, Star, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import ProductDetails from './ProductDetails';

export default function Wishlist({ onBack }) {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { showCart, showWishlist } = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
    showCart(`${quantity} x ${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    showWishlist(`${productName} removed from wishlist`);
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Shop
            </button>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  <Heart size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
                  <p className="text-gray-600">Your favorite handloom products</p>
                </div>
              </div>
            </div>
          </div>
          
          {items.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your entire wishlist?')) {
                  clearWishlist();
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        {items.length === 0 ? (
          /* Empty Wishlist */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start adding products you love to your wishlist. Click the heart icon on any product to save it here.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Wishlist Items */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {items.length} {items.length === 1 ? 'Item' : 'Items'} in Wishlist
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center absolute inset-0" style={{display: product.images && product.images.length > 0 ? 'none' : 'flex'}}>
                      <span className="text-6xl opacity-50">🧵</span>
                    </div>
                    
                    {/* Remove from Wishlist Button */}
                    <div className="absolute top-3 right-3">
                      <button 
                        onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                      >
                        <Heart size={16} className="text-red-500 fill-current" />
                      </button>
                    </div>
                    
                    {/* Discount Badge */}
                    {product.originalPrice > product.price && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    
                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
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
          </div>
        )}
      </div>
    </div>
  );
}