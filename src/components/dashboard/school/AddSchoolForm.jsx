import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
// import * as Yup from "yup";

const AddSchoolForm = () => {
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
      schoolAdministrator: "",
      email: "",
      password: "",
      activationdate: "",
      lcensedate: "",
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
          Okul Ekle
        </Typography>

        <form onSubmit={formik.handleSubmit} className="h-100">
          <Box className="custom_form border">
            {/* <Grid container spacing={2} sx={{ my: 3 }}>
            <Grid item xs={12}> */}
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
            {/* </Grid>
            <Grid item xs={12}> */}
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Okul Yöneticisi
              </Typography>
              <TextField
                name="schoolAdministrator"
                value={formik.values.schoolAdministrator}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="schoolAdministrator"
                
                error={
                  formik.errors.schoolAdministrator &&
                  formik.touched.schoolAdministrator
                    ? true
                    : false
                }
                helperText={
                  formik.errors.schoolAdministrator &&
                  formik.touched.schoolAdministrator
                    ? formik.errors.schoolAdministrator
                    : null
                }
              />
            </Box>
            {/* </Grid>
          </Grid> */}
            <Box className="custom_form_row d-flex align-items-center border-bottom">
              <Typography
                variant="body2"
                color="secondary.disabled"
                className="ms-4 w-25"
              >
                Email
              </Typography>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="email"
                error={
                  formik.errors.email && formik.touched.email ? true : false
                }
                helperText={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
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
                Kullanıcı Adı
              </Typography>
              <TextField
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="username"
                error={
                  formik.errors.username && formik.touched.username
                    ? true
                    : false
                }
                helperText={
                  formik.errors.username && formik.touched.username
                    ? formik.errors.username
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
                name="activationdate"
                value={formik.values.activationdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="activationdate"
                error={
                  formik.errors.activationdate && formik.touched.activationdate
                    ? true
                    : false
                }
                helperText={
                  formik.errors.activationdate && formik.touched.activationdate
                    ? formik.errors.activationdate
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
                name="lcensedate"
                value={formik.values.lcensedate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                type="lcensedate"
                error={
                  formik.errors.lcensedate && formik.touched.lcensedate
                    ? true
                    : false
                }
                helperText={
                  formik.errors.lcensedate && formik.touched.lcensedate
                    ? formik.errors.lcensedate
                    : null
                }
              />
            </Box>
          </Box>
          <Box className="text-right mt-3">
            <Button variant="contained" type="submit" color="primary" className="rounded-0">
              Kaydet
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddSchoolForm;
