import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanies,
  addAdmin,
  changeAdminPhoto,
  fetchAdminDetail,
} from "./actions";

//start punya tasyia utk add admin
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    companies: [],
    adminDetail: null,
    status: "idle",
    error: null,
    validationErrors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetch companies
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.status = "succeeded";
        state.companies = action.payload; // Menyimpan daftar companies ke dalam state
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //add admin
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
      //fetch admin detail
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
      //change photo
      .addCase(changeAdminPhoto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeAdminPhoto.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedAdmin = state.admins.find(
          (admin) => admin.id === action.payload.idAdmin
        );
        if (updatedAdmin) {
          updatedAdmin.profile_picture = action.payload.profile_picture;
        }
      })
      .addCase(changeAdminPhoto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to change admin photo";
      });
  },
});
//end
export default adminSlice.reducer;
