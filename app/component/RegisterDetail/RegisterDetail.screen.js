
import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import registerDetailStyles from './RegisterDetail.style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { addUser, getLocation, getOrt, getSessionID} from '../../request/API';



 function RegisterDetailScreen({ route, navigation: { navigate }}) {
 
  const [user, setUser] = useState({
    email:route.params.user.email,
    benutzername: route.params.user.benutzername,
    password:route.params.user.password,
    name: "",
    nachname: "",
    plz: "",
    ort: "",
    strasse: "",
    hausnummer: "",
    land: "",
        latitude: 37.78825,
        longitude: -122.4324,
});
    const [mapInitData, setMapInitData] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    })


async function handleChange(name, value){
    if(name =="plz"){
        if(value.length ==5){
        let result = await getOrt(value);
        result = result.places[0]["place name"]
        handleChange("ort", result)
        }
    }
    setUser(prevUser => {
        return {
          ...prevUser,
          [name]: value
        };
    });
    if(user.hausnummer.length >0 && user.land.length >0 && user.ort.length >0 && user.plz.length >0 && user.hausnummer.length >0 ){
        let location = await getLocation(user.land, user.plz, user.ort, user.strasse, user.hausnummer);
        let long = location.data[0].longitude;
        let lat = location.data[0].latitude;
        setMapInitData(prev => {
            return {
              ...prev,
              longitude: long,
              latitude:lat, 
            };
        });
        setUser(prev => {
            return {
              ...prev,
              longitude: long,
              latitude:lat, 
            };
        });
    }
}

const goBack = () => navigate("Register");
const goHome = async () => {
    let adresse = user.strasse + " " + user.hausnummer;
    addUser( user.email, user.benutzername,user.password,user.name, user.nachname, user.plz, user.ort, adresse,user.land); 
    const sessionID = {
        id: await getSessionID(user.benutzername, user.password)
    }
    navigate('Home', {sessionID});
}


  return (
    <SafeAreaView style={registerDetailStyles.content}>
            <Appbar  style={registerDetailStyles.appbar}>
                <Appbar.BackAction onPress={goBack}/>
                <Appbar.Content title="Register Detail"/>
            </Appbar>
            <ScrollView style={registerDetailStyles.view}>
                    <TextInput
                label="Name"
                onChangeText={value => handleChange("name", value)}
                value={user.name}
                ></TextInput>
            <TextInput
                label="Nachname"
                onChangeText={value => handleChange("nachname", value)}
                value ={user.nachname}
            ></TextInput>
             <TextInput
                label="Land"
                onChangeText={value => handleChange("land", value)}
                value ={user.land}
            ></TextInput>
                    <TextInput
                label="PLZ"
                onChangeText={value => handleChange("plz", value)}
                value={user.plz}
                ></TextInput>
                  <TextInput
                label="Ort"
                disabled={true}
                value={user.ort}
                ></TextInput>
                
            <TextInput
                label="Straße"
                onChangeText={value => handleChange("strasse", value)}
                value ={user.strasse}
            ></TextInput>
                    <TextInput
                label="Hausnummer"
                onChangeText={value => handleChange("hausnummer", value)}
                value={user.hausnummer}
                ></TextInput>
           
            <Button style={registerDetailStyles.cardButton} mode='contained' onPress={goHome}>Register</Button>
            </ScrollView>
         
<View style={registerDetailStyles.container}>
<MapView
  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  style={registerDetailStyles.map}
  region={{
    latitude: user.latitude,
    longitude: user.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }}
><Marker description={user.name}
coordinate={{latitude: user.latitude, longitude: user.longitude }}>
</Marker>
</MapView>

</View>
   </SafeAreaView>
  
  );
}

export default RegisterDetailScreen;


