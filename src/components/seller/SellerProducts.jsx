import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Package, AlertCircle } from 'lucide-react';
import ProductUpload from './ProductUpload';

export default function SellerProducts() {
  const [showUpload, setShowUpload] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Assamese Muga Silk Saree',
      price: 8500,
      originalPrice: 12000,
      category: 'Sarees',
      state: 'Assam',
      stock: 15,
      sold: 24,
      status: 'active',
      artisan: 'Kamala Devi',
      village: 'Sualkuchi, Assam',
      image: '🧵'
    },
    {
      id: 2,
      name: 'Naga Tribal Shawl',
      price: 4800,
      originalPrice: 6000,
      category: 'Shawls',
      state: 'Nagaland',
      stock: 8,
      sold: 18,
      status: 'active',
      artisan: 'Temsula Ao',
      village: 'Mokokchung, Nagaland',
      image: '🧵'
    },
    {
      id: 3,
      name: 'Manipuri Phanek',
      price: 3200,
      originalPrice: 4500,
      category: 'Traditional Wear',
      state: 'Manipur',
      stock: 0,
      sold: 12,
      status: 'out_of_stock',
      artisan: 'Ningombam Ongbi',
      village: 'Imphal, Manipur',
      image: '🧵'
    }
  ]);

  const handleSaveProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const toggleProductStatus = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'out_of_stock': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{totalProducts}</div>
          <div className="text-sm text-gray-600">Total Products</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-xl">✓</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{activeProducts}</div>
          <div className="text-sm text-gray-600">Active Products</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{outOfStock}</div>
          <div className="text-sm text-gray-600">Out of Stock</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 text-xl">₹</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">My Products</h2>
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center relative">
                <span className="text-6xl opacity-50">{product.image}</span>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status === 'active' ? 'Active' : 
                     product.status === 'out_of_stock' ? 'Out of Stock' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                    {product.state}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Stock: {product.stock}</span>
                  <span>Sold: {product.sold}</span>
                </div>
                
                <div className="text-xs text-gray-600 mb-4">
                  By {product.artisan} • {product.village}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-1">
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first handloom product</p>
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <ProductUpload
          onClose={() => setShowUpload(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}