import { useDispatch, useSelector } from "react-redux";
import { login, logout, setCredentials } from "../redux/slices/authSlice";
import { createContext, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const loginUser = async (username, password) => {
    try {
      const user = await dispatch(login({ username, password })).unwrap();
      dispatch(setCredentials(user));
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
