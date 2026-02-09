# 🔐 Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google Identity Services

## Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in required information:
   - App name: `CULTURA AI`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`
5. Add test users (for development)

## Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Configure:
   - Name: `CULTURA AI Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production)

## Step 4: Update Environment Variables

Copy your Client ID and update `.env`:

```env
# Replace with your actual Google Client ID
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# Optional: Client Secret (for backend use)
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here
```

## Step 5: Switch from Mock to Real Auth

In `src/contexts/AuthContext.jsx`, the system automatically detects if you have a Google Client ID:

- **With Client ID**: Uses real Google OAuth
- **Without Client ID**: Uses mock authentication (current state)

## Step 6: Install Dependencies (if using Firebase alternative)

If you prefer Firebase Auth instead of Google Identity Services:

```bash
npm install firebase
```

Then update your `.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Step 7: Test Authentication

1. Set `VITE_NODE_ENV=production` in `.env` to use real auth in development
2. Restart your development server: `npm run dev`
3. Try signing in - you should see the real Google OAuth popup

## Current State

- ✅ **Mock Auth**: Currently active (no setup required)
- ⏳ **Real Google OAuth**: Ready to activate (just add Client ID)
- ⏳ **Firebase Auth**: Alternative option available

## Files Modified for Real Auth

1. **`.env`** - Environment variables
2. **`src/services/googleAuth.js`** - Real Google OAuth implementation
3. **`src/contexts/AuthContext.jsx`** - Auto-detects auth method

## Security Notes

- Never commit `.env` file to version control
- Use different Client IDs for development and production
- Regularly rotate your client secrets
- Implement proper token validation on your backend

## Troubleshooting

### "Client ID not found" error
- Make sure `VITE_GOOGLE_CLIENT_ID` is set in `.env`
- Restart your development server after adding environment variables

### "Origin not allowed" error
- Add your domain to Authorized JavaScript origins in Google Cloud Console
- Make sure the origin matches exactly (including protocol and port)

### "Popup blocked" error
- Allow popups for your domain
- Use the credential prompt method instead of popup

## Production Deployment

When deploying to production:

1. Update authorized origins in Google Cloud Console
2. Set production environment variables
3. Test authentication flow thoroughly
4. Monitor for any CORS or domain issues

---

**Current Status**: Mock authentication is active. Add your Google Client ID to `.env` to enable real OAuth! 🚀