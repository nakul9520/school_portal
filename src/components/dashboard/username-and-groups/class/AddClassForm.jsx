import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
// import * as Yup from "yup";

const AddClassForm = () => {
  const theme = useTheme();

  // const schema = Yup.object().shape({
  //   schoolName: Yup.string()
  //     .min(8, "school name should be at least 8 characters long")
  //     .required("school name cannot be empty"),
  //   schoolAdministrator: Yup.string()
  //     .min(8, "school Administrator should be at least 8 characters long")
  //     .required("school administrator cannot be empty"),
  //   email: Yup.string()
  //     .email("Please enter valid email")
  //     .required("Email cannot be empty"),
  //   password: Yup.string()
  //     .min(8, "Password should be at least 8 characters long")
  //     .required("Password cannot be empty"),
  //   activationdate: Yup.string()
  //     .min(8, "school Administrator should be at least 8 characters long")
  //     .required("school administrator cannot be empty"),
  //   lcensedate: Yup.string()
  //     .min(8, "school Administrator should be at least 8 characters long")
  //     .required("school administrator cannot be empty"),
  // });

  const formik = useFormik({
    initialValues: {
      className: "",
      teacherOne: "",
      teacherTwo: "",
      teacherOneEmail: "",
      teacherTwoEmail: "",
      teacherOneCodes: "",
      teacherTwoCodes: "",
      numberofStudents: "",
    },
    // validationSchema: schema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="body1" color="secondary.disabled" className="mb-4">
          Sınıf Ekle
        </Typography>

        <form onSubmit={formik.handleSubmit} className="h-100">
          <Box className="custom_form border">
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Sınıf Adı
              </Typography>
              <TextField
                name="className"
                value={formik.values.className}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="className"
                error={
                  formik.errors.className && formik.touched.className
                    ? true
                    : false
                }
                helperText={
                  formik.errors.className && formik.touched.className
                    ? formik.errors.className
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 1
              </Typography>
              <TextField
                name="teacherOne"
                value={formik.values.teacherOne}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherOne"
                error={
                  formik.errors.teacherOne && formik.touched.teacherOne
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherOne && formik.touched.teacherOne
                    ? formik.errors.teacherOne
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 1 E-mail
              </Typography>
              <TextField
                name="teacherOneEmail"
                value={formik.values.teacherOneEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherOneEmail"
                error={
                  formik.errors.teacherOneEmail &&
                  formik.touched.teacherOneEmail
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherOneEmail &&
                  formik.touched.teacherOneEmail
                    ? formik.errors.teacherOneEmail
                    : null
                }
              />
            </Box>{" "}
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 1 Şifre
              </Typography>
              <TextField
                name="teacherOneCodes"
                value={formik.values.teacherOneCodes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherOneCodes"
                error={
                  formik.errors.teacherOneCodes &&
                  formik.touched.teacherOneCodes
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherOneCodes &&
                  formik.touched.teacherOneCodes
                    ? formik.errors.teacherOneCodes
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 2
              </Typography>
              <TextField
                name="teacherTwo"
                value={formik.values.teacherTwo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherTwo"
                error={
                  formik.errors.teacherTwo && formik.touched.teacherTwo
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherTwo && formik.touched.teacherTwo
                    ? formik.errors.teacherTwo
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 2 E-mail
              </Typography>
              <TextField
                name="teacherTwoEmail"
                value={formik.values.teacherTwoEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherTwoEmail"
                error={
                  formik.errors.teacherTwoEmail &&
                  formik.touched.teacherTwoEmail
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherTwoEmail &&
                  formik.touched.teacherTwoEmail
                    ? formik.errors.teacherTwoEmail
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğretmen 2 Şifre
              </Typography>
              <TextField
                name="teachertwoCodes"
                value={formik.values.teachertwoCodes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teachertwoCodes"
                error={
                  formik.errors.teachertwoCodes &&
                  formik.touched.teachertwoCodes
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teachertwoCodes &&
                  formik.touched.teachertwoCodes
                    ? formik.errors.teachertwoCodes
                    : null
                }
              />
            </Box>
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Öğrenci Sayısı
              </Typography>
              <TextField
                name="numberofStudents"
                value={formik.values.numberofStudents}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="numberofStudents"
                error={
                  formik.errors.numberofStudents &&
                  formik.touched.numberofStudents
                    ? true
                    : false
                }
                helperText={
                  formik.errors.numberofStudents &&
                  formik.touched.numberofStudents
                    ? formik.errors.numberofStudents
                    : null
                }
              />
            </Box>
          </Box>
          <Box className="text-right mt-3">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className="rounded-0"
            >
              Kaydet
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddClassForm;
