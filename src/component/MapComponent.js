// import React, { useState, useEffect } from 'react';
// import { Map, TileLayer, Marker, Popup } from 'leaflet-react';

// const MapComponent = () => {
//   const [markers, setMarkers] = useState([
//     { lat: 37.7749, lng: -122.4194, title: 'Marker 1' },
//     { lat: 37.7859, lng: -122.4364, title: 'Marker 2' },
//     { lat: 37.7963, lng: -122.4574, title: 'Marker 3' },
//     { lat: 37.8067, lng: -122.4784, title: 'Marker 4' },
//     { lat: 37.8171, lng: -122.4994, title: 'Marker 5' }
//   ]);

//   return (
//     <Map center={[37.7749, -122.4194]} zoom={12}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a>"
//       />
//       {markers.map((marker, index) => (
//         <Marker key={index} position={[marker.lat, marker.lng]}>
//           <Popup>{marker.title}</Popup>
//         </Marker>
//       ))}
//     </Map>
//   );
// };

// export default MapComponent;