import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  student: null,
  students: [],
};

const slice = createSlice({
  name: "students",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createstudentSuccess(state, action) {
      state.isLoading = false;
      state.students.push(action.payload);
    },
    getStudentsSuccess(state, action) {
      state.isLoading = false;
      state.students = action.payload;
    },

    getStudentSuccess(state, action) {
      state.isLoading = false;
      state.student = action.payload;
    },
    updateStudentSuccess(state, action) {
      state.isLoading = false;
      const updated = action.payload;
      const index = state.students.findIndex((p) => p._id === updated._id);
      if (index !== -1) {
        state.students[index] = updated;
      }
    },
    deleteStudentSuccess(state, action) {
      state.isLoading = false;
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
    clearSingleStudent(state) {
      state.student = null;
    },
  },
});

export default slice.reducer;
export const { clearSingleStudent } = slice.actions;

export function CreateStudent(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/api/students`,
        data
      );
      console.log("crpro", response.data);
      dispatch(slice.actions.createstudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export const GetAllStudents = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/api/students`
    );
    console.log("gtp", response.data);
    dispatch(slice.actions.getStudentsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export function GetStudentById(id) {
  console.log("iddd", id);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/api/students/${id}`
      );
      console.log("getprod", response);
      dispatch(slice.actions.getStudentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function UpdateStudent(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_BASE_URL}/api/students/${id}`,
        data
      );
      console.log(response,"uppdd")
      dispatch(slice.actions.updateStudentSuccess(response.data.student));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export function DeleteStudent(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_BASE_URL}/api/students/${id}`
      );
      dispatch(slice.actions.deleteStudentSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}
