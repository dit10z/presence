import { createAsyncThunk } from "@reduxjs/toolkit";

// start punya tasyia untuk add admin
// Thunk untuk mengambil daftar perusahaan (companies)
export const fetchCompanies = createAsyncThunk(
  "admin/fetchCompanies",
  async () => {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJpZF9zdXBlcmFkbWluIjoyLCJpZF9hY2NvdW50IjoiNjBjYzYzNTAtYzZiZS00OTMxLTlkYjUtZjg4NWJjMjI0ZDgwIiwic3ViIjoibXVyaTEyMzQiLCJpYXQiOjE3MjM3OTUxMjUsImV4cCI6MTcyMzg4MTUyNX0.WQv_c4aMafcsBnIvau_dKqiv8gtPiSQ2dEBTIp21new`;
    const response = await fetch(
      "http://localhost:8080/company-management/companies",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Menyertakan JWT dalam header
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }
    const data = await response.json();
    return data.data; // Mengambil data perusahaan dari respons
  }
);

// Thunk untuk menambahkan admin baru
export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin-management/admins",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Mengirim error dari backend jika terjadi
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);
