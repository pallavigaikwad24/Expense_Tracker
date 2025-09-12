import * as yup from "yup";

export const registerSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    ),
});

export const loginSchema = yup.object().shape({
  first_name: yup.string().min(3, "Name must be at least 3 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});

export const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    ),

  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});