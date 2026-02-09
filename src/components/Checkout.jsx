import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, Phone, Mail, User, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Checkout({ onBack }) {
  const { items, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      // You could redirect to order confirmation page here
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Thank you for supporting Northeast Indian artisans. Your order will be processed within 24 hours.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 max-w-md mx-auto">
            <div className="text-sm text-green-800">
              <div className="font-semibold mb-2">Order Details:</div>
              <div>Order ID: #CUL{Date.now().toString().slice(-6)}</div>
              <div>Total: ₹{total.toLocaleString()}</div>
              <div>Expected Delivery: 7-10 business days</div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="text-orange-500" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Assam">Assam</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark (Optional)</label>
                  <input
                    type="text"
                    name="landmark"
                    value={shippingInfo.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-orange-500" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-orange-500"
                    />
                    <CreditCard size={20} className="text-gray-600" />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </label>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-orange-500"
                    />
                    <span className="text-xl">📱</span>
                    <span className="font-semibold">UPI Payment</span>
                  </label>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-orange-500"
                    />
                    <span className="text-xl">💰</span>
                    <span className="font-semibold">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Review */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Review Your Order</h2>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg flex items-center justify-center">
                      <span className="text-2xl opacity-50">🧵</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.price.toLocaleString()} each</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}