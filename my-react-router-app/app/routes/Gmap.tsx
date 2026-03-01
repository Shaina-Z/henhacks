import React from 'react';
import {createRoot} from 'react-dom/client';
import {AdvancedMarker, APIProvider, Map, Pin} from '@vis.gl/react-google-maps';

const flower_path = [
  "/app/welcome/Green_Carnation.webp",
  "/app/welcome/Lavender.webp",
  "/app/welcome/Rose.webp",
  "/app/welcome/Pansies.webp",
  "/app/welcome/Violet.webp",
  "/app/welcome/Tie-dye_Rose.webp"
]


type Poi ={ key: string, location: google.maps.LatLngLiteral, flower: string }

// For demo purposes, in a full-scale deployment, these would be stored in a database
const locations: Poi[] = [
  {key: "carnation", location: {lat: 39.680006, lng: -75.752304}, flower: flower_path[0]},
  {key: "lavender", location: {lat: 39.680138, lng: -75.752388}, flower: flower_path[1]},
  {key: "rose", location: {lat: 39.680159, lng: -75.752194}, flower: flower_path[2]}
]

const containerStyle = {
    width: '70%',
    height: '400px', // Set a specific height

  };

export const GMap = () => (
  <APIProvider apiKey={"API_KEY"}>
    <div style={containerStyle}>
    <Map
      defaultCenter={{lat: 39.68152, lng: -75.74065}}
      defaultZoom={12}
      gestureHandling='greedy'
      disableDefaultUI
      mapId='DEMO_MAP_ID'
    >
      <PoiMarkers pois={locations}/>
    </Map>
    </div>
  </APIProvider>
);



const PoiMarkers = (props: {pois: Poi[]}) => {
  return (
    <>
      {props.pois.map( (poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}>
        <img src={poi.flower} width={32} height={32}/>
        </AdvancedMarker>
      ))}
    </>
  );
}
