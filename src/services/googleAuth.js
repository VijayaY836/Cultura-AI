// Google OAuth Service - Real Google Identity Services Implementation

class GoogleAuthService {
  constructor() {
    // Temporary hard-coded for testing
    this.clientId = '550029104635-2p3q3nhbu5qioo75130hvm23eig2mk7u.apps.googleusercontent.com';
    this.isInitialized = false;
    
    console.log('🔧 GoogleAuthService constructor (HARD-CODED)');
    console.log('Using Client ID:', this.clientId);
  }

  // Initialize Google Identity Services
  async initialize() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.initializeGoogleAuth();
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
        document.head.appendChild(script);
      } else {
        this.initializeGoogleAuth();
        resolve();
      }
    });
  }

  initializeGoogleAuth() {
    console.log('🔍 Initializing Google Auth...');
    console.log('Client ID from env:', this.clientId);
    console.log('All env vars:', import.meta.env);
    
    if (!this.clientId || this.clientId === 'your_google_client_id_here') {
      console.error('❌ Google Client ID not found or is placeholder. Please set VITE_GOOGLE_CLIENT_ID in your .env file');
      console.error('Current value:', this.clientId);
      return;
    }

    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });

    console.log('✅ Google Auth initialized successfully');
    this.isInitialized = true;
  }

  // Handle the credential response from Google
  handleCredentialResponse(response) {
    // This will be called automatically when user signs in
    // The response contains the JWT token
    if (this.onSignInCallback) {
      this.decodeJWT(response.credential)
        .then(userData => this.onSignInCallback(userData))
        .catch(error => console.error('Error decoding JWT:', error));
    }
  }

  // Decode JWT token to get user information
  async decodeJWT(token) {
    try {
      // Decode the JWT token (you might want to verify it on your backend)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        verified: payload.email_verified,
        role: 'customer' // Default role, you can determine this from your backend
      };
    } catch (error) {
      throw new Error('Failed to decode JWT token');
    }
  }

  // Sign in with Google
  async signIn() {
    await this.initialize();
    
    return new Promise((resolve, reject) => {
      this.onSignInCallback = resolve;
      
      // Show Google Sign-In prompt
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup if prompt is not displayed
          this.signInWithPopup().then(resolve).catch(reject);
        }
      });
    });
  }

  // Alternative: Sign in with popup
  async signInWithPopup() {
    await this.initialize();

    return new Promise((resolve, reject) => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: 'email profile',
        callback: async (response) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }

          try {
            // Get user info using the access token
            const userInfo = await this.getUserInfo(response.access_token);
            resolve({
              id: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
              verified: userInfo.verified_email,
              role: 'customer'
            });
          } catch (error) {
            reject(error);
          }
        }
      });

      client.requestAccessToken();
    });
  }

  // Get user information using access token
  async getUserInfo(accessToken) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);
    if (!response.ok) {
      throw new Error('Failed to get user information');
    }
    return response.json();
  }

  // Sign out
  async signOut() {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
    return Promise.resolve();
  }
}

// Export the real Google Auth service
export const googleAuthService = new GoogleAuthService();