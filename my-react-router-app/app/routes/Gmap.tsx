import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map} from '@vis.gl/react-google-maps';


export const GMap = () => (
  <APIProvider apiKey={"API_KEY"}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling='greedy'
      disableDefaultUI
    />
  </APIProvider>
);
