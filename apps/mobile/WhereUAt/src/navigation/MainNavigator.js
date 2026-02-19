
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import FriendsListScreen from '../screens/FriendsListScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hides the header on top of the tabs
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Map" 
        component={MapScreen} 
        // Add an icon here later e.g. options={{ tabBarIcon: ({ color, size }) => ... }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsListScreen} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
