import { StyleSheet } from 'react-native';



const homeStyles = StyleSheet.create({
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
    },textInput: {
      width:"70%",
      position:'absolute',
      marginTop: 15,
    },
    scrollView:{
        position: "relative",
        top: "40%",
        height: "75%",
        left: "-10%",
        width: "130%",
    },
    view: {
        width:"80%",
        position:'absolute',
        left:"10%",
        top:"12%",
        height: "48%",
        padding: 15,
        backgroundColor: "#fff",
    },
    fab: {
      backgroundColor: 'rgb(101, 37, 111)',
      position:'absolute',
      right:"5%",
      marginTop: 25,
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


  export default homeStyles;
  
