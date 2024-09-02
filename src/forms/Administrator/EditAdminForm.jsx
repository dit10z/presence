import React from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { Formik, Form } from "formik";
import validationSchema from "../../validation/adminValidation";

const EditAdminForm = ({
  values,
  dataCompanyMaster,
  handleChange,
  touched,
  errors,
  handleBlur,
}) => {
  return (
    <Grid container spacing={3} mt={3}>
      <Grid item xs={6}>
        <CustomInput
          label="First Name"
          variant="outlined"
          name="first_name" // Make sure it matches initialValues key
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.first_name}
          helperText={errors.first_name}
          // error={touched.first_name && Boolean(errors.first_name)}
          // helperText={touched.first_name && errors.first_name}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          label="Last Name"
          variant="outlined"
          name="last_name" // Make sure it matches initialValues key
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.last_name}
          helperText={errors.last_name}
          // error={touched.last_name && Boolean(errors.last_name)}
          // helperText={touched.last_name && errors.last_name}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          label="Username"
          variant="outlined"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          helperText={errors.username}
          // error={touched.username && Boolean(errors.username)}
          // helperText={touched.username && errors.username}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          label="Email"
          variant="outlined"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          helperText={errors.email}
          // error={touched.email && Boolean(errors.email)}
          // helperText={touched.email && errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          label={values.company_name}
          name="id_company"
          type="select"
          value={values.id_company}
          onChange={handleChange}
          error={errors.id_company}
          helperText={errors.id_company}
          // error={touched.id_company && Boolean(errors.id_company)}
          // helperText={touched.id_company && errors.id_company}
          options={dataCompanyMaster?.map((company) => ({
            value: company.id_company,
            label: company.company_name,
          }))}
        />
      </Grid>
    </Grid>
  );
};

export default EditAdminForm;
