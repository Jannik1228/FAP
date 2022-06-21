
import React from 'react';
import { Marker } from 'react-native-maps';


 const MarkerScreen =(props) => {
  
  return (
          <Marker title={props.benutzername}
          coordinate={{latitude: props.latitude, longitude: props.longitude }}></Marker>
  );
}

export default MarkerScreen;

