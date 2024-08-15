import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../CustomButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "750px", // Increase width from 500px to 600px
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(TextField)({
  width: "100%",
});

const ModalEditAdmin = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={6}>
          Edit Administrator
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Admin Information"
            icon={<AccountCircleIcon />}
            iconPosition="start"
          />
          <Tab
            label="Change Password"
            icon={<EditIcon />}
            iconPosition="start"
          />
        </Tabs>
        {activeTab === 0 && (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={6}>
              <FormField label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormField label="Last Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormField label="Username" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormField label="Email Address" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <FormField
                select
                label="Company Origin"
                variant="outlined"
                defaultValue=""
              >
                <MenuItem value="company1">Company 1</MenuItem>
                <MenuItem value="company2">Company 2</MenuItem>
                <MenuItem value="company3">Company 3</MenuItem>
              </FormField>
            </Grid>
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <FormField
                label="Enter New Password"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle new password visibility"
                        onClick={handleToggleNewPasswordVisibility}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label="Re-type New Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        )}
        <Box mt={6} display="flex" justifyContent="flex-end">
          <CustomButton
            onClick={onClose}
            variant="outlined"
            sx={{ marginRight: 1 }}
            color="button"
          >
            Cancel
          </CustomButton>
          <CustomButton variant="contained" color="button" text="white">
            Save
          </CustomButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalEditAdmin;
