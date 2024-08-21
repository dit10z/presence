import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Swal from "sweetalert2";
import success from "../../assets/icons/success.png";
import { useFormik } from "formik";
import validationSchema from "../../validation/companyValidation";
import { useDispatch, useSelector } from "react-redux";
import { detailCompany, editCompany } from "../../redux/slices/companySlice";
import instance from "../../services/axiosInstance";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Box)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "20px",
  width: "750px", // Adjust the width according to your design
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});

const FormField = styled(TextField)({
  width: "100%",
});

const FormFieldDate = styled(DatePicker)({
  width: "100%",
});

const ModalEditCompany = ({ open, onClose, companyId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    joiningDate: dayjs(),
  });

  const detailCompany = async (id) => {
    try {
      const response = await instance.get(
        `/company-management/companies/${id}`
      );
      const data = response.data.data;
      setCompanyDetails({
        companyName: data.company_name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        state: data.state || "",
        city: data.city || "",
        zipCode: data.zip_code || "",
        joiningDate: dayjs(data.joining_date) || dayjs(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (companyId) {
      detailCompany(companyId);
    }
  }, [companyId]);

  const formik = useFormik({
    initialValues: {
      companyName: companyDetails.companyName,
      email: companyDetails.email,
      phone: companyDetails.phone,
      address: companyDetails.address,
      state: companyDetails.state,
      city: companyDetails.city,
      zipCode: companyDetails.zipCode,
      joiningDate: companyDetails.joiningDate,
    },
    enableReinitialize: true,
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
      console.log(requestData);
      Swal.fire({
        title: "Success",
        text: "Update Company Data Success",
        imageUrl: success,
        imageAlt: "success",
      });

      try {
        dispatch(editCompany({ id: companyId, data: requestData }));
        console.log("Company Data Update Success");
      } catch (error) {
        console.log("Error Updating Company Data", error);
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
          Edit Company
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
                renderInput={(params) => <TextField {...params} />}
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
              Save
            </Button>
          </Box>
        </form>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalEditCompany;
