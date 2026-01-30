/**
 * Fun Facts Service for Northeast India
 * Provides interesting, short facts about Northeast Indian culture and geography
 */

const NORTHEAST_FUN_FACTS = [
  {
    id: 1,
    fact: "Arunachal Pradesh receives the first rays of sunlight in India every morning from the village of Dong.",
    category: "Geography",
    icon: "🌅",
    source: "Bikat Adventures"
  },
  {
    id: 2,
    fact: "Mawlynnong in Meghalaya is Asia's cleanest village with 95% literacy rate and a matrilineal society.",
    category: "Culture",
    icon: "🌿",
    source: "Discover India Magazine"
  },
  {
    id: 3,
    fact: "Mawsynram in Meghalaya is the wettest place on Earth, receiving 467 inches of rainfall annually.",
    category: "Geography",
    icon: "🌧️",
    source: "Weather Records"
  },
  {
    id: 4,
    fact: "Manipur's Ima Market is the world's only market run exclusively by women, with over 3,000 vendors.",
    category: "Culture",
    icon: "👩‍💼",
    source: "Cultural Heritage"
  },
  {
    id: 5,
    fact: "Keibul Lamjao in Manipur is the world's only floating national park, home to the dancing Sangai deer.",
    category: "Wildlife",
    icon: "🦌",
    source: "National Parks India"
  },
  {
    id: 6,
    fact: "Sikkim became the world's first fully organic state in 2016, banning all chemical fertilizers and pesticides.",
    category: "Environment",
    icon: "🌱",
    source: "Government of Sikkim"
  },
  {
    id: 7,
    fact: "Assam's Majuli Island is the world's largest inhabited river island, spanning over 880 square kilometers.",
    category: "Geography",
    icon: "🏝️",
    source: "Assam Tourism"
  },
  {
    id: 8,
    fact: "Kongthong village in Meghalaya is known as the 'Whistling Village' where people call each other by unique whistling tunes.",
    category: "Culture",
    icon: "🎵",
    source: "Cultural Documentation"
  },
  {
    id: 9,
    fact: "Northeast India shares 98% of its borders with foreign countries and only 2% with mainland India.",
    category: "Geography",
    icon: "🗺️",
    source: "Border Studies"
  },
  {
    id: 10,
    fact: "Assam produces Muga silk, the world's rarest golden silk that cannot be produced anywhere else on Earth.",
    category: "Crafts",
    icon: "🧵",
    source: "Silk Board of India"
  },
  {
    id: 11,
    fact: "Krem Liat Prah in Meghalaya is Asia's longest cave system, stretching over 30 kilometers underground.",
    category: "Geography",
    icon: "🕳️",
    source: "Cave Research Foundation"
  },
  {
    id: 12,
    fact: "Polo was invented in Manipur and is still played there as 'Sagol Kangjei' meaning 'horse hockey'.",
    category: "Sports",
    icon: "🐎",
    source: "Sports History"
  },
  {
    id: 13,
    fact: "Mizoram has shops without shopkeepers where customers pay by dropping money in trust boxes.",
    category: "Culture",
    icon: "🏪",
    source: "Cultural Practices"
  },
  {
    id: 14,
    fact: "Northeast India contains 35% of the entire Indian Himalayan range across its eight states.",
    category: "Geography",
    icon: "🏔️",
    source: "Himalayan Studies"
  },
  {
    id: 15,
    fact: "Nagaland's Hornbill Festival showcases traditions of all 16 Naga tribes in one spectacular celebration.",
    category: "Culture",
    icon: "🦅",
    source: "Nagaland Tourism"
  },
  {
    id: 16,
    fact: "Assam's Jonbeel Mela is a three-day festival where communities still practice the ancient barter system.",
    category: "Culture",
    icon: "🤝",
    source: "Traditional Practices"
  },
  {
    id: 17,
    fact: "Tripura is home to 19 different tribal communities, each with distinct languages and customs.",
    category: "Culture",
    icon: "👥",
    source: "Tribal Studies"
  },
  {
    id: 18,
    fact: "Cherrapunji in Meghalaya once recorded 905 inches of rainfall in a single year (1861).",
    category: "Geography",
    icon: "☔",
    source: "Meteorological Records"
  },
  {
    id: 19,
    fact: "Arunachal Pradesh has over 26 major tribes and 100 sub-tribes speaking 50+ different dialects.",
    category: "Culture",
    icon: "🗣️",
    source: "Linguistic Survey"
  },
  {
    id: 20,
    fact: "Loktak Lake in Manipur is South Asia's largest freshwater lake with floating islands called 'phumdis'.",
    category: "Geography",
    icon: "🌊",
    source: "Lake Studies"
  },
  {
    id: 21,
    fact: "Sikkim is India's least populous state but has the highest per capita income among northeastern states.",
    category: "Economy",
    icon: "💰",
    source: "Economic Survey"
  },
  {
    id: 22,
    fact: "Mount Khangchendzonga in Sikkim is the world's third-highest peak and is considered sacred by locals.",
    category: "Geography",
    icon: "⛰️",
    source: "Mountaineering Records"
  },
  {
    id: 23,
    fact: "Sikkim has four official languages: Nepali, Bhutia, Lepcha, and English, reflecting its diverse heritage.",
    category: "Culture",
    icon: "📚",
    source: "Linguistic Heritage"
  },
  {
    id: 24,
    fact: "The Lepcha people of Sikkim call their homeland 'Nye-mae-el' meaning 'paradise' in their ancient language.",
    category: "Culture",
    icon: "🏔️",
    source: "Indigenous Heritage"
  },
  {
    id: 25,
    fact: "Sikkim's Rumtek Monastery is one of the most significant seats of Tibetan Buddhism outside Tibet.",
    category: "Religion",
    icon: "🏛️",
    source: "Buddhist Heritage"
  }
];

/**
 * Get a random fun fact
 */
export function getRandomFunFact() {
  const randomIndex = Math.floor(Math.random() * NORTHEAST_FUN_FACTS.length);
  return NORTHEAST_FUN_FACTS[randomIndex];
}

/**
 * Get fun facts by category
 */
export function getFunFactsByCategory(category) {
  return NORTHEAST_FUN_FACTS.filter(fact => fact.category === category);
}

/**
 * Get all available categories
 */
export function getFunFactCategories() {
  return [...new Set(NORTHEAST_FUN_FACTS.map(fact => fact.category))];
}

/**
 * Get all fun facts
 */
export function getAllFunFacts() {
  return NORTHEAST_FUN_FACTS;
}

export default {
  getRandomFunFact,
  getFunFactsByCategory,
  getFunFactCategories,
  getAllFunFacts
};