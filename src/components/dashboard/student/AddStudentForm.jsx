import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
// import * as Yup from "yup";

const AddStudentForm = () => {
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
      schoolName: "",
      teacherName: "",
      userName: "",
      password: "",
      classes: "",
      activationDate: "",
      licenseExpirationDate: "",
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
          Öğrenci Ekle
        </Typography>

        <form onSubmit={formik.handleSubmit} className="h-100">
          <Box className="custom_form border">
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Okul Adı
              </Typography>
              <TextField
                name="schoolName"
                value={formik.values.schoolName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="schoolName"
                error={
                  formik.errors.schoolName && formik.touched.schoolName
                    ? true
                    : false
                }
                helperText={
                  formik.errors.schoolName && formik.touched.schoolName
                    ? formik.errors.schoolName
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
                Sınıfları
              </Typography>
              <TextField
                name="classes"
                value={formik.values.classes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="classes"
                error={
                  formik.errors.classes && formik.touched.classes ? true : false
                }
                helperText={
                  formik.errors.classes && formik.touched.classes
                    ? formik.errors.classes
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
                Öğretmen Adı
              </Typography>
              <TextField
                name="teacherName"
                value={formik.values.teacherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="teacherName"
                error={
                  formik.errors.teacherName && formik.touched.teacherName
                    ? true
                    : false
                }
                helperText={
                  formik.errors.teacherName && formik.touched.teacherName
                    ? formik.errors.teacherName
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
                Kullanıcı Adı
              </Typography>
              <TextField
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="userName"
                error={
                  formik.errors.userName && formik.touched.userName
                    ? true
                    : false
                }
                helperText={
                  formik.errors.userName && formik.touched.userName
                    ? formik.errors.userName
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
                Şifre
              </Typography>
              <TextField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="password"
                error={
                  formik.errors.password && formik.touched.password
                    ? true
                    : false
                }
                helperText={
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
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
                Aktivasyon Tarihi
              </Typography>
              <TextField
                name="activationDate"
                value={formik.values.activationDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="activationDate"
                error={
                  formik.errors.activationDate && formik.touched.activationDate
                    ? true
                    : false
                }
                helperText={
                  formik.errors.activationDate && formik.touched.activationDate
                    ? formik.errors.activationDate
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
                Lisans Sonlanma Tarihi
              </Typography>
              <TextField
                name="licenseExpirationDate"
                value={formik.values.licenseExpirationDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="licenseExpirationDate"
                error={
                  formik.errors.licenseExpirationDate &&
                  formik.touched.licenseExpirationDate
                    ? true
                    : false
                }
                helperText={
                  formik.errors.licenseExpirationDate &&
                  formik.touched.licenseExpirationDate
                    ? formik.errors.licenseExpirationDate
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

export default AddStudentForm;
