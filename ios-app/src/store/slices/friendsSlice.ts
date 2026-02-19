import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Friend {
  id: string;
  username: string;
  email: string;
  lastLocation?: {
    latitude: number;
    longitude: number;
    timestamp: number;
  };
}

interface FriendsState {
  friends: Friend[];
  friendRequests: Friend[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FriendsState = {
  friends: [],
  friendRequests: [],
  isLoading: false,
  error: null
};

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.get('/api/friends');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  'friends/sendFriendRequest',
  async (email: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.post('/api/friends/request', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptFriendRequest',
  async (requestId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await axios.post(`/api/friends/accept/${requestId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.friendRequests.push(action.payload);
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        const newFriend = action.payload;
        state.friends.push(newFriend);
        state.friendRequests = state.friendRequests.filter(
          request => request.id !== newFriend.id
        );
      });
  }
});

export default friendsSlice.reducer;