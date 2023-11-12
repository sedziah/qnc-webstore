// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppState, AppDispatch } from "./configureStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
