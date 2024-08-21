import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";

const initialState = {
  data: [],
  detail: {},
  status: false,
  error: null,
};

export const fetchDataCompanies = createAsyncThunk(
  "company/companies",
  async ({ pageNumber, pageSize, sortBy }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `http://localhost:8080/company-management/companies`,
        {
          params: {
            sortBy: sortBy,
            pageSize: pageSize,
            pageNumber: pageNumber,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewCompany = createAsyncThunk(
  "company/addNewCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = instance.post(
        "http://localhost:8080/company-management/companies",
        data
      );
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const detailCompany = createAsyncThunk(
  "company/detailCompany",
  async (id_company, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `http://localhost:8080/company-management/companies/${id_company}`
      );
      const { data, status, statusText } = response;
      console.log("Status:", data.data);
      return { data: data.data, status, statusText };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataCompanies.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchDataCompanies.fulfilled, (state, action) => {
        state.status = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDataCompanies.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })

      // action detail
      .addCase(detailCompany.pending, (state) => {
        state.status = true;
      })
      .addCase(detailCompany.fulfilled, (state, action) => {
        state.status = false;
        state.detail = action.payload.data;
      })
      .addCase(detailCompany.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })

      // action add
      .addCase(addNewCompany.pending, (state) => {
        state.status = true;
      })
      .addCase(addNewCompany.fulfilled, (state, action) => {
        state.status = false;
        state.data.push(action.payload.data);
      })
      .addCase(addNewCompany.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
