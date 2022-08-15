//import Libaries, Constants and Functions 
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {theme }  from './App.style';
import AppNavigator from './app/app.navigator';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator/>
    </PaperProvider>
  );
}