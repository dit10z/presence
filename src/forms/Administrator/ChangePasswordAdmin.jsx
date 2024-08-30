import React, { useState } from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { Formik, Form } from "formik";
import validationSchema from "../../validation/adminValidation";
const ChangePasswordAdmin = ({ initialValues, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <CustomInput
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                showPassword={showPassword}
                handleTogglePasswordVisibility={() =>
                  setShowPassword(!showPassword)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                showPassword={showConfirmPassword}
                handleTogglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordAdmin;