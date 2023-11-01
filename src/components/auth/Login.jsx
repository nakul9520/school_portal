import React from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { imageObj } from "services/images";
import { StyledTextField } from "styles/ComponentStyle";
import { loginValidation } from "services/validations";
import { useDispatch } from "react-redux";
import { postLogin } from "redux/store/slice/auth/authSlice";
import { USER_TYPE } from "services/constant";
import { saveSession } from "services/utiles";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (values, action) => {
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("email", values.email);
    // urlencoded.append("password", values.password);
    dispatch(postLogin({ ...values, user_type: USER_TYPE.admin }))
      .unwrap()
      .then((result) => {
        console.log(result);
        if (result.success) {
          saveSession(result.data);
          toast.success(result.message);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidation}
          onSubmit={(value, action) => {
            handleLogin(value, action);
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <Grid container className="h-100 align-items-center">
              <Grid item xs={12} md={6}>
                <Box
                  className="d-flex align-items-center justify-content-center flex-column"
                  sx={{ py: 10 }}
                >
                  <Box
                    component="img"
                    src={imageObj.logo}
                    sx={{ maxWidth: 380, mb: 2 }}
                  />
                  <Typography
                    variant="h3"
                    color="primary"
                    className="fw-bolder"
                  >
                    Superadmin Dashboard
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className="h-100 align-item-center">
                <Box className="blue_bg">
                  <form onSubmit={handleSubmit} className="login_form h-100">
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={2}
                      className="justify-content-center"
                    >
                      <Grid item xs={8}>
                        <TextField
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Kullanıcı Adı"
                          sx={StyledTextField}
                          InputProps={{
                            autoComplete: "new-password", // Try using this for login-related fields
                          }}
                          fullWidth
                          error={errors.email && touched.email ? true : false}
                          helperText={
                            errors.email && touched.email ? errors.email : null
                          }
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Şifre"
                          sx={StyledTextField}
                          fullWidth
                          type="password"
                          error={
                            errors.password && touched.password ? true : false
                          }
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : null
                          }
                        />
                      </Grid>
                      <Grid item xs={12} className="text-center">
                        <Button
                          variant="contained"
                          type="submit"
                          color="secondary"
                          className="my-3"
                        >
                          Giriş
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
