import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/actions";
import { selectCompanies } from "../../redux/selectors";
import axios from "axios";
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "750px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(TextField)({
  width: "100%",
});

const ModalAddNewAdmin = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    id_company: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const errors = {};

    // Validasi first name
    if (!formData.first_name || formData.first_name.trim() === "") {
      errors.first_name = "First name must not be empty";
    } else if (
      formData.first_name.length < 1 ||
      formData.first_name.length > 255
    ) {
      errors.first_name =
        "Invalid first name. (Min. 1 characters & Max. 255 characters)";
    }

    // Validasi last name
    if (!formData.last_name || formData.last_name.trim() === "") {
      errors.last_name = "Last name must not be empty";
    } else if (
      formData.last_name.length < 1 ||
      formData.last_name.length > 255
    ) {
      errors.last_name =
        "Invalid last name. (Min. 1 characters & Max. 255 characters)";
    }

    // Validasi username
    if (!formData.username || formData.username.trim() === "") {
      errors.username = "Username must not be empty";
    } else if (formData.username.length < 7 || formData.username.length > 20) {
      errors.username =
        "Invalid username. (Min. 7 characters & Max. 20 characters)";
    }

    // Validasi email
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "Email must not be empty";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    } else if (formData.email.length < 1 || formData.email.length > 255) {
      errors.email = "Invalid email. (Min. 1 characters & Max 255 characters)";
    }

    // Validasi password
    if (!formData.password || formData.password.trim() === "") {
      errors.password = "Password must not be empty";
    } else if (formData.password.length < 7 || formData.password.length > 20) {
      errors.password =
        "Invalid password. (Min. 7 characters & Max 20 characters)";
    }

    // Validasi confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Jika ada error, set validationErrors dan hentikan submit
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Jika tidak ada error, lanjutkan submit
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      id_company: parseInt(formData.id_company),
    };

    console.log("Posting data: ", payload);

    const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXNpaSIsImlhdCI6MTcxOTgwMzM3OCwiZXhwIjoxNzE5ODg5Nzc4fQ.0TlpfJfrvZAaoT6o-ouvUJ4BoVWLRyLVwuSLH-x2pcY`;

    try {
      const response = await axios.post(
        "http://localhost:8080/admin-management/admins",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      Swal.fire({
        title: "Success",
        text: "Add New Admin Success",
        imageUrl: success,
        imageAlt: "success",
      });

      // Reset form dan tutup modal
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        id_company: "",
      });
      setValidationErrors({});
      onClose();
    } catch (error) {
      console.error("Failed to add admin:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
      } else {
        alert("Failed to add admin. Please try again.");
      }
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          Add New Administrator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormField
              label="First Name"
              variant="outlined"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              error={!!validationErrors.first_name}
              helperText={
                validationErrors.first_name ? validationErrors.first_name : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Last Name"
              variant="outlined"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              error={!!validationErrors.last_name}
              helperText={
                validationErrors.last_name ? validationErrors.last_name : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!validationErrors.username}
              helperText={
                validationErrors.username ? validationErrors.username : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Email Address"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email ? validationErrors.email : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              helperText={
                validationErrors.password ? validationErrors.password : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formData.password !== formData.confirmPassword}
              helperText={
                formData.password !== formData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              select
              label="Company Origin"
              variant="outlined"
              name="id_company"
              value={formData.id_company}
              onChange={handleChange}
              error={!!validationErrors.id_company}
              helperText={
                validationErrors.id_company ? validationErrors.id_company : ""
              }
            >
              {companies?.map((company) => (
                <MenuItem key={company.id_company} value={company.id_company}>
                  {company.company_name}
                </MenuItem>
              ))}
            </FormField>
          </Grid>
        </Grid>
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
            color="primary"
            text="white"
            onClick={handleSubmit}
          >
            Add
          </CustomButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAddNewAdmin;
