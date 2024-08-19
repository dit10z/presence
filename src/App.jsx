import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { setCredentials } from "./redux/slices/authSlice"; // Import setCredentials

function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (token && userRole) {
      dispatch(setCredentials({ token, role: userRole }));
    }
  }, [dispatch]);

  return <Pages />;
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer />
      </Router>
    </Provider>
  );
}
