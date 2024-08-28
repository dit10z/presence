import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import success from "../../../public/icons/success.png";
import { addAdmin } from "../../redux/slices/adminsSlice";
import { fetchCompanies } from "../../redux/slices/companySlice";
import { useFormik } from "formik";
import validationSchema from "../../validation/adminValidation";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput"; // Import CustomInput

const AddAdminForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      id_company: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const requestData = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        id_company: values.id_company,
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
          text:
            error.response?.data?.message ||
            "Failed to add admin. Please try again.",
          icon: "error",
        });
      }
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Add New Administrator"
      onSubmit={formik.handleSubmit}
      titleButton="Add"
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomInput
            label="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            showPassword={showPassword}
            handleTogglePasswordVisibility={() =>
              setShowPassword(!showPassword)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            showPassword={showConfirmPassword}
            handleTogglePasswordVisibility={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            label="Company Origin"
            name="id_company"
            type="select"
            value={formik.values.id_company}
            onChange={formik.handleChange}
            error={formik.touched.id_company && Boolean(formik.errors.id_company)}
            helperText={formik.touched.id_company && formik.errors.id_company}
            options={companies?.map((company) => ({
              value: company.id_company,
              label: company.company_name,
            }))}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default AddAdminForm;
