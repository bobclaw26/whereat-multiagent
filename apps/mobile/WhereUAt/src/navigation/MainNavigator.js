
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{ title: 'WhereUAt' }}
      />
      {/* Other authenticated screens like Profile, Feed, etc. will go here */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
