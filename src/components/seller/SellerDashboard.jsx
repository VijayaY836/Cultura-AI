import { useState } from 'react';
import { BarChart3, Package, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductContext';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';
import ProductUpload from './ProductUpload';

export default function SellerDashboard() {
  const { user } = useAuth();
  const { getSellerProducts } = useProducts();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpload, setShowUpload] = useState(false);

  // Get real seller statistics from products
  const sellerProducts = getSellerProducts();
  const sellerStats = {
    totalProducts: sellerProducts.length,
    totalOrders: sellerProducts.reduce((sum, p) => sum + (p.sold || 0), 0),
    totalRevenue: sellerProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.sold || 0)), 0),
    pendingOrders: 5, // This would come from orders system
    completedOrders: sellerProducts.reduce((sum, p) => sum + (p.sold || 0), 0),
    monthlyRevenue: Math.round(sellerProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.sold || 0)), 0) * 0.3), // Simulate monthly revenue
    monthlyOrders: Math.round(sellerProducts.reduce((sum, p) => sum + (p.sold || 0), 0) * 0.3) // Simulate monthly orders
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Quick Upload
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Statistics', icon: BarChart3 },
            { id: 'products', label: 'My Products', icon: Package },
            { id: 'orders', label: 'Manage Orders', icon: ShoppingCart }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="text-blue-600" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{sellerStats.totalProducts}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="text-green-600" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{sellerStats.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-purple-600 text-xl">₹</span>
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹{sellerStats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-orange-600 text-xl">📈</span>
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹{sellerStats.monthlyRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('products')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <Package size={20} className="text-blue-600" />
                  <span>Manage Products</span>
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <ShoppingCart size={20} className="text-green-600" />
                  <span>View Orders</span>
                </button>
                <button 
                  onClick={() => setShowUpload(true)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                >
                  <Plus size={20} className="text-orange-600" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>New order received - ORD001</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Product updated - Muga Silk Saree</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Order shipped - ORD002</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Orders this month</span>
                  <span className="font-semibold">{sellerStats.monthlyOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending orders</span>
                  <span className="font-semibold text-orange-600">{sellerStats.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed orders</span>
                  <span className="font-semibold text-green-600">{sellerStats.completedOrders}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && <SellerProducts />}
      {activeTab === 'orders' && <SellerOrders />}

      {/* Upload Modal */}
      {showUpload && (
        <ProductUpload
          onClose={() => setShowUpload(false)}
          onSave={(product) => {
            console.log('New product:', product);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
}