
import React from 'react';
import { DataTable, FAB } from 'react-native-paper';


 const CellDataTable =(props) => {
  
  return (
          <DataTable.Row>
            <DataTable.Cell >{props.benutzername}</DataTable.Cell>
            <DataTable.Cell><FAB icon="delete"></FAB></DataTable.Cell>
          </DataTable.Row>
  );
}

export default CellDataTable;

