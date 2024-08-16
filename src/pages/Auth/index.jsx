import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Hero from "../../assets/hero-signin.png";
import Logo from "../../assets/logo.png";

const SignInContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

const SignInCard = styled(Box)({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  height: "100%",
  width: "100%",
});

const FormSection = styled(Box)({
  width: "40%",
  padding: "60px 40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  textAlign: "left",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ced4da", // Use default border color
    },
    "&:hover fieldset": {
      borderColor: "#80bdff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#007bff",
    },
  },
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#0078D7",
  color: "#ffffff",
  width: "100%",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const ImageSection = styled(Box)({
  width: "60%",
  padding: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F4F7FE", // Removed the blue background color
});

const Login = () => {
  return (
    <SignInContainer>
      <SignInCard>
        <ImageSection>
          <img
            src={Hero}
            alt="Sign In Illustration"
            style={{ maxWidth: "100%" }}
          />
        </ImageSection>
        <FormSection>
          <Box mb={3} display="flex" justifyContent="flex-start">
            <img src={Logo} alt="Tujuh Sembilan" style={{ width: "150px" }} />
          </Box>
          <Typography variant="h4" gutterBottom>
            Presensi 79
          </Typography>
          <Typography variant="body1" gutterBottom style={{ color: "#6c757d" }}>
            {" "}
            {/* Changed to gray */}
            Please login here
          </Typography>
          <form>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              defaultValue="robertallen"
            />
            <StyledTextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              defaultValue="********"
              InputProps={{
                endAdornment: <VisibilityIcon />,
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <FormControlLabel
                control={<Checkbox name="rememberMe" defaultChecked />}
                label="Remember Me"
              />
              <Link to="#" style={{ textDecoration: "none", color: "#007bff" }}>
                Forgot Password?
              </Link>
            </Box>
            <StyledButton variant="contained" size="large">
              Login
            </StyledButton>
          </form>
        </FormSection>
      </SignInCard>
    </SignInContainer>
  );
};

export default Login;
