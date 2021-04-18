import * as yup from "yup";

export const SIGNUP_VALIDATION = yup.object().shape({
  name: yup.string()
    .trim()
    .required("Name is required")
    .min(3, "Should be at least 3 characters"),
  email: yup.string()
    .trim()
    .email("Invalid email")
    .required('Email is required'),
  password: yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters.'),
  confirm: yup.string()
    .trim()
    .required('Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const LOGIN_VALIDATION = yup.object().shape({
  email: yup.string()
    .trim()
    .email("Invalid email")
    .required('Email is required'),
  password: yup.string()
    .trim()
    .required('Password is required')
})
