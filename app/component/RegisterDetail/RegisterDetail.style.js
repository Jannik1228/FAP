import { StyleSheet } from 'react-native';



const registerDetailStyles = StyleSheet.create({
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
        width: "100%",
        height: "10%",
    },
    view: {
        width:"80%",
        height: "50%",
        position:'absolute',
        left:"10%",
        top:"12%",
        padding: 15,
        backgroundColor: "#fff",
    },
    cardButton: {
      margin: 20,
      marginLeft: 0,
      marginRight: 0,
    },
    container: {
        height: "36%",
        margin: "2%",
        width: "96%",
        position:'absolute',
        left:0,
        bottom:"0%",
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
  });


  export default registerDetailStyles;
  
