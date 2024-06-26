import React, { useState, useEffect } from 'react';

const LocationTable = () => {
  const [locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });

      // Add markers for each location
      locations.forEach((location) => {
        const latLng = new window.google.maps.LatLng(location.latitude, location.longitude);
        map.data.add(new window.google.maps.Data.Feature({
          geometry: latLng,
        }));
      });
    }
  }, [locations, map]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSaveLocation = () => {
    const newLocation = { latitude, longitude };
    setLocations([...locations, newLocation]);
    setLatitude('');
    setLongitude('');
  };

  const handleMapLoad = (map) => {
    setMap(map);
  };

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      <button onClick={handleSaveLocation}>Save Location</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <table>
        <thead>
          <tr>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={index}>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
            </tr>
          ))}
          <tr>
            <td>{latitude}</td>
            <td>{longitude}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
