import { combineReducers } from "@reduxjs/toolkit";
import repository from "./repository";


export const reducers = combineReducers({ repository });

export type RootState = ReturnType<typeof reducers>;
