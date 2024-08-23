import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";

const initialState = {
  data: {},
  loading: false,
  error: null,
  message: null,
};

export const fetchDataDashboard = createAsyncThunk(
  "dashboard/fetchDataDashboard",
  async () => {
    try {
      const response = await instance.get(`/superadmin/data-overview`);
      return response.data;
    } catch (error) {
      return console.log(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDataDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
