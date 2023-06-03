import * as Yup from "yup";

export const logInSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(24, "Too Long!")
    .trim()
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(32, "Too Long!")
    .trim()
    .required("Required"),
});

export const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(24, "Too Long!")
    .trim()
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(32, "Too Long!")
    .trim()
    .required("Required"),
  passwordRepeat: Yup.string()
    .min(2, "Too Short!")
    .max(32, "Too Long!")
    .trim()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
