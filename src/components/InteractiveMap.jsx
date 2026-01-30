import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Users, Calendar, Navigation } from 'lucide-react';
import { getAllStates } from '../services/mapService';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Clean pointer icon for state selection with prominent map pin
const createStatePointer = (state) => {
  // Get state-specific color
  const pinColor = state.color || '#ef4444';
  
  return L.divIcon({
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <!-- Map Pin Background -->
        <div style="
          width: 32px; 
          height: 32px; 
          background-color: ${pinColor}; 
          border-radius: 50% 50% 50% 0; 
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          position: relative;
          transition: all 0.2s ease;
        "></div>
        <!-- Inner Circle -->
        <div style="
          position: absolute;
          width: 16px; 
          height: 16px; 
          background-color: white; 
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          z-index: 2;
        "></div>
      </div>
    `,
    className: 'state-pointer-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Anchor at the bottom point of the pin
    popupAnchor: [0, -32] // Popup appears above the pin
  });
};

// Component to handle map bounds and center
function MapController({ selectedState }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedState) {
      // Use state bounds directly
      const [[minLat, minLng], [maxLat, maxLng]] = selectedState.bounds;
      const bounds = [[minLat, minLng], [maxLat, maxLng]];
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      // Show all of Northeast India - use a general bounds
      const bounds = [[21.5, 88.0], [29.5, 97.8]]; // Covers all Northeast states
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [selectedState, map]);

  return null;
}

export default function InteractiveMap({ onStateSelect, selectedState }) {
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef();

  useEffect(() => {
    // Simulate loading time for map initialization
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Navigation className="text-primary-600" size={20} />
          <div>
            <h3 className="font-display font-semibold text-gray-800">Interactive Map</h3>
            <p className="text-sm text-gray-600">Click on states to explore cultural heritage</p>
          </div>
        </div>
        <div className="h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <MapPin className="text-white" size={32} />
            </div>
            <div className="text-lg font-display font-semibold text-gray-700 mb-2">
              Loading Interactive Map
            </div>
            <div className="text-sm text-gray-500">
              Preparing Northeast India geographical data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="text-primary-600" size={20} />
        <div>
          <h3 className="font-display font-semibold text-gray-800">Interactive Map</h3>
          <p className="text-sm text-gray-600">Click on states to explore cultural heritage</p>
        </div>
      </div>

      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          ref={mapRef}
          center={[25.5, 93.5]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Clean state pointers for selection */}
          {getAllStates().map((state) => (
            <Marker
              key={state.id}
              position={state.center}
              icon={createStatePointer(state)}
              eventHandlers={{
                click: () => onStateSelect(state)
              }}
            >
              <Popup>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800">{state.name}</h4>
                  <p className="text-sm text-gray-600">{state.festivals} Festivals • {state.tribes} Tribes</p>
                  <p className="text-xs text-gray-500 mt-1">Click to explore cultural heritage</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapController selectedState={selectedState} />
        </MapContainer>

        {/* Custom zoom controls */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <button
            onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() + 1)}
            className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-bold text-gray-700">+</span>
          </button>
          <button
            onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() - 1)}
            className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-bold text-gray-700">−</span>
          </button>
        </div>

        {/* Selected state info overlay */}
        {selectedState && (
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedState.color }}
                />
                <div className="flex-1">
                  <h4 className="font-display font-bold text-gray-800">{selectedState.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{selectedState.festivals} Festivals</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{selectedState.tribes} Tribes</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onStateSelect(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Panel */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { label: "States", value: "8", color: "from-emerald-500 to-teal-500", icon: "🗺️" },
          { label: "Tribes", value: "125+", color: "from-blue-500 to-indigo-500", icon: "👥" },
          { label: "Languages", value: "200+", color: "from-purple-500 to-pink-500", icon: "🗣️" }
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl text-white shadow-lg hover:scale-105 transition-transform duration-200`}>
            <div className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}