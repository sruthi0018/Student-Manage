import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  staff: null,
  staffs: [],
};

const slice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createStaffSuccess(state, action) {
      state.isLoading = false;
      state.staffs.push(action.payload);
    },
    getStaffsSuccess(state, action) {
      state.isLoading = false;
      state.staffs = action.payload;
    },

    getStaffSuccess(state, action) {
      state.isLoading = false;
      state.staff = action.payload;
    },
    updateStaffSuccess(state, action) {
      state.isLoading = false;
      const updated = action.payload;
      const index = state.staffs.findIndex((p) => p._id === updated._id);
      if (index !== -1) {
        state.staffs[index] = updated;
      }
    },
    deleteStaffSuccess(state, action) {
      state.isLoading = false;
      state.staffs = state.staffs.filter(
        (staff) => staff._id !== action.payload
      );
    },
    clearSingleStaff(state) {
      state.staff = null;
    },
  },
});

export default slice.reducer;
export const { clearSingleStaff } = slice.actions;

export function CreateStaff(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/api/staff`,
        data
      );
      console.log("crpro", response.data);
      dispatch(slice.actions.createStaffSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export const GetAllStaffs = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/api/staff`
    );
    console.log("gtp", response);
    dispatch(slice.actions.getStaffsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export function GetStaffById(id) {
  console.log("iddd", id);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`
      );
      console.log("getprod", response);
      dispatch(slice.actions.getStaffSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function updateStaff(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`,
        data
      );
      dispatch(slice.actions.updateStaffSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      throw error;
    }
  };
}

export function updateStaffPermissions(id, permissions) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.put(
        `${process.env.REACT_APP_BASE_URL}/api/staff/${id}/permissions`,
        permissions
      );
      dispatch(slice.actions.updateStaffSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}

export function DeleteStaff(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_BASE_URL}/api/staff/${id}`
      );
      dispatch(slice.actions.deleteStaffSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
}
