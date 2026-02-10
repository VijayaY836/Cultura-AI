import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, Heart, ShoppingCart, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      ...toast,
      timestamp: Date.now()
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, options = {}) => {
    return addToast({
      type: 'success',
      message,
      icon: CheckCircle,
      ...options
    });
  }, [addToast]);

  const showError = useCallback((message, options = {}) => {
    return addToast({
      type: 'error',
      message,
      icon: AlertCircle,
      ...options
    });
  }, [addToast]);

  const showWishlist = useCallback((message, options = {}) => {
    return addToast({
      type: 'wishlist',
      message,
      icon: Heart,
      ...options
    });
  }, [addToast]);

  const showCart = useCallback((message, options = {}) => {
    return addToast({
      type: 'cart',
      message,
      icon: ShoppingCart,
      ...options
    });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWishlist,
    showCart
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const { type, message, icon: Icon } = toast;
  
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'wishlist':
        return 'bg-pink-50 border-pink-200 text-pink-800';
      case 'cart':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'wishlist':
        return 'text-pink-500';
      case 'cart':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`
      ${getToastStyles()}
      border rounded-xl p-4 shadow-lg backdrop-blur-sm
      transform transition-all duration-300 ease-out
      animate-in slide-in-from-right-full
      max-w-sm w-full
    `}>
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          <Icon size={20} className={type === 'wishlist' ? 'fill-current' : ''} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};