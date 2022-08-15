//import Libaries, Constants and Functions
import React from 'react';
import { DataTable, IconButton } from 'react-native-paper';
 
 const CellDataTable =(props) => {
  
  //UseState Statements
  //handleChange with set-Statements
  //Navigation Statement

  //other functions
  function removeUser(){
    console.log("kkkk");
    props.removeUser(props.benutzername);
  }

  //Render Statement
  return (
          <DataTable.Row>
            <DataTable.Cell>{props.benutzername}</DataTable.Cell>
            <DataTable.Cell ><IconButton
    icon="delete" onPress={removeUser}/></DataTable.Cell>
          </DataTable.Row>
  );
}

//export Component
export default CellDataTable;

