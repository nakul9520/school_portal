import * as Yup from "yup";

// const onlyCharactersRegx = /^[aA-zZ\s]+$/;
// const onlyNumbersRegx = /^-?[0-9]*$/;
// const fileFolderNameRegx = /^[a-zA-Z0-9-_]+$/;

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is Required"),
  password: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long")
    .required("Password is Required"),
});

export const addEditSchoolValidation = Yup.object().shape({
  school_name: Yup.string().required("School Name cannot be empty"),
  activation_date: Yup.string().required("Activation date is Required"),
  expired_at: Yup.string().required("expired date is Required"),
});

export const addEditSchoolAdminValidation = Yup.object().shape({
  school_id: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required("School Name is Required"),
      })
    )
    .min(1, "At least one name is required"),
  name: Yup.string().required("Name cannot be empty"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is Required"),
  password: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long")
    .required("Password is Required"),
  activation_date: Yup.string().required("Activation date is Required"),
  expired_at: Yup.string().required("Expired date is Required"),
});

export const addEditClassValidation = Yup.object().shape({
  school_name: Yup.string().required("school name cannot be empty"),
  branch_id: Yup.string().required("Branch is Required"),
  class_name: Yup.string().required("Class Name is Required"),
  teacher_email1: Yup.string().email("Enter Valid Email Address"),
  teacher_password1: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long"),
  teacher_email2: Yup.string().email("Enter Valid Email Address"),
  teacher_password2: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long"),
});

export const addEditTeacherValidation = Yup.object().shape({
  // school_id: Yup.string().required("school name cannot be empty"),
  // class_id: Yup.string().required("school name cannot be empty"),
  email: Yup.string()
    .email("Enter Valid Email")
    .required("Email cannot be empty"),
  name: Yup.string().required("Teacher Name is Required"),
  password: Yup.string()
    .trim("Please don't enter a whitespace character")
    .strict(true)
    .min(8, "Password should be at least 8 characters long")
    .required("Password is Required"),
  // code: Yup.string().required("Code is Required"),
  activation_date: Yup.string().required("Activation date is Required"),
  expired_at: Yup.string().required("expired date is Required"),
});

export const addFileTitleValidation = Yup.object().shape({
  book_name: Yup.string().required("Book Title is Required"),
  book_description: Yup.string().required("Book Description is Required"),
  grade_name: Yup.string().required("Grade sub category is Required"),
  pypthemes_name: Yup.string().required("pyptheme sub category is Required"),
  generalthemes_name: Yup.string().required(
    "general theme sub category is Required"
  ),
  objectives_name: Yup.string().required("Objectives sub category is Required"),
  series_name: Yup.string().required("Series sub category is Required"),
});

export const addAudioFileValidation = Yup.object().shape({
  data: Yup.array().of(
    Yup.object().shape({
      file: Yup.string().required("File is Required"),
    })
  ),
});
