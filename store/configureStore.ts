import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// Explicitly define the store configuration function with a return type
export const makeStore = (): ReturnType<typeof configureStore> =>
  configureStore({
    reducer: rootReducer,
    // Add any middleware here
  });

// Define store after makeStore to ensure proper type inference
const store = makeStore();

// Use ReturnType to properly reference the dynamic type of the store's state
export type AppState = ReturnType<typeof store.getState>;

// Define dispatch type based on the store's dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
