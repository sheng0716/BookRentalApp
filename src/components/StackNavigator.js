import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './common/TabNavigator';
import SearchScreen from './screen/home/SearchScreen';
import BookDetailScreen from './screen/bookshelf/BookDetailScreen';
import ReadScreen from './screen/bookshelf/ReadScreen';
import LoginScreen from './screen/login/LoginScreen';
import RegisterScreen from './screen/login/RegisterScreen';
import SettingsScreen from './screen/profile/SettingsScreen';
import MemberScreen from './screen/profile/MemberScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName='Login'>
    <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='Register'
      component={RegisterScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name='TabNavigator'
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

    <Stack.Screen
      name='Settings'
      component={SettingsScreen}
      options={{ headerShown: true, headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold', fontSize: 22 } }}
    />

    <Stack.Screen
      name='Member'
      component={MemberScreen}
      options={{ headerShown: true, headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold', fontSize: 22 } }}
    />

  </Stack.Navigator>
);

export default StackNavigator;