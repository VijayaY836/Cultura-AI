# CULTURA - Northeast India Cultural Heritage Platform

A comprehensive digital platform showcasing the rich cultural heritage of Northeast India's 8 states through interactive maps, cultural connections, language translation, AI-powered storytelling, and e-commerce for traditional handloom products.

## Overview

CULTURA is an immersive cultural heritage platform that celebrates the diverse traditions, festivals, languages, and communities of Northeast India. Built with modern web technologies, it provides an engaging way to explore and learn about the region's rich cultural tapestry while supporting local artisans through an integrated handloom marketplace.

Prototype link - https://cultura-ai.vercel.app/ (Zoom out to 65%)

## Key Features

### 🗺️ Interactive Map
- **Real-time exploration** of all 8 Northeast Indian states
- **Prominent map pins** with state-specific colors for easy identification
- **Clean, professional design** without visual clutter
- **Detailed state information** with cultural statistics
- **Responsive zoom and navigation** controls

### 🎭 Cultural Connections & Heritage Discovery
- **Category-based organization** of cultural elements
- **Advanced filtering** by type (Festivals, Rituals, Food, Arts, Dance, Traditions)
- **Search functionality** across all cultural data
- **Interactive cards** with detailed information
- **Grid and list view options** for optimal browsing

### 🌐 Language Translator
- **Multi-language support**: English, Assamese, Manipuri, Bengali, Hindi
- **BHASHINI API integration** (Government of India)
- **Offline translation fallback** with comprehensive dictionary
- **Cultural context awareness** for accurate translations
- **Smart caching system** for improved performance

### 👵 Moushumi Aaita - AI Storytelling Grandmother
**NEW FEATURE!** An AI-powered emotional companion that tells traditional Northeast Indian folktales

#### Features:
- **AI-Powered Sentiment Analysis** - Detects 5 emotions: bedtime, fear, joy, confusion, anger
- **Emotion Detection** - Analyzes user input using NLP and keyword matching
- **Context-Aware Stories** - Matches stories to emotional state and life context
- **8 Traditional Stories** across 5 emotion categories:
  - **Bedtime** (3 stories): Seven Sisters and the Sun, Hornbill and Sparrow, Princess Chitrāngadā
  - **Fear** (1 story): The Orphan and the Mountain
  - **Joy** (1 story): Chhura the Lucky Fool
  - **Confusion** (1 story): The Traveler in the Fog
  - **Anger** (2 stories): The Rainmaker's Temper, Why the River Changed Course
- **Read Aloud Feature** - Text-to-speech with Indian English voice
- **Story Navigation** - "Another Story" button for emotions with multiple stories
- **Cultural Wisdom** - Each story includes moral lessons and Aaita's wisdom

#### How It Works:
1. User shares their feelings or emotional state
2. AI analyzes sentiment and detects primary emotion
3. System selects appropriate traditional folktale
4. Story is presented with cultural context and wisdom
5. Optional read-aloud feature with grandmother's voice

### 🛍️ Handloom Shop - E-Commerce Platform
**NEW FEATURE!** Support local artisans by purchasing authentic Northeast Indian handloom products

#### Customer Features:
- **Product Catalog** - Browse authentic handloom products from all 8 states
- **Advanced Filtering** - Filter by category, state, price range
- **Search & Sort** - Find products by name, description, or artisan
- **Product Details** - Comprehensive information including artisan details
- **Shopping Cart** - Add multiple items with quantity selection
- **Wishlist** - Save favorite products for later
- **Secure Checkout** - Multiple payment options (Card, UPI, Cash on Delivery)
- **Order Summary** - Real-time pricing with tax and shipping calculations
- **Free Shipping** - On orders above ₹2000

#### Seller Dashboard:
- **Product Upload** - Add new handloom products with images
- **Inventory Management** - Track stock levels in real-time
- **Order Management** - View and process customer orders
- **Sales Analytics** - Monitor product performance
- **Product Editing** - Update prices, stock, and descriptions
- **Image Upload** - Support for multiple product images

#### Product Categories:
- Sarees (Muga Silk, Eri Silk, Traditional Weaves)
- Traditional Wear (Mekhela Chador, Phanek, Shawls)
- Jackets & Outerwear
- Traditional Cloth & Fabrics
- Handcrafted Accessories

#### Real-Time Synchronization:
- Products added by sellers appear instantly in customer shop
- Stock updates reflect immediately across platform
- Order processing updates inventory automatically
- Seller dashboard shows real-time sales data

### 🤖 AI Cultural Assistant
- **Intelligent chatbot** powered by comprehensive knowledge base
- **Natural language processing** for cultural queries
- **Sample questions** to guide user interactions
- **Offline-first approach** with 40+ cultural entities
- **Source attribution** and cultural context

### 🎲 Fun Facts & Statistics
- **25+ fascinating facts** about Northeast India
- **6 different categories**: Geography, Culture, Wildlife, Environment, Economy, Religion
- **Interactive fact generation** with beautiful animations
- **Comprehensive statistics** covering all 8 states

### 🔐 User Authentication
- **Google OAuth Integration** - Secure sign-in with Google accounts
- **User Profiles** - Personalized experience with order history
- **Role-Based Access** - Customer and Seller roles
- **Session Management** - Secure authentication state

## Cultural Coverage

### States Covered
- **Assam** - The Gateway to Northeast
- **Arunachal Pradesh** - Land of Dawn-lit Mountains  
- **Manipur** - Jewel of India
- **Meghalaya** - Abode of Clouds
- **Mizoram** - Land of the Hill People
- **Nagaland** - Land of Festivals
- **Sikkim** - The Hidden Paradise
- **Tripura** - Land of Fourteen Gods

### Cultural Elements
- **40+ Festivals**: Bihu, Hornbill, Losar, Wangala, Chapchar Kut, and more
- **Traditional Foods**: Masor Tenga, Eromba, Axone, Jadoh, Thukpa, Gundruk
- **Arts & Crafts**: Assam Silk, Bamboo Crafts, Wood Carving, Traditional Jewelry
- **Dance Forms**: Bihu Dance, Manipuri Classical, Cheraw, Cham Dance
- **Rituals & Traditions**: Lai Haraoba, Ambubachi Mela, Pang Lhabsol

## Technology Stack

### Frontend
- **React 19** - Modern UI framework with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### State Management
- **React Context API** - Global state management
- **Custom Contexts**: AuthContext, CartContext, ProductContext, WishlistContext, ToastContext

### AI & NLP
- **Sentiment Analysis** - Custom keyword-based emotion detection
- **Natural Language Processing** - Text analysis for emotion classification
- **Web Speech API** - Text-to-speech for story narration

### Mapping & Visualization
- **Leaflet** - Interactive maps
- **React Leaflet** - React integration for Leaflet
- **OpenStreetMap** - Map tile provider
- **Custom GeoJSON** - State boundary data

### APIs & Services
- **BHASHINI API** - Government of India translation service
- **Google OAuth 2.0** - Secure authentication
- **Offline Translation** - Custom dictionary-based fallback
- **Cultural Knowledge Base** - Comprehensive offline database

### Data Storage
- **LocalStorage** - Client-side data persistence
- **Base64 Image Storage** - Product image handling
- **Session Management** - User authentication state

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VijayaY836/Cultura-AI.git
   cd cultura-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your credentials:
   # - BHASHINI API credentials (optional - offline mode available)
   # - Google OAuth Client ID (for authentication)
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
cultura-ai/
├── public/                 # Static assets
│   ├── logo.png           # CULTURA logo
│   ├── Aaita.png          # Moushumi Aaita avatar
│   ├── chatbot.png        # AI assistant icon
│   ├── bg.png             # Header background
│   ├── bg2.png            # Main background
│   ├── HandCrafts.jpg     # Handloom product images
│   ├── muga-silk-saree.jpg
│   ├── Elephants.jpg
│   └── data/              # CSV data files
├── src/
│   ├── components/        # React components
│   │   ├── InteractiveMap.jsx
│   │   ├── KnowledgeGraph.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── MoushumiAaita.jsx      # AI Storytelling
│   │   ├── Shop.jsx               # E-commerce
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Login.jsx
│   │   ├── UserProfile.jsx
│   │   ├── seller/
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── ProductUpload.jsx
│   │   │   ├── SellerProducts.jsx
│   │   │   └── SellerOrders.jsx
│   │   ├── FunFactsSection.jsx
│   │   └── ...
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ProductContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/              # Cultural and product data
│   │   ├── culturalData.js
│   │   ├── aaitaStories.js
│   │   └── shopData.js
│   ├── services/          # API and utility services
│   │   ├── api.js
│   │   ├── bhashini.js
│   │   ├── googleAuth.js
│   │   ├── sentimentAnalysis.js
│   │   ├── offlineChatbot.js
│   │   ├── offlineTranslation.js
│   │   ├── mapService.js
│   │   └── funFacts.js
│   └── App.jsx            # Main application component
├── .env.example           # Environment variables template
└── README.md             # This file
```

## Prototype Screenshots
<img width="1890" height="951" alt="image" src="https://github.com/user-attachments/assets/7d9f84b9-7760-4838-899b-6d990068939c" /> Interactive Map


<img width="1889" height="957" alt="image" src="https://github.com/user-attachments/assets/1f71eccd-1e0e-4515-aa36-0b8960540c9e" />
<img width="1894" height="961" alt="image" src="https://github.com/user-attachments/assets/5262c1f3-246d-4285-a56c-95d3368ae8f9" />  Cultural Connections


<img width="1918" height="956" alt="image" src="https://github.com/user-attachments/assets/9014c4ff-a96f-461f-9bc5-345a554a40a9" /> Language Translator


<img width="1890" height="954" alt="image" src="https://github.com/user-attachments/assets/a46370c7-8f39-450d-b83b-c71cf82d590a" /> Cultural Assistant (Chatbot)



## Features in Detail

### Interactive Map
- **8 Northeast states** with accurate geographical positioning
- **Color-coded map pins** for easy state identification
- **Hover and click interactions** for state exploration
- **Responsive design** that works on all devices
- **Clean, professional appearance** without visual clutter

### Moushumi Aaita - AI Storytelling
- **Sentiment Analysis Engine** with 5 emotion categories
- **8 Traditional Folktales** from Northeast India
- **Context-aware story selection** based on user emotions
- **Read Aloud Feature** with Indian English voice
- **Cultural wisdom and moral lessons** with each story
- **Story navigation** for emotions with multiple tales
- **Beautiful UI** with grandmother avatar and animations

### Handloom E-Commerce
- **Real-time inventory management** across seller and customer views
- **Product synchronization** - seller uploads appear instantly
- **Stock tracking** - automatic updates on purchases
- **Multiple payment methods** - Card, UPI, Cash on Delivery
- **Shopping cart** with quantity management
- **Wishlist functionality** for saving favorites
- **Order processing** with tax and shipping calculations
- **Seller analytics** for tracking sales performance

### Cultural Heritage Database
- **40+ cultural entities** across all categories
- **Comprehensive information** including historical context
- **Community attribution** and source references
- **Multilingual support** with proper cultural context
- **Regular updates** from community contributions

### AI Assistant Capabilities
- **Natural language understanding** for cultural queries
- **Contextual responses** with source attribution
- **Sample questions** to guide user exploration
- **Offline-first architecture** for reliable performance
- **Cultural sensitivity** in all responses

## Cultural Impact

CULTURA serves as a digital preservation and economic empowerment platform for Northeast India, providing:

- **Educational resource** for students and researchers
- **Cultural awareness** for tourists and visitors
- **Economic opportunities** for local artisans and weavers
- **Direct market access** for handloom products
- **Emotional support** through AI-powered storytelling
- **Language preservation** through translation services
- **Intergenerational knowledge transfer** through digital archiving
- **Community engagement** through accurate cultural representation
- **Sustainable livelihoods** for traditional craftspeople

## Contributing

We welcome contributions from the community! Please see our contributing guidelines for:

- **Cultural data accuracy** and community verification
- **Translation improvements** and language additions
- **Feature enhancements** and bug fixes
- **Documentation updates** and improvements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Northeast India Cultural Communities** for sharing their heritage
- **Government of India BHASHINI** for translation services
- **Academic institutions** and cultural researchers
- **Community elders** and cultural practitioners

## Contact

For questions, suggestions, or collaboration opportunities:


- **Email**:
- vijayayeditha8537@gmail.com
- palomajestadi@gmail.com
- saispoorthyeturu6@gmail.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/VijayaY836/Cultura-AI/issues)

---

**Built with ❤️ for preserving and celebrating Northeast India's cultural heritage**
