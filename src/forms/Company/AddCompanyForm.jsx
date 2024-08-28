import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import success from "../../../public/icons/success.png";
import { useDispatch } from "react-redux";
import { addNewCompany } from "../../redux/slices/companySlice";
import { useFormik } from "formik";
import validationSchema from "../../validation/companyValidation";
import CustomModal from "../../components/CustomModal";
import CustomInput from "../../components/CustomInput";

const AddCompanyForm = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      zipCode: "",
      joiningDate: null,
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formattedJoiningDate = values.joiningDate
        ? dayjs(values.joiningDate, "MM-DD-YYYY").format("YYYY-MM-DD")
        : null;
      const requestData = {
        company_name: values.companyName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        state: values.state,
        city: values.city,
        zip_code: values.zipCode,
        joining_date: formattedJoiningDate,
      };
      console.log(requestData);
      Swal.fire({
        title: "Success",
        text: "Add New Company Success",
        imageUrl: success,
        imageAlt: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          // Refresh data setelah berhasil menambah company baru
          window.location.reload();
        }
      });

      try {
        dispatch(addNewCompany(requestData));
      } catch (error) {
        console.log("Error Adding New Company", error);
      } finally {
        resetForm();
        onClose();
      }
    },
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Add New Company"
      onSubmit={formik.handleSubmit}
      titleButton="Add"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            label="Company Name"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
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
            label="Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            label="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="State"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Zip Code"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomInput
            label="Joining Date"
            type="date"
            value={formik.values.joiningDate}
            onChange={(date) => formik.setFieldValue("joiningDate", date)}
            error={formik.touched.joiningDate && formik.errors.joiningDate}
            helperText={formik.touched.joiningDate && formik.errors.joiningDate}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default AddCompanyForm;
