import * as Yup from "yup";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .required("Company Name is required")
    .min(3, "Company Name must be at least 3 characters long"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .required("Phone is required"),

  address: Yup.string().required("Address is required"),

  state: Yup.string().required("Province is required"),

  city: Yup.string().required("City is required"),

  zipCode: Yup.string()
    .matches(/^[0-9]+$/, "Zip Code must be digits only")
    .min(5, "Zip Code must be at least 5 digits")
    .max(10, "Zip Code cannot exceed 10 digits")
    .required("Zip Code is required"),

  joiningDate: Yup.date()
    .required("Joining Date is required")
    .max(dayjs(), "Joining Date cannot be in the future"),
});

export default validationSchema;
