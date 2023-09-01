import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import HomeScreen from '../screen/home/HomeScreen';
import BookshelfScreen from '../screen/bookshelf/BookshelfScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

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
