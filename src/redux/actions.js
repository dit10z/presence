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

