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
  // const [dataAdmin, setDataAdmin] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [dataCompanyMaster, setDataCompanyMaster] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    idcompany: "",
    companyName: "",
    password: " ",
  });
  // #melakukan fetch data admin
  const fetchDataAdmin = async (adminId) => {
    try {
      console.log("adminId", adminId);
      const response = await detailAdmin(adminId);
      // console.log("response", response.data.data.company.id_company);
      // setDataAdmin(response.data.data);
      // console.log("dataAdmin", dataAdmin);
      setFormData({
        firstname: response.data.data.first_name || "",
        lastname: response.data.data.last_name || "",
        email: response.data.data.email || "",
        username: response.data.data.username || "",
        idcompany: response.data.data.company.id_company || "",
        companyName: response.data.data.company.company_name || "",
        password: response.data.data.password || "",
      });

      // console.log(formData.idcompany);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const masterAlcompany = async () => {
    try {
      const response = await getAllCompaniesMaster();
      console.log(response);
      setDataCompanyMaster(response.data.data);
      console.log("dataCompanyMaster", dataCompanyMaster);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (open) {
      fetchDataAdmin(adminId);
      masterAlcompany();
    }
  }, [open, adminId]);

  // useEffect(() => {
  //   masterAlcompany();
  // }, []);

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
      // console.log(response);
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
                label="firstname"
                variant="outlined"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="lastname"
                variant="outlined"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                select
                label={formData.companyName}
                variant="outlined"
                defaultValue=""
                value={formData.idcompany}
              >
                {dataCompanyMaster.map((data, index) => (
                  <MenuItem value={data.id_company} key={index}>
                    {data.company_name}
                  </MenuItem>
                ))}
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
