/**
 * Map Service for handling geographical data and operations
 * Provides utilities for Northeast India cultural mapping
 */

// Northeast India states geographical data with cultural information
export const NE_STATES_DATA = {
  assam: {
    id: 'assam',
    name: 'Assam',
    center: [26.2006, 92.9376],
    bounds: [[24.1, 89.7], [28.2, 96.0]],
    festivals: 3,
    tribes: 23,
    languages: ['Assamese', 'Bodo', 'Bengali'],
    color: '#10b981',
    culturalElements: ['bihu', 'rongali', 'bohag']
  },
  meghalaya: {
    id: 'meghalaya',
    name: 'Meghalaya',
    center: [25.4670, 91.3662],
    bounds: [[25.0, 89.5], [26.2, 92.8]],
    festivals: 2,
    tribes: 3,
    languages: ['Khasi', 'Garo', 'English'],
    color: '#3b82f6',
    culturalElements: ['wangala', 'shad_suk_mynsiem']
  },
  arunachal: {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    center: [28.2180, 94.7278],
    bounds: [[26.8, 91.5], [29.8, 97.8]],
    festivals: 1,
    tribes: 26,
    languages: ['Monpa', 'Hindi', 'English'],
    color: '#8b5cf6',
    culturalElements: ['losar', 'solung']
  },
  nagaland: {
    id: 'nagaland',
    name: 'Nagaland',
    center: [26.1584, 94.5624],
    bounds: [[25.2, 93.2], [27.0, 95.8]],
    festivals: 1,
    tribes: 16,
    languages: ['Ao', 'Angami', 'English'],
    color: '#f59e0b',
    culturalElements: ['hornbill', 'sekrenyi']
  },
  manipur: {
    id: 'manipur',
    name: 'Manipur',
    center: [24.6637, 93.9063],
    bounds: [[23.8, 93.0], [25.7, 94.8]],
    festivals: 2,
    tribes: 33,
    languages: ['Meitei', 'English'],
    color: '#ec4899',
    culturalElements: ['lai_haraoba', 'yaoshang']
  },
  mizoram: {
    id: 'mizoram',
    name: 'Mizoram',
    center: [23.1645, 92.9376],
    bounds: [[21.9, 92.2], [24.6, 93.4]],
    festivals: 1,
    tribes: 5,
    languages: ['Mizo', 'English'],
    color: '#06b6d4',
    culturalElements: ['chapchar_kut', 'mim_kut']
  },
  tripura: {
    id: 'tripura',
    name: 'Tripura',
    center: [23.9408, 91.9882],
    bounds: [[22.9, 91.0], [24.5, 92.5]],
    festivals: 0,
    tribes: 19,
    languages: ['Bengali', 'Kokborok'],
    color: '#84cc16',
    culturalElements: ['garia', 'ker']
  },
  sikkim: {
    id: 'sikkim',
    name: 'Sikkim',
    center: [27.5330, 88.5122],
    bounds: [[27.0, 88.0], [28.1, 88.9]],
    festivals: 2,
    tribes: 4,
    languages: ['Nepali', 'Bhutia', 'Lepcha', 'English'],
    color: '#f97316',
    culturalElements: ['losar', 'saga_dawa', 'dashain']
  }
};

// Cultural markers with precise coordinates
export const CULTURAL_MARKERS = [
  {
    id: 'bihu_guwahati',
    name: 'Bihu Festival',
    type: 'festival',
    position: [26.1445, 91.7362],
    state: 'assam',
    description: 'The most important festival of Assam, celebrating the Assamese New Year',
    season: 'spring',
    communities: ['Assamese']
  },
  {
    id: 'hornbill_kohima',
    name: 'Hornbill Festival',
    type: 'festival',
    position: [25.6751, 94.1086],
    state: 'nagaland',
    description: 'Festival of Festivals showcasing Naga culture and traditions',
    season: 'winter',
    communities: ['Naga Tribes']
  },
  {
    id: 'wangala_tura',
    name: 'Wangala Festival',
    type: 'festival',
    position: [25.5138, 90.2022],
    state: 'meghalaya',
    description: 'Harvest festival of the Garo people',
    season: 'autumn',
    communities: ['Garo']
  },
  {
    id: 'lai_haraoba_imphal',
    name: 'Lai Haraoba',
    type: 'ritual',
    position: [24.8170, 93.9368],
    state: 'manipur',
    description: 'Traditional Manipuri ritual celebrating local deities',
    season: 'spring',
    communities: ['Meitei']
  },
  {
    id: 'chapchar_kut_aizawl',
    name: 'Chapchar Kut',
    type: 'festival',
    position: [23.7271, 92.7176],
    state: 'mizoram',
    description: 'Spring festival of the Mizo people',
    season: 'spring',
    communities: ['Mizo']
  },
  {
    id: 'losar_tawang',
    name: 'Losar Festival',
    type: 'festival',
    position: [27.5860, 91.8590],
    state: 'arunachal',
    description: 'Tibetan New Year celebrated by Monpa community',
    season: 'winter',
    communities: ['Monpa']
  },
  {
    id: 'garia_agartala',
    name: 'Garia Puja',
    type: 'ritual',
    position: [23.8315, 91.2868],
    state: 'tripura',
    description: 'Traditional worship of Garia deity for good harvest',
    season: 'spring',
    communities: ['Tripuri']
  },
  {
    id: 'losar_gangtok',
    name: 'Losar Festival',
    type: 'festival',
    position: [27.3389, 88.6065],
    state: 'sikkim',
    description: 'Tibetan New Year celebrated by Bhutia and Sherpa communities',
    season: 'winter',
    communities: ['Bhutia', 'Sherpa']
  },
  {
    id: 'saga_dawa_sikkim',
    name: 'Saga Dawa',
    type: 'festival',
    position: [27.3389, 88.6065],
    state: 'sikkim',
    description: 'Sacred Buddhist festival celebrating Buddha\'s enlightenment',
    season: 'summer',
    communities: ['Buddhist', 'Bhutia']
  }
];

// GeoJSON data for Northeast India states
export const NE_STATES_GEOJSON = {
  type: "FeatureCollection",
  features: Object.values(NE_STATES_DATA).map(state => ({
    type: "Feature",
    properties: {
      ...state,
      // Add cultural statistics
      totalCulturalSites: CULTURAL_MARKERS.filter(m => m.state === state.id).length
    },
    geometry: {
      type: "Polygon",
      coordinates: [generateStatePolygon(state.bounds)]
    }
  }))
};

/**
 * Generate a simplified polygon from bounds
 * In a real application, you would use actual GeoJSON boundary data
 */
function generateStatePolygon(bounds) {
  const [[minLat, minLng], [maxLat, maxLng]] = bounds;
  return [
    [minLng, minLat],
    [maxLng, minLat],
    [maxLng, maxLat],
    [minLng, maxLat],
    [minLng, minLat]
  ];
}

/**
 * Get all states data
 */
export function getAllStates() {
  return Object.values(NE_STATES_DATA);
}

/**
 * Get state by ID
 */
export function getStateById(stateId) {
  return NE_STATES_DATA[stateId] || null;
}

/**
 * Get cultural markers for a specific state
 */
export function getCulturalMarkersByState(stateId) {
  return CULTURAL_MARKERS.filter(marker => marker.state === stateId);
}

/**
 * Get cultural markers by type
 */
export function getCulturalMarkersByType(type) {
  return CULTURAL_MARKERS.filter(marker => marker.type === type);
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Find nearest cultural markers to a given coordinate
 */
export function findNearestMarkers(lat, lng, limit = 5) {
  return CULTURAL_MARKERS
    .map(marker => ({
      ...marker,
      distance: calculateDistance(lat, lng, marker.position[0], marker.position[1])
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

/**
 * Get bounds for all Northeast India states
 */
export function getNortheastBounds() {
  const allBounds = Object.values(NE_STATES_DATA).map(state => state.bounds);
  const minLat = Math.min(...allBounds.map(b => b[0][0]));
  const minLng = Math.min(...allBounds.map(b => b[0][1]));
  const maxLat = Math.max(...allBounds.map(b => b[1][0]));
  const maxLng = Math.max(...allBounds.map(b => b[1][1]));
  
  return [[minLat, minLng], [maxLat, maxLng]];
}

/**
 * Search cultural markers by name or description
 */
export function searchCulturalMarkers(query) {
  const lowercaseQuery = query.toLowerCase();
  return CULTURAL_MARKERS.filter(marker => 
    marker.name.toLowerCase().includes(lowercaseQuery) ||
    marker.description.toLowerCase().includes(lowercaseQuery) ||
    marker.communities.some(community => 
      community.toLowerCase().includes(lowercaseQuery)
    )
  );
}

/**
 * Get cultural statistics for all states
 */
export function getCulturalStatistics() {
  const stats = {
    totalStates: Object.keys(NE_STATES_DATA).length,
    totalMarkers: CULTURAL_MARKERS.length,
    totalTribes: Object.values(NE_STATES_DATA).reduce((sum, state) => sum + state.tribes, 0),
    totalLanguages: [...new Set(Object.values(NE_STATES_DATA).flatMap(state => state.languages))].length,
    festivalsByState: {},
    markersByType: {}
  };

  // Calculate festivals by state
  Object.values(NE_STATES_DATA).forEach(state => {
    stats.festivalsByState[state.name] = state.festivals;
  });

  // Calculate markers by type
  CULTURAL_MARKERS.forEach(marker => {
    stats.markersByType[marker.type] = (stats.markersByType[marker.type] || 0) + 1;
  });

  return stats;
}

/**
 * Error handling for map operations
 */
export class MapServiceError extends Error {
  constructor(message, code = 'MAP_ERROR') {
    super(message);
    this.name = 'MapServiceError';
    this.code = code;
  }
}

/**
 * Validate coordinates
 */
export function validateCoordinates(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new MapServiceError('Coordinates must be numbers', 'INVALID_COORDINATES');
  }
  
  if (lat < -90 || lat > 90) {
    throw new MapServiceError('Latitude must be between -90 and 90', 'INVALID_LATITUDE');
  }
  
  if (lng < -180 || lng > 180) {
    throw new MapServiceError('Longitude must be between -180 and 180', 'INVALID_LONGITUDE');
  }
  
  return true;
}

/**
 * Check if coordinates are within Northeast India bounds
 */
export function isWithinNortheastBounds(lat, lng) {
  validateCoordinates(lat, lng);
  const bounds = getNortheastBounds();
  return lat >= bounds[0][0] && lat <= bounds[1][0] && 
         lng >= bounds[0][1] && lng <= bounds[1][1];
}

export default {
  NE_STATES_DATA,
  CULTURAL_MARKERS,
  NE_STATES_GEOJSON,
  getAllStates,
  getStateById,
  getCulturalMarkersByState,
  getCulturalMarkersByType,
  calculateDistance,
  findNearestMarkers,
  getNortheastBounds,
  searchCulturalMarkers,
  getCulturalStatistics,
  validateCoordinates,
  isWithinNortheastBounds,
  MapServiceError
};