
import React, { useState } from 'react';
import {  SafeAreaView, View } from 'react-native';
import {Button, Card, TextInput, Text} from 'react-native-paper';
import { getSessionID } from '../../request/API';
import loginStyles from './Login.style';


 const LoginScreen =({ navigation: { navigate }}) => {
  const [user, setUser] = useState({
    benutzername:"",
    password:"",
  });

  
  const [benutzernameIsError, setBenutzernameIsError] = useState(false);

  const goRegister = () => navigate('Register');
    const goHome = async () => {
      const loggedInUser = {
        sessionid: await getSessionID(user.benutzername, user.password),
        login: user.benutzername,
      }
      navigate('Home', {loggedInUser});
    }

  function renderError(errmsg) {
    return (
    <View>
        <Text style={loginStyles.error}>{errmsg}</Text>
    </View>
    );
}

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
  return (
    <SafeAreaView style={loginStyles.content}>
      <View style={loginStyles.view}>
        <Card>
          <Card.Title title="Friends and Places"></Card.Title>
          <Card.Content>
            <TextInput
              label="Benutzername"
              keyboardType='benutzername-address'
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

export default LoginScreen;

