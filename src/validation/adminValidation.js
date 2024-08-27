import * as Yup from "yup";
import messages from "../constants/messages";
const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required(messages.firstname.required)
    .min(2, messages.firstname.minLength)
    .max(50, messages.firstname.maxLength),
  lastname: Yup.string()
    .required(messages.lastname.required)
    .min(2, messages.lastname.minLength)
    .max(50, messages.lastname.maxLength),
  email: Yup.string()
    .email(messages.email.invalid)
    .required(messages.email.required),
  username: Yup.string()
    .required(messages.username.required)
    .min(7, messages.username.minLength)
    .max(20, messages.username.maxLength),
  idcompany: Yup.string().required(messages.idcompany.required),
  password: Yup.string().when("activeTab", {
    is: 1,
    then: Yup.string()
      .min(8, messages.password.minLength)
      .max(50, messages.password.maxLength)
      .required(messages.password.required),
  }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], messages.confirmPassword.notMatch)
    .when("activeTab", {
      is: 1,
      then: Yup.string().required(messages.confirmPassword.required),
    }),
});

export default validationSchema;
