/**
 * Offline Chatbot Service
 * Provides intelligent responses to cultural heritage questions without API keys
 */

import { culturalData } from '../data/culturalData.js';

// Generate dynamic knowledge base from cultural data
function generateKnowledgeBase() {
  const knowledgeBase = {};
  
  culturalData.forEach(entity => {
    const key = entity.name.toLowerCase().replace(/\s+/g, '-');
    const keywords = [
      entity.name.toLowerCase(),
      entity.type,
      entity.region.toLowerCase(),
      entity.state.toLowerCase(),
      entity.season,
      ...entity.communities.map(c => c.toLowerCase()),
      ...entity.rituals.map(r => r.toLowerCase()),
      ...entity.symbols.map(s => s.toLowerCase())
    ];

    // Create emoji based on type
    const getEmoji = (type) => {
      const emojis = {
        festival: '🎉',
        ritual: '🕯️',
        tradition: '✨',
        food: '🍽️',
        art: '🎨',
        dance: '💃'
      };
      return emojis[type] || '⭐';
    };

    knowledgeBase[key] = {
      keywords,
      response: `${getEmoji(entity.type)} **${entity.name}** - ${entity.region}, ${entity.state}

${entity.description}

🎭 **Cultural Elements**:
${entity.rituals.map(ritual => `- ${ritual}`).join('\n')}

🔮 **Symbols & Traditions**:
${entity.symbols.map(symbol => `- ${symbol}`).join('\n')}

👥 **Communities**: ${entity.communities.join(', ')}

📚 **Historical Context**: ${entity.historicalContext}

🌟 **Season**: ${entity.season.charAt(0).toUpperCase() + entity.season.slice(1)}`,
      sources: [entity.attribution],
      entity: entity
    };
  });

  // Add some additional general knowledge entries
  knowledgeBase['northeast-culture'] = {
    keywords: ['northeast', 'culture', 'heritage', 'tribes', 'diversity', 'eight states', 'seven sisters'],
    response: `🌈 **Northeast India Cultural Heritage**

Northeast India is a treasure trove of cultural diversity, home to over 200 tribes and numerous linguistic groups across 8 states.

🏔️ **The Eight States**:
- **Seven Sisters**: Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Tripura
- **Brother State**: Sikkim

🎭 **Cultural Diversity**:
- **200+ Tribal Communities** with distinct traditions, languages, and customs
- **100+ Languages** and dialects spoken across the region
- **Multiple Religions**: Hinduism, Buddhism, Christianity, and indigenous faiths

🍽️ **Culinary Heritage**:
- Rice as the staple food across all states
- Fermented foods and beverages (rice beer, fish, vegetables)
- Minimal use of oil, emphasis on boiled and steamed foods
- Use of indigenous herbs, bamboo shoots, and local vegetables

🏛️ **Shared Values**:
- Deep respect for nature and environmental conservation
- Strong community bonds and collective decision-making
- Hospitality and warmth towards guests
- Preservation of traditional knowledge and practices

Each state and tribe maintains its unique identity while sharing common threads of harmony with nature, community living, and cultural preservation.`,
    sources: ['Northeast India Cultural Survey', 'Tribal Heritage Documentation', 'Ministry of Culture, Government of India']
  };

  knowledgeBase['festivals'] = {
    keywords: ['festivals', 'celebrations', 'cultural events', 'traditional festivals'],
    response: `🎉 **Major Festivals of Northeast India**

Northeast India is known as the "Land of Festivals" with vibrant celebrations throughout the year:

🌸 **Spring Festivals**:
- **Bihu (Assam)**: The most important Assamese festival celebrating New Year
- **Chapchar Kut (Mizoram)**: Vibrant spring festival with bamboo dance
- **Lai Haraoba (Manipur)**: Ancient ritual festival of the Meitei people

❄️ **Winter Festivals**:
- **Hornbill Festival (Nagaland)**: Premier cultural festival showcasing all 16 Naga tribes
- **Losar (Sikkim & Arunachal Pradesh)**: Tibetan New Year celebration
- **Sangai Festival (Manipur)**: Cultural extravaganza named after the state animal

🍂 **Autumn Festivals**:
- **Wangala (Meghalaya)**: Harvest festival of the Garo tribe with hundred drums
- **Nongkrem Dance (Meghalaya)**: Sacred festival of the Khasi tribe

Each festival reflects the unique cultural identity and traditions of the respective communities.`,
    sources: ['Festival Documentation', 'Cultural Heritage Records']
  };

  knowledgeBase['food-cuisine'] = {
    keywords: ['food', 'cuisine', 'dishes', 'cooking', 'traditional food'],
    response: `🍽️ **Traditional Cuisine of Northeast India**

Northeast Indian cuisine is characterized by fresh ingredients, minimal oil, and unique flavors:

🐟 **Signature Dishes**:
- **Masor Tenga (Assam)**: Tangy fish curry with tomatoes or elephant apple
- **Eromba (Manipur)**: Spicy dish with fermented fish and king chili
- **Axone (Nagaland)**: Fermented soybean curry with smoked meat
- **Jadoh (Meghalaya)**: Traditional Khasi rice dish with pork
- **Thukpa (Sikkim)**: Hearty noodle soup with Tibetan influence

🌿 **Common Ingredients**:
- **Bamboo Shoots**: Used across all states in various preparations
- **Fermented Fish**: Adds umami flavor to many dishes
- **Indigenous Herbs**: Local varieties not found elsewhere
- **Rice**: Staple grain prepared in numerous ways

🥘 **Cooking Methods**:
- Steaming and boiling preferred over frying
- Smoking for preservation and flavor
- Fermentation for enhanced taste and nutrition
- Minimal use of spices, emphasis on natural flavors

The cuisine reflects the region's connection with nature and sustainable living practices.`,
    sources: ['Culinary Heritage Documentation', 'Traditional Cooking Practices']
  };

  return knowledgeBase;
}

// Generate knowledge base from cultural data
const CULTURAL_KNOWLEDGE_BASE = generateKnowledgeBase();

// Sample questions that the chatbot can answer
const SAMPLE_QUESTIONS = [
  "Tell me about Bihu festival",
  "What is Lai Haraoba?",
  "Describe the Hornbill Festival",
  "What is Wangala festival?",
  "Tell me about Chapchar Kut",
  "What is Losar festival?",
  "Tell me about traditional food of Northeast India",
  "What are the main festivals of Assam?",
  "Tell me about Sattriya dance",
  "What is Masor Tenga?",
  "Describe Manipuri classical dance",
  "What makes Northeast Indian culture unique?",
  "Tell me about bamboo crafts",
  "What is Axone?",
  "Describe Cheraw dance",
  "What are the eight Northeast states?",
  "Tell me about Muga silk",
  "What is Thukpa?",
  "Describe Assam silk weaving",
  "What is Eromba?"
];

/**
 * Get response for a user query using offline knowledge base
 */
export function getOfflineResponse(query) {
  const normalizedQuery = query.toLowerCase().trim();
  
  // First, check for exact name matches (highest priority)
  for (const [key, data] of Object.entries(CULTURAL_KNOWLEDGE_BASE)) {
    if (data.entity && data.entity.name.toLowerCase() === normalizedQuery) {
      return {
        response: data.response,
        sources: data.sources,
        confidence: 1.0,
        entity: data.entity
      };
    }
  }
  
  // Second, check for name substring matches
  for (const [key, data] of Object.entries(CULTURAL_KNOWLEDGE_BASE)) {
    if (data.entity && normalizedQuery.includes(data.entity.name.toLowerCase())) {
      return {
        response: data.response,
        sources: data.sources,
        confidence: 0.95,
        entity: data.entity
      };
    }
  }
  
  // Third, check for specific keyword matches with scoring
  const matches = [];
  for (const [key, data] of Object.entries(CULTURAL_KNOWLEDGE_BASE)) {
    let score = 0;
    const queryWords = normalizedQuery.split(' ');
    
    // Check each keyword against query
    data.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      
      // Exact match gets highest score
      if (normalizedQuery === keywordLower) {
        score += 100;
      }
      // Query contains the keyword
      else if (normalizedQuery.includes(keywordLower)) {
        score += 50;
      }
      // Keyword contains query word
      else if (queryWords.some(word => word.length > 2 && keywordLower.includes(word))) {
        score += 25;
      }
      // Partial match
      else if (keywordLower.includes(normalizedQuery) || normalizedQuery.includes(keywordLower)) {
        score += 10;
      }
    });
    
    // Bonus for entity name similarity
    if (data.entity) {
      const entityNameWords = data.entity.name.toLowerCase().split(' ');
      queryWords.forEach(queryWord => {
        if (queryWord.length > 2) {
          entityNameWords.forEach(nameWord => {
            if (nameWord.includes(queryWord) || queryWord.includes(nameWord)) {
              score += 30;
            }
          });
        }
      });
    }
    
    if (score > 0) {
      matches.push({ key, data, score });
    }
  }
  
  // Return the best match if any found
  if (matches.length > 0) {
    matches.sort((a, b) => b.score - a.score);
    const bestMatch = matches[0];
    
    // Only return if score is reasonable
    if (bestMatch.score >= 25) {
      return {
        response: bestMatch.data.response,
        sources: bestMatch.data.sources,
        confidence: Math.min(0.9, bestMatch.score / 100),
        entity: bestMatch.data.entity || null
      };
    }
  }
  
  // Check for state-based queries
  const stateQueries = [
    'assam', 'arunachal pradesh', 'manipur', 'meghalaya', 
    'mizoram', 'nagaland', 'sikkim', 'tripura'
  ];
  
  for (const state of stateQueries) {
    if (normalizedQuery.includes(state)) {
      // Find entities from this state
      const stateEntities = Object.values(CULTURAL_KNOWLEDGE_BASE)
        .filter(data => data.entity && data.entity.state.toLowerCase() === state)
        .slice(0, 3); // Get top 3 entities
      
      if (stateEntities.length > 0) {
        const stateCapitalized = state.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const entityList = stateEntities.map(data => 
          `- **${data.entity.name}** (${data.entity.type}): ${data.entity.description.substring(0, 100)}...`
        ).join('\n');
        
        return {
          response: `🏔️ **Cultural Heritage of ${stateCapitalized}**

Here are some key cultural elements from ${stateCapitalized}:

${entityList}

Ask me about any specific festival, food, or tradition for detailed information!`,
          sources: ['CULTURA Cultural Database'],
          confidence: 0.8
        };
      }
    }
  }
  
  // Check for category-based queries
  const categoryQueries = {
    'festival': 'festivals',
    'food': 'food-cuisine',
    'culture': 'northeast-culture',
    'dance': 'festivals',
    'art': 'northeast-culture'
  };
  
  for (const [category, key] of Object.entries(categoryQueries)) {
    if (normalizedQuery.includes(category)) {
      const data = CULTURAL_KNOWLEDGE_BASE[key];
      if (data) {
        return {
          response: data.response,
          sources: data.sources,
          confidence: 0.6
        };
      }
    }
  }
  
  // Default response for unmatched queries
  return {
    response: `I'd love to help you learn about Northeast Indian culture! Here are some topics I can discuss in detail:

🎭 **Festivals**: Bihu (Assam), Lai Haraoba (Manipur), Hornbill Festival (Nagaland), Wangala (Meghalaya), Chapchar Kut (Mizoram)

🍽️ **Traditional Food**: Masor Tenga, Eromba, Axone, Jadoh, Thukpa, Bamboo Shoot Curry

🎨 **Arts & Crafts**: Assam Silk Weaving, Bamboo Crafts, Manipuri Pottery, Naga Wood Carving

💃 **Dance Forms**: Bihu Dance, Manipuri Classical, Cheraw (Bamboo Dance), Sattriya, Cham Dance

🏛️ **Cultural Heritage**: Traditional rituals, tribal customs, and community practices

Try asking me about any of these topics! For example: "Tell me about Bihu festival" or "What is Masor Tenga?"`,
    sources: ['CULTURA Knowledge Base'],
    confidence: 0.3
  };
}

/**
 * Get sample questions that users can ask
 */
export function getSampleQuestions() {
  return SAMPLE_QUESTIONS;
}

/**
 * Check if a query can be answered offline
 */
export function canAnswerOffline(query) {
  const normalizedQuery = query.toLowerCase().trim();
  
  return Object.values(CULTURAL_KNOWLEDGE_BASE).some(data =>
    data.keywords.some(keyword => normalizedQuery.includes(keyword))
  );
}

/**
 * Get all available topics from the knowledge base
 */
export function getAvailableTopics() {
  return Object.keys(CULTURAL_KNOWLEDGE_BASE).map(key => {
    const data = CULTURAL_KNOWLEDGE_BASE[key];
    return {
      key,
      name: data.entity?.name || key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      type: data.entity?.type || 'general',
      keywords: data.keywords.slice(0, 5)
    };
  });
}

export default {
  getOfflineResponse,
  getSampleQuestions,
  canAnswerOffline,
  getAvailableTopics,
  CULTURAL_KNOWLEDGE_BASE
};