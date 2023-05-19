"use client";

// Dependencies
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Redux
import { DispatchFunc, RootState } from "../types/Redux";

export const useAppDispatch: DispatchFunc = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
