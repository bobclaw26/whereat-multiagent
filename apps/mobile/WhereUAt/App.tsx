
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock authentication state. In a real app, this would come from a global state
// manager or AsyncStorage after a successful login.
const IS_LOGGED_IN = true; // Set to `false` to see the login/registration flow

const App = () => {
  // We'll use a simple state for now to toggle between flows.
  // In a real app, you'd have a function like `authContext.isUserAuthenticated()`
  const [isAuthenticated, setIsAuthenticated] = useState(IS_LOGGED_IN);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
