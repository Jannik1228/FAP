import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./component/Login/Login.screen";
import RegisterScreen from "./component/Register/Register.screen";
import RegisterDetailScreen from "./component/RegisterDetail/RegisterDetail.screen";
import HomeScreen from "./component/Home/Home.screen";


const { Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
    return(
    <NavigationContainer>
            <Navigator screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Login">
                <Screen name="Login" component={LoginScreen}></Screen>
                <Screen name="Register" component={RegisterScreen}></Screen>
                <Screen name="RegisterDetail" component={RegisterDetailScreen}></Screen>
                <Screen name="Home" component={HomeScreen}></Screen>
            </Navigator>
    </NavigationContainer>
    );
}

export default AppNavigator;