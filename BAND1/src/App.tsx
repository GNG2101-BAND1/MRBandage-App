import React from 'react';
import ConnectScreen from './screens/ConnectScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultScreen from './screens/ResultScreen';
import start from './backend/TestServer';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // start();

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Connect"
        component={ConnectScreen}/>

      <Stack.Screen 
        name="Result"
        component={ResultScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
};

export default App;
