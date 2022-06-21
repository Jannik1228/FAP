
import React from 'react';
import { DataTable, IconButton } from 'react-native-paper';
import homeStyles from './Home.style';

 const CellDataTable =(props) => {
  function removeUser(){
    console.log("kkkk");
    props.removeUser(props.benutzername);
  }

  return (
          <DataTable.Row>
            <DataTable.Cell>{props.benutzername}</DataTable.Cell>
            <DataTable.Cell ><IconButton
    icon="delete" onPress={removeUser}/></DataTable.Cell>
          </DataTable.Row>
  );
}

export default CellDataTable;

