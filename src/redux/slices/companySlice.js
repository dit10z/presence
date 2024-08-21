import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";

const initialState = {
  data: [],
  detail: {},
  status: false,
  error: null,
  message: null,
};

export const fetchDataCompanies = createAsyncThunk(
  "company/companies",
  async ({ pageNumber, pageSize, sortBy }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/company-management/companies`, {
        params: {
          sortBy: sortBy,
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      });
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
      const response = instance.post("/company-management/companies", data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const detailCompany = createAsyncThunk(
  "company/detailCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = instance.get(`/company-management/companies/${id}`);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editCompany = createAsyncThunk(
  "company/editCompany",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/company-management/companies/${id}`,
        data
      );
      return response.data;
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
        state.message = action.payload.message;
      })
      .addCase(addNewCompany.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })

      // action edit
      .addCase(editCompany.pending, (state) => {
        state.status = true;
      })
      .addCase(editCompany.fulfilled, (state, action) => {
        state.status = false;
        state.message = action.payload.message;
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      });
  },
});

export default companySlice.reducer;
