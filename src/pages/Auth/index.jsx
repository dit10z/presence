import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Hero from "../../assets/hero-signin.png"; // Replace with the correct path to your image
import Logo from "../../assets/logo.png"; // Replace with the correct path to your logo

// Container to center the card on the page
const SignInContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
});

// Main card component
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
  padding: "60px 40px", // Adjust as necessary
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start", // Align items to the left
  textAlign: "left", // Align text to the left
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  width: "100%",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const ImageSection = styled(Box)({
  width: "60%",
  padding: "50px",
  backgroundColor: "#e6f7ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
          <Typography variant="body1" gutterBottom>
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
                // Replace with your eye icon
                endAdornment: (
                  <img
                    src="path/to/your/eye-icon.png"
                    alt="Show Password"
                    style={{ cursor: "pointer" }}
                  />
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox name="rememberMe" defaultChecked />}
              label="Remember Me"
            />
            <StyledButton variant="contained" size="large">
              Login
            </StyledButton>
            <Box mt={2} textAlign="center">
              <Link to="#" style={{ textDecoration: "none", color: "#007bff" }}>
                Forgot Password?
              </Link>
            </Box>
          </form>
        </FormSection>
      </SignInCard>
    </SignInContainer>
  );
};

export default Login;
