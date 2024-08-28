import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import validationSchema from "../../validation/companyValidation";
import { useDispatch } from "react-redux";
import { editCompany } from "../../redux/slices/companySlice";
import instance from "../../services/axiosInstance";
import CustomModal from "../../components/CustomModal";
import Swal from "sweetalert2";
import success from "../../../public/icons/success.png";
import CustomInput from "../../components/CustomInput";

const EditCompanyForm = ({ open, onClose, companyId }) => {
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
      console.log(requestData);
      Swal.fire({
        title: "Success",
        text: "Update Company Data Success",
        imageUrl: success,
        imageAlt: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          // Refresh data setelah berhasil edit data company
          window.location.reload();
        }
      });
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
          <CustomInput
            label="Company Name"
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
          <CustomInput
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
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
            fullWidth
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
            fullWidth
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
            fullWidth
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
            fullWidth
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
            fullWidth
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

export default EditCompanyForm;
