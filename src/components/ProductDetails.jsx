import { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';

export default function ProductDetails({ product, onBack, onAddToCart, isInCart }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showWishlist } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showWishlist(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showWishlist(`${product.name} added to wishlist!`);
    }
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely beautiful handloom work! The quality is exceptional and the colors are vibrant. Highly recommended!",
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      date: "2024-01-10",
      comment: "Good quality product. Delivery was on time. The artisan's work is really impressive.",
      verified: true
    },
    {
      id: 3,
      name: "Anita Das",
      rating: 5,
      date: "2024-01-05",
      comment: "Perfect for cultural events. The traditional patterns are authentic and beautiful.",
      verified: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back Button */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImage] || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" style={{display: product.images && product.images.length > 0 ? 'none' : 'flex'}}>
                <span className="text-8xl opacity-50">🧵</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg border-2 transition-colors overflow-hidden ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-2xl opacity-50">🧵</span>
                    </div>
                  </button>
                ))
              ) : (
                [0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    } bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center`}
                  >
                    <span className="text-2xl opacity-50">🧵</span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {product.state}
                </span>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Artisan Information */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Artisan Information</h3>
              <div className="space-y-1 text-gray-600">
                <div><strong>Artisan:</strong> {product.artisan}</div>
                <div><strong>Location:</strong> {product.village}</div>
                <div><strong>Delivery:</strong> {product.deliveryTime}</div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockCount} items available
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isInCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                    !product.inStock 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isInCart
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {!product.inStock ? 'Out of Stock' : isInCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-3 border rounded-xl transition-colors ${
                    isInWishlist(product.id)
                      ? 'border-pink-500 bg-pink-50 hover:bg-pink-100'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={`${
                      isInWishlist(product.id) 
                        ? 'text-pink-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm font-semibold text-gray-800">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders above ₹2000</div>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm font-semibold text-gray-800">Easy Returns</div>
                <div className="text-xs text-gray-600">7 days return policy</div>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-orange-500" size={24} />
                <div className="text-sm font-semibold text-gray-800">Authentic</div>
                <div className="text-xs text-gray-600">100% genuine handloom</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {showReviews ? 'Hide Reviews' : 'Show All Reviews'}
          </button>
        </div>

        {showReviews && (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">{review.name}</span>
                        {review.verified && (
                          <Award size={16} className="text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}