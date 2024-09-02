import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../services/axiosInstance";
import {
  getAllAdmins,
  editDataAdmin,
  editPassword,
} from "../../services/api/adminService";
import axios from "axios";

const initialState = {
  admins: [],
  data: [],
  companies: [],
  adminDetail: null,
  status: "idle",
  error: null,
  validationErrors: {},
  pagination: {},
};

// Thunk untuk mengambil semua admin
export const fetchAllAdmins = createAsyncThunk(
  "admin/fetchAllAdmins",
  async (params, { rejectWithValue }) => {
    console.log(params);
    try {
      const response = await getAllAdmins(
        params.sortBy,
        params.pageSize,
        params.pageNumber,
        params.startDateJoined,
        params.endDateJoined
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk untuk mengambil daftar perusahaan (companies)
export const fetchCompanies = createAsyncThunk(
  "admin/fetchCompanies",
  async () => {
    try {
      const response = await instance.get("/company-management/companies");
      return response.data.data; // Mengambil data perusahaan dari respons
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk menambahkan admin baru
export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/admin-management/admins",
        adminData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Thunk untuk mengambil data detail admin
export const fetchAdminDetail = createAsyncThunk(
  "admin/fetchAdminDetail",
  async (idAdmin, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/admin-management/admins/${idAdmin}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("fetchAdminDetail", response.data.data);
      return response.data.data; // Mengembalikan data dari respons
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk ubah foto admin
export const changeAdminPhoto = createAsyncThunk(
  "admin/changeAdminPhoto",
  async ({ idAdmin, formData }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/admin-management/admins/photo/${idAdmin}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchEditDataAdmin = createAsyncThunk(
  "admin/editDataAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await editDataAdmin(id, data);
      return response.data; // or response depending on what you need
    } catch (error) {
      console(error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const fetchEditPassword = createAsyncThunk(
  "admin/editPassword",
  async ({ id, password }, { rejectWithValue }) => {
    try {
      console.log("data password", password);
      const response = await editPassword(id, password);
      return response.data; // or response depending on what you need
    } catch (error) {
      console(error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Companies
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companies = action.payload; // Menyimpan daftar companies ke dalam state
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Admin
      .addCase(addAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.validationErrors = {}; // Reset error validasi saat memulai request baru
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admins.push(action.payload);
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload?.errors) {
          state.validationErrors = action.payload.errors; // Menyimpan error validasi per field
        } else {
          state.error = action.payload?.message || "Failed to add admin";
        }
      })
      // Fetch Admin Detail
      .addCase(fetchAdminDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminDetail = action.payload;
      })
      .addCase(fetchAdminDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch admin detail";
      })
      // Change Admin Photo
      .addCase(changeAdminPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeAdminPhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.adminDetail?.id_admin === action.payload.idAdmin) {
          state.adminDetail.profile_picture = action.payload.profile_picture;
        }
      })
      .addCase(changeAdminPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to change admin photo";
      })
      .addCase(fetchAllAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.meta; // Mengisi state admins dengan data dari API
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong"; // Menangani error
      })
      .addCase(fetchEditDataAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditDataAdmin.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          (admin) => admin.id_admin === action.payload.id_admin
        );
        if (index !== -1) {
          state.admins[index] = action.payload; // Update admin yang sudah ada
        } else {
          state.admins.push(action.payload); // Tambahkan admin jika belum ada di array
        }
      })
      .addCase(fetchEditDataAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEditPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditPassword.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.admins.findIndex(
          (admin) => admin.id_admin === action.payload.id_admin
        );
        if (index !== -1) {
          state.admins[index] = { ...state.admins[index], ...action.payload }; // Update admin data
        } else {
          state.admins.push(action.payload); // Tambahkan admin jika belum ada di array
        }
      })
      .addCase(fetchEditPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
