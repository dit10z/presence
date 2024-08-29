import React from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { Formik, Form } from "formik";
import validationSchema from "../../validation/adminValidation";
const ChangePasswordAdmin = (initialValues, onSubmit) => {
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
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              showPassword={showNewPassword}
              handleTogglePasswordVisibility={handleToggleNewPasswordVisibility}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              label="Re-type New Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>;
};

export default ChangePasswordAdmin;
