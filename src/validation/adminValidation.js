import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters long")
        .max(50, "First name cannot exceed 50 characters long"),

    lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters long")
        .max(50, "Last name cannot exceed 50 characters long"),

    username: Yup.string()
        .required("Username is required")
        .min(7, "Username must be at least 7 characters long")
        .max(20, "Username cannot exceed 20 characters long"),

    email: Yup.string()
        .required("Email is required")
        .email("Invalid email address")
})