import React, { useState, useEffect } from 'react';
import './MapSelector.css';

const MapSelector = ({ location, onLocationSelect, selectedCoords }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(location || '');
  const [coords, setCoords] = useState(
    (selectedCoords && selectedCoords.lat && selectedCoords.lng)
      ? selectedCoords
      : { lat: 20.5937, lng: 78.9629 } // Default: Center of India
  );
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (location && location !== searchQuery) {
      setSearchQuery(location);
    }
  }, [location, searchQuery]);

  useEffect(() => {
    // Update mapKey to force iframe reload when coordinates change
    setMapKey(prev => prev + 1);
  }, [coords]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert click position to approximate coordinates
    // This is a simplified representation
    const lat = 35 - (y / rect.height) * 50; // Rough latitude range
    const lng = -20 + (x / rect.width) * 140; // Rough longitude range

    const newCoords = {
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4))
    };

    setCoords(newCoords);
    if (onLocationSelect) {
      onLocationSelect(newCoords);
    }
  };

  const handleSearchLocation = () => {
    // In a real implementation, this would use a geocoding service
    if (searchQuery.trim()) {
      // Simulate geocoding with approximate coordinates
      const cityCoordinates = {
        'mumbai': { lat: 19.0760, lng: 72.8777 },
        'delhi': { lat: 28.7041, lng: 77.1025 },
        'bangalore': { lat: 12.9716, lng: 77.5946 },
        'bengaluru': { lat: 12.9716, lng: 77.5946 },
        'chennai': { lat: 13.0827, lng: 80.2707 },
        'kolkata': { lat: 22.5726, lng: 88.3639 },
        'hyderabad': { lat: 17.3850, lng: 78.4867 },
        'pune': { lat: 18.5204, lng: 73.8567 },
        'ahmedabad': { lat: 23.0225, lng: 72.5714 },
        'jaipur': { lat: 26.9124, lng: 75.7873 },
        'lucknow': { lat: 26.8467, lng: 80.9462 },
        'kochi': { lat: 9.9312, lng: 76.2673 },
        'goa': { lat: 15.2993, lng: 74.1240 },
      };

      const searchLower = searchQuery.toLowerCase();
      const foundCity = Object.keys(cityCoordinates).find(city =>
        searchLower.includes(city)
      );

      if (foundCity) {
        const newCoords = cityCoordinates[foundCity];
        setCoords(newCoords);
        if (onLocationSelect) {
          onLocationSelect(newCoords);
        }
      } else {
        alert('City not found. Try: Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, etc.');
      }
    }
  };

  const getMapUrl = () => {
    // Using OpenStreetMap embed
    return `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.5},${coords.lat - 0.5},${coords.lng + 0.5},${coords.lat + 0.5}&layer=mapnik&marker=${coords.lat},${coords.lng}`;
  };

  return (
    <div className="map-selector">
      <div className="map-card" onClick={handleOpenModal}>
        {coords && coords.lat && coords.lng ? (
          <div className="map-preview">
            <iframe
              key={mapKey}
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={getMapUrl()}
              style={{ border: 0, pointerEvents: 'none' }}
            />
            <div className="map-overlay">
              <div className="map-overlay-content">
                <div className="map-pin-icon">📍</div>
                <div className="map-overlay-text">Click to change location</div>
                <div className="map-coords">
                  {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}°
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <div className="map-text">Click to select location on map</div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="map-modal-overlay" onClick={handleCloseModal}>
          <div className="map-modal" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3>Select Location</h3>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>

            <div className="map-modal-search">
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
              />
              <button onClick={handleSearchLocation}>Search</button>
            </div>

            <div className="map-modal-body">
              <div className="interactive-map-wrapper">
                <div className="map-display">
                  <iframe
                    key={`modal-${mapKey}`}
                    title="Interactive Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={getMapUrl()}
                    style={{ border: 0, pointerEvents: 'none' }}
                  />
                </div>
                <div className="map-click-overlay" onClick={handleMapClick}>
                  <div className="map-crosshair">+</div>
                </div>
              </div>

              <div className="map-info">
                <p className="map-instruction">
                  Click on the map above to select a location or search for a city in the search box.
                </p>
                <div className="selected-coords">
                  <strong>Selected Coordinates:</strong>
                  <span>{coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E</span>
                </div>
              </div>
            </div>

            <div className="map-modal-footer">
              <button className="btn-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={() => {
                if (onLocationSelect) {
                  onLocationSelect(coords);
                }
                handleCloseModal();
              }}>
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
