import { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../contexts/ToastContext';
import Checkout from './Checkout';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { showSuccess, showWishlist } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} />;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some beautiful handloom products to get started!</p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
            🛒
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-gray-600">{items.length} items in your cart</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                      {item.images && item.images.length > 0 ? (
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center" style={{display: item.images && item.images.length > 0 ? 'none' : 'flex'}}>
                        <span className="text-3xl opacity-50">🧵</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{item.state}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            By {item.artisan}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              addToWishlist(item);
                              if (!isInWishlist(item.id)) {
                                showWishlist(`${item.name} added to wishlist!`);
                              }
                            }}
                            disabled={isInWishlist(item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isInWishlist(item.id)
                                ? 'text-pink-500 bg-pink-50 cursor-not-allowed'
                                : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50'
                            }`}
                            title={isInWishlist(item.id) ? 'Already in wishlist' : 'Add to wishlist'}
                          >
                            <Heart size={18} className={isInWishlist(item.id) ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => {
                              removeFromCart(item.id);
                              showSuccess(`${item.name} removed from cart`);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-200 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            ₹{item.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="text-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear All Items
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <Truck size={16} />
                  Shipping
                </span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              {shipping === 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  🎉 You saved ₹150 on shipping!
                </div>
              )}

              {subtotal < 2000 && (
                <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                  Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={() => window.history.back()}
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Security Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>7-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Authentic handloom guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}