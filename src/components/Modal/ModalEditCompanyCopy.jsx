import React, { useEffect, useState } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import validationSchema from "../../validation/companyValidation";
import { useDispatch } from "react-redux";
import { editCompany } from "../../redux/slices/companySlice";
import instance from "../../services/axiosInstance";
import CustomModal from "../CustomModal";

const ModalEditCompanyCopy = ({ open, onClose, companyId }) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (companyId) {
      const fetchCompanyDetails = async (id) => {
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

      fetchCompanyDetails(companyId);
    }
  }, [companyId]);

  const formik = useFormik({
    initialValues: companyDetails,
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

      try {
        await dispatch(editCompany({ id: companyId, data: requestData }));
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
    <CustomModal
      open={open}
      onClose={onClose}
      title="Edit Company"
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Company Name"
            variant="outlined"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email Address"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            variant="outlined"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Zip Code"
            variant="outlined"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Joining Date"
            value={formik.values.joiningDate}
            onChange={(value) => formik.setFieldValue("joiningDate", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={
                  formik.touched.joiningDate &&
                  Boolean(formik.errors.joiningDate)
                }
                helperText={
                  formik.touched.joiningDate && formik.errors.joiningDate
                }
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
            )}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ModalEditCompanyCopy;
