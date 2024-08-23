import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminsSlice";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import dashboardReducer from "./slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    companies: companyReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
