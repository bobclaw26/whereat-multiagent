import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import AuthService from '../services/AuthService';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await AuthService.login({ email, password });
        // Navigate to main app screen
      } else {
        await AuthService.register({ 
          email, 
          password, 
          username: email.split('@')[0] 
        });
        // Navigate to main app screen
      }
    } catch (error) {
      Alert.alert(
        'Authentication Error', 
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  };

  const handlePasswordReset = async () => {
    if (email) {
      const result = await AuthService.resetPassword(email);
      Alert.alert(
        'Password Reset', 
        result 
          ? 'Password reset instructions sent to your email' 
          : 'Failed to send password reset instructions'
      );
    } else {
      Alert.alert('Error', 'Please enter your email first');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Login to WhereUAt' : 'Register for WhereUAt'}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleAuthentication}
      >
        <Text style={styles.buttonText}>
          {isLogin ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>
      
      {isLogin && (
        <TouchableOpacity onPress={handlePasswordReset}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchMode}>
          {isLogin 
            ? 'Need an account? Register' 
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  switchMode: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default AuthScreen;