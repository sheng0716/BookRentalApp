import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useRoute } from '@react-navigation/native';

const BookOpenIcon = (props) => (
  <Icon {...props} name='book-open-outline' />
);

const BookIcon = (props) => (
  <Icon {...props} name='book-outline' />
);

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const BottomTabBar = ({ navigation, state }) => {
  const route = useRoute();
  const { userId } = route.params; // Get the userId from the route params

  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index], { userId });
  };

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab icon={BookOpenIcon} title='READ' />
      <BottomNavigationTab icon={BookIcon} title='BOOKSHELF' />
      <BottomNavigationTab icon={PersonIcon} title='PROFILE' />
    </BottomNavigation>
  );
};

export default BottomTabBar;
