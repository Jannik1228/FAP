
import React, { useState } from 'react';
import {  SafeAreaView, View, Alert} from 'react-native';
import {Appbar, Button, TextInput, Text} from 'react-native-paper';
import registerStyles from './Register.style';
import { checkLoginName } from '../../request/API';

 function RegisterScreen({ navigation: { navigate }}) {
  const [user, setUser] = useState({
    email:"",
    benutzername: "",
    password:"",
    password2: "",
});
    const [loginNameIsError, setLoginNameIsError] = useState(false);
    const [passwordIsError, setPasswordIsError] = useState(false);
    const [loginNameShortIsError, setLoginNameShortIsError] = useState(false);
    const [loginNameLongIsError, setLoginNameLongIsError] = useState(false);
    const [emailIsError, setEmailIsError] = useState(false);

    async function handleChange(name, value){
        if(name=="email"){
            var regex = /@/;
            regex.test(value) ? setEmailIsError(false): setEmailIsError(true)
        }
        if(name=="benutzername"){
            let res  = await checkLoginName(value);
            setLoginNameIsError(res);
            if(value.length <=4 || value.length >19){
                if(value.length >19){
                setLoginNameLongIsError(true);
                setLoginNameShortIsError(false);
                }else{
                setLoginNameShortIsError(true);
                setLoginNameLongIsError(false);
                }
            }else{
                setLoginNameShortIsError(false);
                setLoginNameLongIsError(false);
            }
        }
        setUser(prevUser => {
            return {
              ...prevUser,
              [name]: value
            };
        });
        if(name==="password2"){
            if(user.password === value){
                setPasswordIsError(false);
            }else{
                setPasswordIsError(true);
            }
        }
        if(name==="password"){
            if(user.password2 === value){
                setPasswordIsError(false);
            }else{
                setPasswordIsError(true);
            }
        }
    }
    function renderError(errmsg) {
        return (
        <View>
            <Text style={registerStyles.error}>{errmsg}</Text>
        </View>
        );
    }
      
    const goBack = () => navigate("Login");
    const goRegisterDetail = () => {
        if(!passwordIsError && !emailIsError && !loginNameIsError && !loginNameLongIsError && !loginNameShortIsError){
            navigate("RegisterDetail", {user});
        }else{  
            Alert.alert("Fehler: Bitte alle Eingaben überprüfen.");
        }
    }

  return (
    <SafeAreaView style={registerStyles.content}>
            <Appbar style={registerStyles.appbar}>
                <Appbar.BackAction onPress={goBack}/>
                <Appbar.Content title="Register"/>
            </Appbar>
            <View style={registerStyles.view}>
            <TextInput
                label="Email"
                keyboardType='email-address'
                onChangeText={newEmail => handleChange("email", newEmail)}
                value={user.email}
                error={emailIsError}
                ></TextInput>
         {emailIsError && renderError("Bitte eine Email eingeben.")}
            
        <TextInput
        label="Benutzername"
        name="benutzername"
        onChangeText={newBenutzername => handleChange("benutzername", newBenutzername)}
        value ={user.benutzername}
        error = {loginNameIsError}
        >
        </TextInput>
        {loginNameIsError && !loginNameShortIsError && !loginNameLongIsError && renderError("Benutzername ist bereitsvergeben.")}
        {loginNameShortIsError && renderError("Benutzername zu kurz.")}
        {loginNameLongIsError && renderError("Benutzername zu lang.")}
            <TextInput
                label="Passwort"
                secureTextEntry={true}
                onChangeText={newPassword => handleChange("password", newPassword)}
                value ={user.password}
            ></TextInput>
            <TextInput
                label="Passwort wiederholen"
                name="password2"
                secureTextEntry={true}
                onChangeText ={newPassword2 => handleChange("password2", newPassword2)}
                value ={user.password2}
                error={passwordIsError}
            ></TextInput>
            {passwordIsError && renderError("Passwörter sind nicht identisch.")}
            <Button style={registerStyles.button} mode='contained' onPress={goRegisterDetail}>Continue</Button>
        </View>
   </SafeAreaView>
  
  );
}

export default RegisterScreen;

