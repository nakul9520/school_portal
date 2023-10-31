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
