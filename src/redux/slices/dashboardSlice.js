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
      const response = await instance.get(`/superadmin/overview-data`);
      return response.data;
    } catch (error) {
      return console.log(error.response.data);
    }
  }
);

export const fetchDataChart = createAsyncThunk(
  "dashboard/fetchDataChart",
  async ({ startDate, endDate }) => {
    try {
      const response = await instance.get(`/superadmin/company-overview`, {
        params: {
          start_date_filter: startDate,
          end_date_filter: endDate,
        },
      });
      console.log("API Called:", `/superadmin/company-overview?start_date_filter=${startDate}&end_date_filter=${endDate}`);
      return response.data;
    } catch (error) {
      console.error("Error in fetchDataChart:", error); // Log error
      throw error.response?.data || error.message;
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
