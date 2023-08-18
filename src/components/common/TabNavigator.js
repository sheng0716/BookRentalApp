import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import HomeScreen from '../screen/HomeScreen';
import BookshelfScreen from '../screen/BookshelfScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}
    initialRouteName='HomeScreen'>
    <Tab.Screen name='HomeScreen' component={HomeScreen} />
    <Tab.Screen name='BookshelfScreen' component={BookshelfScreen} />
    <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
