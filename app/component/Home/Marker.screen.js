//import Libaries, Constants and Functions
import React from 'react';
import { Marker } from 'react-native-maps';


 const MarkerScreen =(props) => {
  //Render Statement
  return (
          <Marker title={props.benutzername}
          coordinate={{latitude: props.latitude, longitude: props.longitude }}></Marker>
  );
}

//export Component
export default MarkerScreen;

