import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./redux/store"; // Import store from your redux store file

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Pages /> {/* Ini akan mengatur semua routing dan halaman */}
        {/* <ProTip /> */}
        {/* <Copyright /> */}
      </Router>
    </Provider>
  );
}
