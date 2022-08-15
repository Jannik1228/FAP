import { DefaultTheme } from "react-native-paper";
import { StyleSheet } from 'react-native';

 const theme ={
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary: 'rgb(101, 37, 111)',
        background: 'transparent'
    }
}

const appStyles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        backgroundColor: 'rgb(101, 37, 111)'
    },
})

export {theme, appStyles};