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
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import success from "../../assets/icons/success.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getAllCompaniesMaster,
  editPassword,
  editDataAdmin,
  detailAdmin,
} from "../../api/administrator/index";

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
  const [dataCompanyMaster, setDataCompanyMaster] = useState([]);

  // Fetch data admin dan company
  const fetchDataAdmin = async (adminId) => {
    try {
      const response = await detailAdmin(adminId);
      formik.setValues({
        firstname: response.data.data.first_name || "",
        lastname: response.data.data.last_name || "",
        email: response.data.data.email || "",
        username: response.data.data.username || "",
        idcompany: response.data.data.company.id_company || "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const masterAlcompany = async () => {
    try {
      const response = await getAllCompaniesMaster();
      setDataCompanyMaster(response.data.data);
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

  // Validasi menggunakan Yup
  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    idcompany: Yup.string().required("Company is required"),
    password: Yup.string().when("activeTab", {
      is: 1,
      then: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .when("activeTab", {
        is: 1,
        then: Yup.string().required("Confirm Password is required"),
      }),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      idcompany: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        first_name: values.firstname,
        last_name: values.lastname,
        username: values.username,
        email: values.email,
        id_company: values.idcompany,
      };
      try {
        if (activeTab === 0) {
          // Mengirim data untuk mengedit admin
          console.log("data : ", payload);
          await editDataAdmin(adminId, payload);
          Swal.fire({
            title: "Success",
            text: "Update Admin Success",
            imageUrl: success,
            imageAlt: "success",
          });
        } else if (activeTab === 1) {
          // Mengubah password admin
          await editPassword(adminId, values.password);
          Swal.fire({
            title: "Success",
            text: "Update Password Success",
            imageUrl: success,
            imageAlt: "success",
          });
        }
        onClose(); // Menutup modal setelah berhasil
      } catch (error) {
        Swal.fire("Error", "There was an error updating the admin", "error");
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          {activeTab === 0 && (
            <Grid container spacing={3} mt={3}>
              <Grid item xs={6}>
                <FormField
                  label="First Name"
                  variant="outlined"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label="Last Name"
                  variant="outlined"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  select
                  label="Company"
                  variant="outlined"
                  name="idcompany"
                  value={formik.values.idcompany}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.idcompany && Boolean(formik.errors.idcompany)
                  }
                  helperText={
                    formik.touched.idcompany && formik.errors.idcompany
                  }
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
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
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
            <CustomButton variant="contained" color="primary" type="submit">
              Save
            </CustomButton>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalEditAdmin;
