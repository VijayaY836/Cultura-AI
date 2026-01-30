# CULTURA - Northeast India Cultural Heritage Platform

A comprehensive digital platform showcasing the rich cultural heritage of Northeast India's 8 states through interactive maps, cultural connections, language translation, and AI-powered assistance.

## Overview

CULTURA is an immersive cultural heritage platform that celebrates the diverse traditions, festivals, languages, and communities of Northeast India. Built with modern web technologies, it provides an engaging way to explore and learn about the region's rich cultural tapestry.

## Key Features

### Interactive Map
- **Real-time exploration** of all 8 Northeast Indian states
- **Prominent map pins** with state-specific colors for easy identification
- **Clean, professional design** without visual clutter
- **Detailed state information** with cultural statistics
- **Responsive zoom and navigation** controls

### Cultural Connections & Heritage Discovery
- **Category-based organization** of cultural elements
- **Advanced filtering** by type (Festivals, Rituals, Food, Arts, Dance, Traditions)
- **Search functionality** across all cultural data
- **Interactive cards** with detailed information
- **Grid and list view options** for optimal browsing

### Language Translator
- **Multi-language support**: English, Assamese, Manipuri, Bengali, Hindi
- **BHASHINI API integration** (Government of India)
- **Offline translation fallback** with comprehensive dictionary
- **Cultural context awareness** for accurate translations
- **Smart caching system** for improved performance

### AI Cultural Assistant
- **Intelligent chatbot** powered by comprehensive knowledge base
- **Natural language processing** for cultural queries
- **Sample questions** to guide user interactions
- **Offline-first approach** with 40+ cultural entities
- **Source attribution** and cultural context

### Fun Facts & Statistics
- **25+ fascinating facts** about Northeast India
- **6 different categories**: Geography, Culture, Wildlife, Environment, Economy, Religion
- **Interactive fact generation** with beautiful animations
- **Comprehensive statistics** covering all 8 states

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
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Mapping & Visualization
- **Leaflet** - Interactive maps
- **React Leaflet** - React integration for Leaflet
- **OpenStreetMap** - Map tile provider
- **Custom GeoJSON** - State boundary data

### APIs & Services
- **BHASHINI API** - Government of India translation service
- **Offline Translation** - Custom dictionary-based fallback
- **Cultural Knowledge Base** - Comprehensive offline database

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
   # Add your BHASHINI API credentials (optional - offline mode available)
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
│   ├── chatbot.png        # AI assistant icon
│   ├── bg.png             # Header background
│   ├── bg2.png            # Main background
│   └── data/              # CSV data files
├── src/
│   ├── components/        # React components
│   │   ├── InteractiveMap.jsx
│   │   ├── KnowledgeGraph.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── FunFactsSection.jsx
│   │   └── ...
│   ├── data/              # Cultural data
│   │   └── culturalData.js
│   ├── services/          # API and utility services
│   │   ├── api.js
│   │   ├── bhashini.js
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

CULTURA serves as a digital preservation platform for Northeast India's rich cultural heritage, providing:

- **Educational resource** for students and researchers
- **Cultural awareness** for tourists and visitors
- **Community engagement** through accurate representation
- **Language preservation** through translation services
- **Intergenerational knowledge transfer** through digital archiving

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
- palomajestadi@gmail.com
- vijayayeditha8537@gmail.com
- saispoorthyeturu6@gmail.com
- **GitHub Issues**: [Report bugs or request features](https://github.com/VijayaY836/Cultura-AI/issues)

---

**Built with ❤️ for preserving and celebrating Northeast India's cultural heritage**
