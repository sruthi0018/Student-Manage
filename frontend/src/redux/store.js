import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/student"
import staffReducer from './slices/staff'

export const store = configureStore({
  reducer: {
    students: studentReducer,
    staffs:staffReducer
  },
});
