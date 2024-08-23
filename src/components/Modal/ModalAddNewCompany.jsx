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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";
import { useDispatch } from "react-redux";
import { addNewCompany } from "../../redux/slices/companySlice";
import { useFormik } from "formik";
import validationSchema from "../../validation/companyValidation";

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

const FormFieldDate = styled(DatePicker)({
  width: "100%",
});

const ModalAddNewCompany = ({ open, onClose }) => {
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
      joiningDate: dayjs(),
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      const formattedJoiningDate = dayjs(values.joiningDate).format(
        "YYYY-MM-DD"
      );
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

      try {
        dispatch(addNewCompany(requestData));
        Swal.fire({
          title: "Success",
          text: "Add New Company Success",
          imageUrl: success,
          imageAlt: "success",
        });
      } catch (error) {
        console.log("Error Adding New Company", error);
      } finally {
        resetForm();
        onClose();
      }
    },
  });

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h6" mb={8}>
          Add New Company
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormField
                label="Company Name"
                variant="outlined"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
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
                label="Phone"
                variant="outlined"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                label="Address"
                variant="outlined"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="State"
                variant="outlined"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="City"
                variant="outlined"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={6}>
              <FormField
                label="Zip Code"
                variant="outlined"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>
            <Grid item xs={6}>
              <FormFieldDate
                label="Joining Date"
                name="joiningDate"
                value={formik.values.joiningDate}
                onChange={(value) => formik.setFieldValue("joiningDate", value)}
                error={
                  formik.touched.joiningDate &&
                  Boolean(formik.errors.joiningDate)
                }
                helperText={
                  formik.touched.joiningDate && formik.errors.joiningDate
                }
                slots={{
                  textField: TextField, // Gunakan TextField sebagai komponen slot
                }}
                slotProps={{
                  textField: {
                    fullWidth: true, // Atur TextField untuk menggunakan lebar penuh
                    error:
                      formik.touched.joiningDate &&
                      Boolean(formik.errors.joiningDate),
                    helperText:
                      formik.touched.joiningDate && formik.errors.joiningDate,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box mt={6} display="flex" justifyContent="flex-end">
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ marginRight: 1 }}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAddNewCompany;
