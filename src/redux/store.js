import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import blogReducer from './slices/blogSlice'; // Will add this later

const store = configureStore({
  reducer: {
    auth: authReducer,
    // blog: blogReducer, // Will add this later
  },
});

export default store;