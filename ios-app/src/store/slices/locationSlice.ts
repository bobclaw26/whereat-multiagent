import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Location from 'expo-location';

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  nearbyVenues: any[];
  isTracking: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentLocation: null,
  nearbyVenues: [],
  isTracking: false,
  error: null
};

export const getCurrentLocation = createAsyncThunk(
  'location/getCurrentLocation',
  async (_, { rejectWithValue }) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return rejectWithValue('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startLocationTracking = createAsyncThunk(
  'location/startLocationTracking',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return rejectWithValue('Permission to access location was denied');
      }

      await Location.startLocationUpdatesAsync('backgroundLocationTask', {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10
      });

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNearbyVenues = createAsyncThunk(
  'location/fetchNearbyVenues',
  async (coordinates: { latitude: number; longitude: number }, { rejectWithValue }) => {
    try {
      // TODO: Implement actual API call to fetch nearby venues
      const mockVenues = [
        { 
          id: '1', 
          name: 'Cool Cafe', 
          latitude: coordinates.latitude + 0.01, 
          longitude: coordinates.longitude + 0.01 
        },
        { 
          id: '2', 
          name: 'Tech Meetup Space', 
          latitude: coordinates.latitude - 0.02, 
          longitude: coordinates.longitude - 0.02 
        }
      ];
      return mockVenues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.currentLocation = action.payload;
        state.error = null;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(startLocationTracking.fulfilled, (state) => {
        state.isTracking = true;
      })
      .addCase(startLocationTracking.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isTracking = false;
      })
      .addCase(fetchNearbyVenues.fulfilled, (state, action) => {
        state.nearbyVenues = action.payload;
      })
      .addCase(fetchNearbyVenues.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export default locationSlice.reducer;