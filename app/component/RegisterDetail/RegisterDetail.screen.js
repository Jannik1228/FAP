//import Libaries, Constants and Functions
import React, { useState } from 'react';
import {  Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {Appbar, Button, TextInput} from 'react-native-paper';
import registerDetailStyles from './RegisterDetail.style';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { addUser, getLocation, getOrt, getSessionID} from '../../request/API';
import {appStyles} from '../../../App.style';


 function RegisterDetailScreen({ route, navigation: { navigate }}) {

    //UseState Statements
    const [user, setUser] = useState({
        email:route.params.user.email,
        benutzername: route.params.user.benutzername,
        password:route.params.user.password,
        vorname: "",
        nachname: "",
        plz: "",
        ort: "",
        strasse: "",
        hausnummer: "",
        land: "",
        latitude: 50.9,
        longitude: 10.1
    });

  //handleChange with set-Statements
    async function handleChange(name, value){
        if(name =="plz"){
            if(value.length ==5){
            let result = await getOrt(value);
            result = result.postalCodes[0]["placeName"];
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
            setUser(prev => {
                return {
                ...prev,
                longitude: long,
                latitude:lat, 
                };
            });
        }
    }

    //Navigation Statement
    const goBack = () => navigate("Register");
    const goHome = async () => {
        if(user.hausnummer != "" && user.land != "" && user.nachname !="" && user.vorname != "" && user.plz != "" ){
            let adresse = user.strasse + " " + user.hausnummer;
            if(await addUser( user.email, user.benutzername,user.password,user.vorname, user.nachname, user.plz, user.ort, adresse,user.land)){
                const loggedInUser = {
                    sessionid: await getSessionID(user.benutzername, user.password),
                    login: user.benutzername,
                }
                navigate('Home', {loggedInUser});
            }else{
                Alert.alert("Fehler bei der Anmeldung");
            }
        }else{
            Alert.alert("Fehler: Alle Felder müssen Werte enthalten.");
        }
    }

    //other functions


    //Render Statement
    return (
        <SafeAreaView style={appStyles.content}>
                <Appbar  style={registerDetailStyles.appbar}>
                    <Appbar.BackAction onPress={goBack}/>
                    <Appbar.Content title="Register Detail"/>
                </Appbar>
                <ScrollView style={registerDetailStyles.view}>
                        <TextInput
                    label="Vorname"
                    onChangeText={value => handleChange("vorname", value)}
                    value={user.vorname}
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
            provider={PROVIDER_GOOGLE}
            style={registerDetailStyles.map}
            region={{
                latitude: user.latitude,
                longitude: user.longitude,
                latitudeDelta: 5,
                longitudeDelta: 0.0121,
            }}
            >
                {user.hausnummer != "" && <Marker description={user.vorname} coordinate={{latitude: user.latitude, longitude: user.longitude }}></Marker>}
            </MapView>
        </View>
    </SafeAreaView>

    );
}

//export Component
export default RegisterDetailScreen;


