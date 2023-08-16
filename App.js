import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import StackNavigator from './src/components/StackNavigator';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  </>
);

export default function Main() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <App />
    </ApplicationProvider>
  );
}