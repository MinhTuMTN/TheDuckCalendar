import React from 'react';
import DatePicker from './components/DatePicker';
import Home from './screens/Home';
import { StatusBar } from 'react-native';

function App(): React.JSX.Element {
  return (
    <>
      <Home />
      <StatusBar
        backgroundColor="#010101"
        barStyle="light-content"
      />
    </>
  );
}

export default App;
