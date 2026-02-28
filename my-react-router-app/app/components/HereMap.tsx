// src/components/HereMap.jsx
import { useEffect, useRef } from 'react';

// Import the HERE Maps API for JavaScript libraries
import H from '@here/maps-api-for-javascript';
// Import the CSS style for the default UI components
import '@here/maps-api-for-javascript/bin/mapsjs-ui.css';

// Stores the DOM node (mapRef) that contains the map 
const HereMap = () => {
const mapRef = useRef(null);

// Initializes the HERE map once after mount
useEffect(() => {
   const platform = new H.service.Platform({
      apikey: 'YOUR_HERE_API_KEY',
   });

   // Obtain the default map types from the platform object:
   const defaultLayers = platform.createDefaultLayers();

   // Instantiate (and display) a map:
   const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 52.5200, lng: 13.4050 },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1,
   });

   // Enable dynamic resizing of the map, based on the current size of the enclosing container
   window.addEventListener('resize', () => map.getViewPort().resize());

   // MapEvents enables the event system.
   // The behavior variable implements default interactions for pan/zoom 
   // Also on mobile touch environments.
   const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(map)
   );

   // Create the default UI:
   const ui = H.ui.UI.createDefault(map, defaultLayers);

   return () => map.dispose();
}, []);

// Return the map component with the map size set to 
// the full height and width of the browser window
return (
   <div
      ref={mapRef}
         style={
         {
            width: '100vw',
            height: '100vh'
         }
      }
   />
  );
};

export default HereMap;
