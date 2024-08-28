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
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";
import { addAdmin } from "../../redux/slices/adminsSlice";
import { fetchCompanies } from "../../redux/slices/companySlice";
import { useFormik } from "formik";
import validationSchema from "../../validation/adminValidation";

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
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  useEffect(() => {
    if (open) {
      dispatch(fetchCompanies());
    }
  }, [open, dispatch]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      id_company: "", // Pastikan konsisten dengan field id_company
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const requestData = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
        id_company: parseInt(values.id_company), // Parsing ke integer seperti pada contoh pertama
      };

      try {
        await dispatch(addAdmin(requestData)).unwrap();
        Swal.fire({
          title: "Success",
          text: "Add New Admin Success",
          imageUrl: success,
          imageAlt: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        resetForm();
        onClose();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to add admin. Please try again.",
          icon: "error",
        });
      }
    },
  });

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          Add New Administrator
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormField
                label="First Name"
                variant="outlined"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Username"
                variant="outlined"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Email Address"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Confirm Password"
                type="password"
                variant="outlined"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                select
                label="Company Origin"
                variant="outlined"
                name="id_company"
                value={formik.values.id_company}
                onChange={formik.handleChange}
                error={formik.touched.id_company && Boolean(formik.errors.id_company)}
                helperText={formik.touched.id_company && formik.errors.id_company}
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
              type="submit"
            >
              Add
            </CustomButton>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAddNewAdmin;
