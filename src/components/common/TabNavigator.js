import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import ReadScreen from '../screen/ReadScreen';
import BookshelfScreen from '../screen/BookshelfScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}
    initialRouteName='ReadScreen'>
    <Tab.Screen name='ReadScreen' component={ReadScreen} />
    <Tab.Screen name='BookshelfScreen' component={BookshelfScreen} />
    <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
