import API from '../../api/axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userToken: localStorage.getItem('userToken') || null,
  loading: false,
  error: null,
  isLoggedIn: !!localStorage.getItem('userToken'),
  hasCheckedAuth: false,
  isLoginModalOpen: false, // ✅ New state for login modal visibility
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await API.post(
        '/api/auth/login',
        { email, password },
        config
      );
      localStorage.setItem('userToken', data.token);
      return data.token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await API.post(
        '/api/auth/signup',
        { name, email, password },
        config
      );
      localStorage.setItem('userToken', data.token);
      return data.token;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUserFromStorage',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      return token;
    }
    return rejectWithValue('No token found');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userToken = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.hasCheckedAuth = true;
      state.isLoginModalOpen = false; // ✅ Close modal on logout
      localStorage.removeItem('userToken');
    },
    // ✅ New reducer to control modal visibility
    setLoginModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
      // Optionally clear error when modal opens/closes
      if (!action.payload) {
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload;
        state.isLoggedIn = true;
        state.hasCheckedAuth = true;
        state.isLoginModalOpen = false; // ✅ Close modal on successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.userToken = null;
        state.hasCheckedAuth = true;
        state.isLoginModalOpen = true; // ✅ Keep modal open on failed login
        localStorage.removeItem('userToken');
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userToken = action.payload;
        state.isLoggedIn = true;
        state.hasCheckedAuth = true;
        state.isLoginModalOpen = false; // ✅ Close modal on successful signup
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.userToken = null;
        state.hasCheckedAuth = true;
        state.isLoginModalOpen = true; // ✅ Keep modal open on failed signup
        localStorage.removeItem('userToken');
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isLoggedIn = true;
        state.hasCheckedAuth = true;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.userToken = null;
        state.isLoggedIn = false;
        state.hasCheckedAuth = true;
        localStorage.removeItem('userToken');
      });
  },
});

export const { logout, setLoginModalOpen } = authSlice.actions; // ✅ Export new action
export default authSlice.reducer;

