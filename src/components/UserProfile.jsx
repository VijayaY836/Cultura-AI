import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Settings, ShoppingBag, Store, ChevronDown, X } from 'lucide-react';

export default function UserProfile({ onClose }) {
  const { user, userMode, signOut, switchMode, isCustomer, isSeller } = useAuth();
  const [showModeSwitch, setShowModeSwitch] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleModeSwitch = (mode) => {
    switchMode(mode);
    setShowModeSwitch(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              {user?.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="text-white" size={24} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCustomer ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {isCustomer ? 'Customer' : 'Seller'}
                </span>
                {user?.verified && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Mode</label>
            <div className="relative">
              <button
                onClick={() => setShowModeSwitch(!showModeSwitch)}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isCustomer ? (
                    <>
                      <ShoppingBag className="text-blue-600" size={20} />
                      <span className="font-medium text-gray-800">Customer Mode</span>
                    </>
                  ) : (
                    <>
                      <Store className="text-green-600" size={20} />
                      <span className="font-medium text-gray-800">Seller Mode</span>
                    </>
                  )}
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </button>

              {showModeSwitch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleModeSwitch('customer')}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors ${
                      isCustomer ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <ShoppingBag size={20} />
                    <div className="text-left">
                      <div className="font-medium">Customer Mode</div>
                      <div className="text-xs opacity-75">Browse and purchase products</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleModeSwitch('seller')}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors ${
                      isSeller ? 'bg-green-50 text-green-700' : 'text-gray-700'
                    }`}
                  >
                    <Store size={20} />
                    <div className="text-left">
                      <div className="font-medium">Seller Mode</div>
                      <div className="text-xs opacity-75">Manage your store and products</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mode Description */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600">
              {isCustomer ? (
                <>
                  <strong>Customer Mode:</strong> You can browse handloom products, add items to cart, place orders, and track your purchases.
                </>
              ) : (
                <>
                  <strong>Seller Mode:</strong> You can list your handloom products, manage inventory, process orders, and view sales analytics.
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings size={20} />
              <span>Account Settings</span>
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}