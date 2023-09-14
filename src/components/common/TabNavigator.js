import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './BottomTabBar';
import HomeScreen from '../screen/home/HomeScreen';
import BookshelfScreen from '../screen/bookshelf/BookshelfScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const { userId } = route.params;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName='HomeScreen'>

      <Tab.Screen name='HomeScreen'>
        {(props) => <HomeScreen {...props} userId={userId} />}
      </Tab.Screen>

      <Tab.Screen name='BookshelfScreen'>
        {(props) => <BookshelfScreen {...props} userId={userId} />}
      </Tab.Screen>

      <Tab.Screen name='ProfileScreen'>
        {(props) => <ProfileScreen {...props} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
