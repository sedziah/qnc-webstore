// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// Import other slices and add them to the rootReducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
