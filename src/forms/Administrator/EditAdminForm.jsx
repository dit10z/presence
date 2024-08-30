import React from "react";
import { Grid } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import { Formik, Form } from "formik";
import validationSchema from "../../validation/adminValidation";

const EditAdminForm = ({
  initialValues, // Pass initial values as a prop
  dataCompanyMaster,
  onSubmit,
  setInitialValues, // Function to set initial values externally
}) => {
  const handleInputChange = (e, setInitialValues, handleChange, values) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize={true} // Allow reinitialization of the form when initialValues change
    >
      {({ values, handleChange, touched, errors }) => (
        <Form>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={6}>
              <CustomInput
                label="First Name"
                variant="outlined"
                name="firstname"
                value={values.first_name}
                // onChange={(e) =>
                //   handleInputChange(e, setInitialValues, handleChange, values)
                // }
                onChange={(e) => handleChange(e)}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                label="Last Name"
                variant="outlined"
                name="lastname"
                value={values.last_name}
                // onChange={(e) =>
                //   handleInputChange(e, setInitialValues, handleChange, values)
                // }
                onChange={(e) => handleChange(e)}
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
                // onChange={(e) =>
                //   handleInputChange(e, setInitialValues, handleChange, values)
                // }
                onChange={(e) => handleChange(e)}
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
                // onChange={(e) =>
                //   handleInputChange(e, setInitialValues, handleChange, values)
                // }
                onChange={(e) => handleChange(e)}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                label={values.company_name}
                name="id_company"
                type="select"
                value={values.id_company}
                // onChange={(e) =>
                //   handleInputChange(e, setInitialValues, handleChange, values)
                // }
                onChange={(e) => handleChange(e)}
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
