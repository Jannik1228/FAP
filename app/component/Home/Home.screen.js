
import React, { useState , componentDidMount, useEffect} from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import {Appbar, FAB, TextInput, Card, DataTable } from 'react-native-paper';
import homeStyles from './Home.style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { getUsersLocation, setUserLocation } from '../../request/API';
import CellDataTable from './CellDataTable.screen';
import MarkerScreen from './Marker.screen';
import * as Location from 'expo-location';

 const HomeScreen =({ route, navigation: { navigate }}) => {

  if(route.params.loggedInUser.sessionid){
    const [userlocation, setUserLocation] = useState(false);
    const [usersArray, setUsersArray] = useState([]);
    const [user, setUser] = useState({
      latitude: "",
        longitude: ""
    });
    const [benutzerkennung, setBenutzerkennung] = useState("");
   
    useEffect(() => {
      (async () => {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude);
        setUserLocation({
            loginName: route.params.loggedInUser.login,
            sitzung: route.params.loggedInUser.sessionid,
            standort: {
            breitengrad: location.coords.latitude,
            laengengrad: location.coords.longitude
        }});
        console.log(userlocation)

      })();
    }, []);


    async function getAllUsers (session, login, id) {
      let result= await getUsersLocation(session, login, id);
      setUser({
        latitude: result.breitengrad,
        longitude: result.laengengrad
      });
      setUsersArray(prevUser => [
          ...prevUser,
          {benutzername: benutzerkennung,
            latitude: result.breitengrad,
            longitude: result.laengengrad}
        ]
      );
      setBenutzerkennung("");
    }

   
  

  const goBack = () => navigate("Login");

  function addBenutzer (){
      getAllUsers(route.params.loggedInUser.sessionid, route.params.loggedInUser.login, benutzerkennung);
    }

  const removeBenutzer = () => console.log("removeBenutzer");

  
  return (
    <SafeAreaView style={homeStyles.content}>
      <Appbar style={homeStyles.appbar}>
          <Appbar.BackAction onPress={goBack}/>
          <Appbar.Content title="Friends an Places"/>
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
        <FAB icon="plus" style={homeStyles.fab} mode='contained' onPress={addBenutzer}>+</FAB>
     
      <ScrollView style={homeStyles.scrollView}>
          <DataTable>
          <DataTable.Header>
            <DataTable.Title>Benutzername</DataTable.Title>
            <DataTable.Title>Entfernen</DataTable.Title>
          </DataTable.Header>
          {usersArray.map(item => {
            console.log(item);
            return (<CellDataTable key={item.benutzername} benutzername={item.benutzername}/>);
          })}
          </DataTable>
        </ScrollView>
         </Card.Content>
      </Card>
   </View>
   <View style={homeStyles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={homeStyles.map}
       region={{
         latitude: user.latitude,
         longitude: user.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       {usersArray.map(item => {
            console.log(item);
            return (<MarkerScreen key={item.benutzername} benutzername={item.benutzername} latitude={item.latitude} longitude={item.longitude}/>);
          })}
        {userlocation && <MarkerScreen key={userlocation.loginName} benutzername={userlocation.loginName} latitude={userlocation.standort.breitengrad} longitude={userlocation.standort.laengengrad}/>}
     </MapView>
   </View>
   </SafeAreaView>
  
  );
}else{
  navigate("Login");
}
}

export default HomeScreen;

