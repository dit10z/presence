import { createAsyncThunk } from '@reduxjs/toolkit';

// start punya tasyia untuk add admin
// Thunk untuk mengambil daftar perusahaan (companies)
export const fetchCompanies = createAsyncThunk('admin/fetchCompanies', async () => {
  const response = await fetch('http://localhost:8080/company-management/companies');
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  const data = await response.json();
  return data.data; // Mengambil data perusahaan dari respons
});

// Thunk untuk menambahkan admin baru
export const addAdmin = createAsyncThunk(
    'admin/addAdmin',
    async (adminData, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8080/admin-management/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);  // Mengirim error dari backend jika terjadi
        }
  
        return await response.json();
      } catch (error) {
        return rejectWithValue({ message: error.message });
      }
    }
  );
  //end
  
