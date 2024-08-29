import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";

const initialState = {
  data: {}, // u/ data dashboard umum
  dataChart: [], // u/ data chart (diubah menjadi array)
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

export const fetchDataChart = createAsyncThunk(
  "dashboard/fetchDataChart",
  async () => {
    try {
      const response = await instance.get(`/superadmin/company-overview`);
      console.log("data company:", response.data);  

      // if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      // } else {
      //   throw new Error("Unexpected data format");
      // }
    } catch (error) {
      console.error("Error in fetchDataChart:", error); // Log error
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
      })
      .addCase(fetchDataChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataChart.fulfilled, (state, action) => {
        state.loading = false;
        state.dataChart = action.payload.data; 
      })
      .addCase(fetchDataChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
