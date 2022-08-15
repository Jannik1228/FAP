//import Libaries, Constants and Functions 
import React, { useState } from 'react';
import {  Alert, SafeAreaView, View } from 'react-native';
import {Button, Card, TextInput, Text} from 'react-native-paper';
import {appStyles} from '../../../App.style';
import { getSessionID } from '../../request/API';
import loginStyles from './Login.style';


const LoginScreen =({ navigation: { navigate }}) => {

  //UseState Statements
  const [benutzernameIsError, setBenutzernameIsError] = useState(false);
  const [user, setUser] = useState({
    benutzername:"",
    password:"",
  });

  //handleChange with set-Statements
  function handleChange(name, value){
    if(name=="benutzername"){
        if(value.length <5 || value.length >19){
          setBenutzernameIsError(true);
        }else {
        setBenutzernameIsError(false);
      }
    }
    setUser(prevUser => {
      return {
        ...prevUser,
        [name]: value
      };
  });
  }

  //Navigation Statement
  const goRegister = () => navigate('Register');
  const goHome = async () => {
    if(user.benutzername != "" && !benutzernameIsError &&  user.password){
      let sesseionid = await getSessionID(user.benutzername, user.password);
      if(sesseionid){
        const loggedInUser = {
          sessionid: sesseionid,
          login: user.benutzername,
        }
        navigate('Home', {loggedInUser});
      }else{
        Alert.alert("Fehler: Anmeldung fehlgeschlagen. Benutzername und Passwort überprüfen.")
      }
    
    }else{
      Alert.alert("Fehler: Alle Felder müssen Werte enthalten.");
    }
  }

  //other functions
  function renderError(errmsg) {
    return (
    <View>
        <Text style={loginStyles.error}>{errmsg}</Text>
    </View>
    );
  }

  //Render Statement
  return (
    <SafeAreaView style={appStyles.content}>
      <View style={loginStyles.view}>
        <Card>
          <Card.Title title="Friends and Places"></Card.Title>
          <Card.Content>
            <TextInput
              label="Benutzername"
              onChangeText={value => handleChange("benutzername", value)}
              value={user.benutzername}
              error={benutzernameIsError}
                ></TextInput>
         {benutzernameIsError && renderError("Benutzername überprüfen.")}
            <TextInput
              label="Password"
              secureTextEntry={true}
              onChangeText={value => handleChange("password", value)}
              value ={user.password}
            ></TextInput>
            <Button style={loginStyles.cardButton} mode='contained' onPress={goHome}>Login</Button>
            <Button style={loginStyles.cardButton} onPress={goRegister}>Register</Button>
          </Card.Content>
        </Card>
      </View>
   </SafeAreaView>
  
  );
}
//export Component
export default LoginScreen;

