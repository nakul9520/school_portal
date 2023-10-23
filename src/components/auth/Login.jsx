import React from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { imageObj } from "services/images";
import { StyledTextField } from "styles/ComponentStyle";

const Login = () => {
  const navigate = useNavigate();
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
      navigate("/dashboard/school");
    },
  });

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${imageObj.mainbg})`,
          backgroundColor: "primary.contrastText",
          backgroundPosition: "left top, right bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Grid container className="h-100 align-items-center">
          <Grid item xs={6}>
            <Box className="d-flex align-items-center justify-content-center flex-column">
              <Box
                component="img"
                src={imageObj.logo}
                sx={{ maxWidth: 380, mb: 2 }}
              />
              <Typography variant="h3" color="primary" className="fw-bolder">
                Superadmin Dashboard
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className="h-100 align-item-center">
            <Box className="blue_bg">
              <form onSubmit={formik.handleSubmit} className="login_form h-100">
                <Grid
                  container
                  item
                  xs={12}
                  spacing={2}
                  className="justify-content-center"
                >
                  <Grid item xs={8}>
                    <Box className="login_form_input">
                      <TextField
                        name="schoolName"
                        value={formik.values.schoolName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Kullanıcı Adı"
                        sx={StyledTextField}
                        InputProps={{
                          autoComplete: "new-password", // Try using this for login-related fields
                        }}
                        fullWidth
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
                  </Grid>
                  <Grid item xs={8}>
                    <Box className="login_form_input">
                      <TextField
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Şifre"
                        sx={StyledTextField}
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
                  </Grid>
                  <Grid item xs={12}>
                    <Box className="text-center mt-3">
                      <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        className="w-25"
                      >
                        Giriş
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
