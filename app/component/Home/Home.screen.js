//import Libaries, Constants and Functions
import React, { useState , useEffect} from 'react';
import { ScrollView, SafeAreaView, View, Alert } from 'react-native';
import {Appbar, FAB, TextInput, Card, DataTable } from 'react-native-paper';
import homeStyles from './Home.style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getUsersLocation, logout, setUserLocation as putUserLocation} from '../../request/API';
import CellDataTable from './CellDataTable.screen';
import MarkerScreen from './Marker.screen';
import * as Location from 'expo-location';
import {appStyles} from '../../../App.style';

 const HomeScreen =({ route, navigation: { navigate }}) => {

  //Condition for sessionid and login
  if(route.params.loggedInUser.sessionid != undefined && route.params.loggedInUser.login ){
  
    //UseState Statements
    const [userLocation, setUserLocation] = useState(false);
    const [usersArray, setUsersArray] = useState([]);
    const [benutzerkennung, setBenutzerkennung] = useState("");
    const [mapLocation, setMapLocation] = useState({
      region: {  
        latitudeDelta: 5,
        longitudeDelta: 0.0121,
        latitude: 50.9,
        longitude: 10.1
      }
    });
    
    //useEffect with set-Statements
    useEffect(() => {
      (async () => {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude);
        const data ={
          loginName: route.params.loggedInUser.login,
          sitzung: route.params.loggedInUser.sessionid,
          standort: {
          breitengrad: location.coords.latitude,
          laengengrad: location.coords.longitude
        }};
        console.log("putUser");
        console.log(await putUserLocation(data));
        setMapLocation({
          region: {  
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }});
        setUserLocation({
          loginName: route.params.loggedInUser.login,
          sitzung: route.params.loggedInUser.sessionid,
          standort: {
          breitengrad: location.coords.latitude,
          laengengrad: location.coords.longitude
        }})
      })();
    }, []);

    //Navigation Statement
    async function goBack(){
      const data = {
          sitzung: userLocation.sitzung,
          loginName: userLocation.loginName,
      }
      await logout(data) ?  navigate("Login") : Alert.alert("Fehler beim Abmelden") 
    }

    //other Functions
    async function getLocations () {
      let result= await getUsersLocation(route.params.loggedInUser.sessionid, route.params.loggedInUser.login, benutzerkennung);
      setUsersArray(prevUser => [
          ...prevUser,
          {benutzername: benutzerkennung,
            latitude: result.breitengrad,
            longitude: result.laengengrad}
        ]
      );
      setMapLocation({
        region: {  
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
          latitude: result.breitengrad,
          longitude: result.laengengrad
        }
      })
      setBenutzerkennung("");
    }

    function removeUser(benutzername){
      setUsersArray(usersArray.filter(item => item.benutzername !== benutzername))
    }

  //Render Statement
  return (
    <SafeAreaView style={appStyles.content}>
      <Appbar style={homeStyles.appbar}>
      
          <Appbar.Content title="Friends an Places"/>
          <Appbar.Action icon="logout" mode="contained" onPress={goBack} />
        </Appbar>
      <View style={homeStyles.view}>
      <Card>
          <Card.Title title="Benutzerverwaltung"></Card.Title>
          <Card.Content>
        <TextInput
          label="Benutzerkennung"
          style={homeStyles.textInput}
          onChangeText={newBenutzerkennung => setBenutzerkennung(newBenutzerkennung)}
          value={benutzerkennung}
        ></TextInput>
        <FAB icon="plus" style={homeStyles.fab} mode='contained' onPress={getLocations}></FAB>
     
      <ScrollView style={homeStyles.scrollView}>
          <DataTable>
          <DataTable.Header>
            <DataTable.Title>Benutzername</DataTable.Title>
            <DataTable.Title>Entfernen</DataTable.Title>
          </DataTable.Header>
          {usersArray.map(item => {
            return (<CellDataTable key={item.benutzername} removeUser={removeUser} benutzername={item.benutzername}/>);
          })}
          </DataTable>
        </ScrollView>
         </Card.Content>
      </Card>
   </View>
   <View style={homeStyles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={homeStyles.map}
       region={mapLocation.region}
     >
       {usersArray.map(item => {
            console.log(item);
            return (<MarkerScreen key={item.benutzername} benutzername={item.benutzername} latitude={item.latitude} longitude={item.longitude}/>);
          })}
        {userLocation && <MarkerScreen key={userLocation.loginName} benutzername={userLocation.loginName} latitude={userLocation.standort.breitengrad} longitude={userLocation.standort.laengengrad}/>}
     </MapView>
   </View>
   </SafeAreaView>
  
  );
}else{
  navigate("Login");
}
}

//export Component
export default HomeScreen;