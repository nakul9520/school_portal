import * as Yup from "yup";

// const onlyCharactersRegx = /^[aA-zZ\s]+$/;
// const onlyNumbersRegx = /^-?[0-9]*$/;
// const fileFolderNameRegx = /^[a-zA-Z0-9-_]+$/;

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long")
    .required("Password is Required"),
});

export const addEditSchoolValidation = Yup.object().shape({
  school_name: Yup.string().required("school name cannot be empty"),
  user_name: Yup.string().required("User Name cannot be empty"),
  school_admin: Yup.string().required("School admin is required"),
  school_email: Yup.string()
    .email("Please enter valid email")
    .required("Email cannot be empty"),
  school_code: Yup.string().required("school code cannot be empty"),
  activation_date: Yup.string().required("Activation date is required"),
  expired_at: Yup.string().required("expired date is required"),
});
