/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import ConnectScreen from './screen/ConnectScreen';

function App(): React.JSX.Element {
  // For changing screen, we can have a state to keep track of all the necessary information we need (device info and initial ph color)
  // once requirements are satisfied we can update the state and change the screen by conditionally rendering a different screen component
  // for now we have the connect screen.
  return <ConnectScreen />;
}

export default App;
