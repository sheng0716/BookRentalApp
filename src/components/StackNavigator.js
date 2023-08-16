import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './common/TabNavigator';
import SearchScreen from './screen/SearchScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Home'
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen
      name='SearchScreen'
      component={SearchScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackNavigator;