// store/configureStore.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // Add any middleware here
  });

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
