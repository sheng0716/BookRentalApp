import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

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
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
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
