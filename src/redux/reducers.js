import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanies, addAdmin } from "./actions";

//start punya tasyia utk add admin
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    companies: [],
    status: "idle",
    error: null,
    validationErrors: {}, // Menyimpan error validasi per field
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.status = "succeeded";
        state.companies = action.payload.data; // Menyimpan daftar companies ke dalam state
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
      });
  },
});
//end
export default adminSlice.reducer;
