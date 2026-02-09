// Test Google OAuth Configuration

export const testGoogleClientId = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  console.log('🔍 Testing Google OAuth Configuration:');
  console.log('Client ID:', clientId);
  console.log('Client ID Length:', clientId?.length);
  console.log('Starts with number:', /^\d/.test(clientId));
  console.log('Ends with .apps.googleusercontent.com:', clientId?.endsWith('.apps.googleusercontent.com'));
  
  if (!clientId) {
    console.error('❌ VITE_GOOGLE_CLIENT_ID is not set in .env file');
    return false;
  }
  
  if (!clientId.endsWith('.apps.googleusercontent.com')) {
    console.error('❌ Client ID format is incorrect');
    return false;
  }
  
  console.log('✅ Client ID format looks correct');
  return true;
};

// Test function to check if Google Identity Services loads
export const testGoogleIdentityServices = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      console.log('✅ Google Identity Services already loaded');
      resolve(true);
      return;
    }
    
    console.log('🔄 Loading Google Identity Services...');
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('✅ Google Identity Services loaded successfully');
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('❌ Failed to load Google Identity Services');
      reject(false);
    };
    
    document.head.appendChild(script);
  });
};