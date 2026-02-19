import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.whereat.com'; // Replace with actual API endpoint

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

class AuthService {
  private static async request(method: string, endpoint: string, data?: any) {
    const token = await AsyncStorage.getItem('userToken');
    
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  static async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        return response.data.token;
      }
      
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(credentials: RegisterCredentials): Promise<string> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, credentials);
      
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        return response.data.token;
      }
      
      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      // Optional: Call logout endpoint if needed
      await this.request('POST', '/auth/logout');
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  static async getUserProfile(): Promise<UserProfile> {
    return this.request('GET', '/user/profile');
  }

  static async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    return this.request('PUT', '/user/profile', profileData);
  }

  static async resetPassword(email: string): Promise<boolean> {
    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { email });
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('userToken');
    
    if (!token) return false;

    try {
      // Optional: Validate token with backend
      await this.request('GET', '/auth/validate');
      return true;
    } catch {
      await AsyncStorage.removeItem('userToken');
      return false;
    }
  }

  static async refreshToken(): Promise<string | null> {
    try {
      const response = await this.request('POST', '/auth/refresh');
      
      if (response.token) {
        await AsyncStorage.setItem('userToken', response.token);
        return response.token;
      }
      
      return null;
    } catch {
      return null;
    }
  }
}

export default AuthService;