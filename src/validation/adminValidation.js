import * as Yup from "yup";
import messages from "../constants/messages";
const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Username is required"),
  idcompany: Yup.string().required("Company is required"),
  password: Yup.string().when("activeTab", {
    is: 1,
    then: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .when("activeTab", {
      is: 1,
      then: Yup.string().required("Confirm Password is required"),
    }),
});

export default validationSchema;
