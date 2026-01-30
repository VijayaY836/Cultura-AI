import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

class CulturaErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('CULTURA Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log to external service in production
    if (import.meta.env.PROD) {
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error, errorInfo) => {
    // In a real application, you would send this to your error tracking service
    // like Sentry, LogRocket, or Bugsnag
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId
    };

    // Example: Send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // });

    console.log('Error logged:', errorData);
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorId } = this.state;
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-gradient-hero cultural-pattern flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Main Error Card */}
            <div className="card-cultural text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <AlertTriangle className="text-white" size={40} />
              </div>
              
              <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                We encountered an unexpected error while displaying the cultural heritage content. 
                Don't worry - your data is safe and we're working to fix this.
              </p>

              {/* Error ID */}
              <div className="bg-gray-100 rounded-lg p-3 mb-6">
                <div className="text-sm text-gray-600 mb-1">Error ID</div>
                <div className="font-mono text-sm text-gray-800">{errorId}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={this.handleRetry}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleReload}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Reload Page
                </button>
              </div>

              {/* Help Text */}
              <div className="text-sm text-gray-500">
                If this problem persists, please contact our support team with the error ID above.
              </div>
            </div>

            {/* Development Error Details */}
            {isDevelopment && error && (
              <div className="mt-6 card-cultural animate-fade-in animate-stagger-1">
                <div className="flex items-center gap-2 mb-4">
                  <Bug className="text-red-600" size={20} />
                  <h2 className="font-display font-semibold text-gray-800">Development Error Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Error Message:</h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <code className="text-red-800 text-sm">{error.message}</code>
                    </div>
                  </div>
                  
                  {error.stack && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Stack Trace:</h3>
                      <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                          {error.stack}
                        </pre>
                      </div>
                    </div>
                  )}
                  
                  {errorInfo && errorInfo.componentStack && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Component Stack:</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-h-64 overflow-y-auto">
                        <pre className="text-xs text-blue-700 whitespace-pre-wrap">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cultural Context Recovery */}
            <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 animate-fade-in animate-stagger-2">
              <h3 className="font-display font-semibold text-emerald-800 mb-3">
                Continue Exploring Northeast India's Heritage
              </h3>
              <p className="text-emerald-700 text-sm mb-4">
                While we fix this issue, you can still explore our cultural data through these alternative methods:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-medium text-emerald-800 text-sm">🗺️ Interactive Map</div>
                  <div className="text-emerald-600 text-xs">Explore by geographical regions</div>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="font-medium text-emerald-800 text-sm">🌐 Language Translator</div>
                  <div className="text-emerald-600 text-xs">Access multilingual content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary(Component, fallback = null) {
  return function WrappedComponent(props) {
    return (
      <CulturaErrorBoundary fallback={fallback}>
        <Component {...props} />
      </CulturaErrorBoundary>
    );
  };
}

// Hook for error reporting in functional components
export function useErrorHandler() {
  const handleError = (error, errorInfo = {}) => {
    console.error('Manual error report:', error, errorInfo);
    
    // In production, send to error tracking service
    if (import.meta.env.PROD) {
      const errorData = {
        message: error.message || error,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...errorInfo
      };
      
      // Send to error tracking service
      console.log('Error reported:', errorData);
    }
  };

  return handleError;
}

// Network error handler
export class NetworkErrorHandler {
  static handle(error, context = '') {
    console.warn(`Network error in ${context}:`, error);
    
    if (error.name === 'AbortError') {
      return { type: 'timeout', message: 'Request timed out. Please try again.' };
    }
    
    if (!navigator.onLine) {
      return { type: 'offline', message: 'You appear to be offline. Please check your connection.' };
    }
    
    if (error.status >= 500) {
      return { type: 'server', message: 'Server error. Please try again later.' };
    }
    
    if (error.status === 429) {
      return { type: 'ratelimit', message: 'Too many requests. Please wait a moment.' };
    }
    
    return { type: 'unknown', message: 'An unexpected error occurred. Please try again.' };
  }
}

export default CulturaErrorBoundary;