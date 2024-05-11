// store/hooks.ts
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { AppState, AppDispatch } from './configureStore';

// Explicitly declare the return type of useAppDispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

// Explicitly declare the return type of useAppSelector
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
