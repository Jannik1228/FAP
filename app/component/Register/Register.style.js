import { StyleSheet } from 'react-native';



const registerStyles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:"row",
        backgroundColor: 'rgb(101, 37, 111)'
    },
    appbar: {
        backgroundColor: '#fff',
        position:'absolute',
        left:0,
        top:0,
        height: "10%",
        width: "100%",
    },
    textInputInvalid: {
        borderColor: 'red',
    },
    error: {
        position: "absolute",
        bottom: 0,
        color: "rgb(176, 0, 32)",
        fontSize: 12
    },
    view: {
        width:"80%",
        padding: 15,
        backgroundColor: "#fff",
    },
    button: {
      margin: 15,
      marginLeft: 0,
      marginRight: 0,
    },
  });


  export default registerStyles;
  
