import React from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { Formik, Form } from "formik";
import validationSchema from "../../validation/adminValidation";

const EditAdminForm = ({ initialValues, dataCompanyMaster, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
      onChange={() => {
        setDataAdmin();
      }}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={6}>
              <CustomInput
                label="First Name"
                variant="outlined"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                label="Last Name"
                variant="outlined"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                error={touched.last_name && Boolean(errors.last_name)}
                helperText={touched.last_name && errors.last_name}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                label="Username"
                variant="outlined"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Company Origin"
                name="id_company"
                type="select"
                value={values.id_company}
                onChange={handleChange}
                error={touched.id_company && Boolean(errors.id_company)}
                helperText={touched.id_company && errors.id_company}
                options={dataCompanyMaster?.map((company) => ({
                  value: company.id_company,
                  label: company.company_name,
                }))}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EditAdminForm;
