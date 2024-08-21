import React, { useEffect, useState } from "react";
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
import {
  getAllCompaniesMaster,
  editPassword,
  editDataAdmin,
  detailAdmin,
} from "../../services/apis";

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

const ModalEditAdmin = ({ open, onClose, adminId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    idcompany: "",
    password: " ",
  });

  // #melakukan fetch data admin
  const fetchDataAdmin = async (adminId) => {
    try {
      const response = await detailAdmin(adminId);
      console.log(response);
      setDataAdmin(response.data.data);

      setFormData({
        firstname: dataAdmin.firstname || "",
        lastname: dataAdmin.lastname || "",
        email: dataAdmin.email || "",
        username: dataAdmin.username || "",
        idcompany: dataAdmin.idcompany || "",
        password: dataAdmin.password || "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataAdmin(adminId);
  }, [adminId]);

  const masterAlcompany = async () => {
    try {
      const response = await getAllCompaniesMaster();
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmitEditAdmin = async (adminId) => {
    // Handle form submission
    try {
      const payload = {
        first_name: formData.firstname,
        last_name: formData.lastname,
        username: formData.username,
        email: formData.email,
        id_company: formData.idcompany,
      };
      console.log(payload);
      // const response = await editDataAdmin(adminId, payload);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitChangePassword = async () => {
    try {
      // const response = await editPassword(adminId, formData.password);
      console.log(formData.password);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
              <FormField
                label={formData.firstname}
                variant="outlined"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label={formData.lastname}
                variant="outlined"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label={formData.username}
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label={formData.email}
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                select
                label="Company Origin"
                variant="outlined"
                defaultValue=""
              >
                {<MenuItem value="company1">Company 1</MenuItem>}
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
          <CustomButton
            variant="contained"
            color="button"
            text="white"
            onClick={() => {
              activeTab === 0
                ? handleSubmitEditAdmin(adminId)
                : handleSubmitChangePassword;
            }}
          >
            Save
          </CustomButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalEditAdmin;
