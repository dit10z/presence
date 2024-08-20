import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanies, changeAdminPhoto, fetchAdminDetail } from './actions';

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
  },
});
//end
export default adminSlice.reducer;
