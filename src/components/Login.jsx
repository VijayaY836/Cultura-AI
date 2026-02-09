import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, ShoppingBag, Store, Loader } from 'lucide-react';
import { testGoogleClientId, testGoogleIdentityServices } from '../utils/testGoogleAuth';

export default function Login() {
  const { signInWithGoogle, loading } = useAuth();
  const [selectedRole, setSelectedRole] = useState('customer');
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    // Run debug tests on component mount
    const runDebugTests = async () => {
      const clientIdValid = testGoogleClientId();
      
      try {
        await testGoogleIdentityServices();
        setDebugInfo({
          clientIdValid,
          googleServicesLoaded: true,
          currentOrigin: window.location.origin
        });
      } catch (error) {
        setDebugInfo({
          clientIdValid,
          googleServicesLoaded: false,
          currentOrigin: window.location.origin,
          error: error.message
        });
      }
    };

    if (import.meta.env.VITE_DEBUG_MODE === 'true') {
      runDebugTests();
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(selectedRole);
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🛍️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to CULTURA</h1>
          <p className="text-gray-600">Sign in to access the handloom marketplace</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Choose your role:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedRole('customer')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === 'customer'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <ShoppingBag className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">Customer</div>
              <div className="text-xs opacity-75">Browse & Buy</div>
            </button>
            
            <button
              onClick={() => setSelectedRole('seller')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === 'seller'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <Store className="mx-auto mb-2" size={24} />
              <div className="font-semibold text-sm">Seller</div>
              <div className="text-xs opacity-75">Manage Store</div>
            </button>
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white border border-gray-300 rounded-xl px-6 py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Role Description */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600">
            {selectedRole === 'customer' ? (
              <>
                <strong>Customer Mode:</strong> Browse authentic handloom products, add to cart, place orders, and track deliveries.
              </>
            ) : (
              <>
                <strong>Seller Mode:</strong> List your handloom products, manage inventory, process orders, and track sales analytics.
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>

        {/* Debug Information */}
        {import.meta.env.VITE_DEBUG_MODE === 'true' && debugInfo && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
            <div className="font-semibold mb-2">🔍 Debug Info:</div>
            <div>Client ID Valid: {debugInfo.clientIdValid ? '✅' : '❌'}</div>
            <div>Google Services: {debugInfo.googleServicesLoaded ? '✅' : '❌'}</div>
            <div>Current Origin: {debugInfo.currentOrigin}</div>
            {debugInfo.error && <div className="text-red-600">Error: {debugInfo.error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}