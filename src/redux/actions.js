import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk mengambil daftar perusahaan (companies)
export const fetchCompanies = createAsyncThunk(
  "admin/fetchCompanies",
  async () => {
    const response = await fetch(
      "http://localhost:8080/company-management/companies",
      {
        method: "GET",
        headers: {
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

// Thunk untuk mengambil data detail admin
export const fetchAdminDetail = createAsyncThunk(
  "admin/fetchAdminDetail",
  async (idAdmin, { rejectWithValue }) => {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNpaSIsImlhdCI6MTcxOTgwMzM3OCwiZXhwIjoxNzE5ODg5Nzc4fQ.0TlpfJfrvZAaoT6o-ouvUJ4BoVWLRyLVwuSLH-x2pcY`;
    try {
      const response = await axios.get(
        `http://localhost:8080/admin-management/admins/${idAdmin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Tidak perlu memeriksa `response.ok` atau memanggil `response.json()`
      return response.data.data; // Mengembalikan data dari respons
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk ubah foto admin
export const changeAdminPhoto = createAsyncThunk(
  "admin/changeAdminPhoto",
  async ({ idAdmin, photo } , { rejectWithValue }) => {
    const token = localStorage.getItem("token")
    console.log(token);
    try {
      const response = await axios.patch(
        `http://localhost:8080/admin-management/admins/photo/${idAdmin}`, 
        { profile_picture: photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const changeAdminPhoto = createAsyncThunk(
//   'admin/changeAdminPhoto',
//   async ({ idAdmin, photo } , { rejectWithValue }) => {
//     const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNpaSIsImlhdCI6MTcxOTgwMzM3OCwiZXhwIjoxNzE5ODg5Nzc4fQ.0TlpfJfrvZAaoT6o-ouvUJ4BoVWLRyLVwuSLH-x2pcY`;
//     try {
//       const response = await fetch(
//         `http://localhost:8080/admin-management/admins/photo/${idAdmin}`, 
//         { profile_picture: photo },
//         {
//           method: "PATCH",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           bidy: JSON.stringify({profile_picture: photo})
//         }
//       );

//       if(!response.ok) {
//         throw new error(`HTTP error!status: ${response.status}`)
//       }

//       const data = await response.json();
//       return data.data;

//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

