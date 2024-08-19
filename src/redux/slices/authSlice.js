import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  userRole: localStorage.getItem("userRole") || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/superadmin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userRole", data.data.role);
      console.log(data);

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
    setCredentials(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
