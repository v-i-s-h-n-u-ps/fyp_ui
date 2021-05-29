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

export const FORGOT_PASSWORD_VALIDATION = yup.object().shape({
  email: yup.string()
    .trim()
    .email("Invalid email")
    .required('Email is required'),
  otp: yup.number()
    .when("isOtpSent", {
      is: true,
      then: yup.number()
        .required('Otp is required')
    }),
  password: yup.string()
    .when("isOtpSent", {
      is: true,
      then: yup.string()
        .trim()
        .required('Password is required')
    }),
  confirm: yup.string()
    .when("isOtpSent", {
      is: true,
      then: yup.string()
        .trim()
        .required('Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    })
})

export const STUDENT_VALIDATION = yup.object().shape({
  university: yup.string()
    .trim()
    .required('University is required'),
  dateOfBirth: yup.date()
    .required('Date of birth is required'),
  gender: yup.string()
    .trim()
    .required('Gender is required'),
  about: yup.string()
    .trim()
    .required('Write something about you')
    .max(300, "Write in less than 300 characters"),
  facebook: yup.string(),
  resumeUrl: yup.string()
    .trim()
    .required('Please upload a resume'),
  linkedIn: yup.string(),
  gmail: yup.string(),
  twitter: yup.string(),
  categories: yup.array()
    .of(yup.string())
    .required("Select at least one category")
})

export const PROJECT_VALIDATION = yup.object().shape({
  name: yup.string()
    .trim()
    .required('name is required'),
  description: yup.string()
    .trim()
    .required('Description is required'),
  location: yup.string()
    .trim()
    .required('Select a university'),
  startDate: yup.date()
    .required('Start date is required'),
  endDate: yup.date()
    .required('End date is required'),
  categories: yup.array()
    .of(yup.string())
    .required("Select at least one category")
})

export const TASK_VALIDATION = yup.object().shape({
  task: yup.string()
    .trim()
    .required('name is required'),
  type: yup.string()
    .trim()
    .required('Select a university'),
  dueDate: yup.date()
    .required('Start date is required'),

})

export const FORUM_VALIDATION = yup.object().shape({
  name: yup.string()
    .trim()
    .required('Name is required')
    .max(250, "Can only 250 characters"),
  description: yup.string()
    .trim()
    .required('Description is required'),
  categories: yup.array()
    .of(yup.string())
    .required("Select at least one category")
})
