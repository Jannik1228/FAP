import { StyleSheet } from 'react-native';


const loginStyles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    backgroundColor: 'rgb(101, 37, 111)'
},
    view:{
      width: "80%"
    },
    error: {
      position: "absolute",
      bottom: 0,
      color: "rgb(176, 0, 32)",
      fontSize: 12
  },
    cardButton: {
      margin: 2,
      marginLeft: 0,
      marginRight: 0
    },
  });


  export default loginStyles;
  
