import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './common/TabNavigator';
import SearchScreen from './screen/SearchScreen';
import BookDetailScreen from './screen/BookDetailScreen';
import ReadScreen from './screen/ReadScreen';

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
   
    <Stack.Screen
      name='BookDetailScreen'
      component={BookDetailScreen}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen
      name='ReadScreen'
      component={ReadScreen}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default StackNavigator;