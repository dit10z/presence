import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers";
import authReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    companies: companyReducer,
  },
});

export default store;
