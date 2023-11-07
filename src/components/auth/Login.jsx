import React from "react";

import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
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
    dispatch(postLogin({ ...values, user_type: USER_TYPE.admin }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          saveSession(result.data);
          toast.success(result.message);
          navigate("/dashboard/username-and-groups/school");
        } else {
          toast.error(result.message);
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
        component="section"
      >
        <Stack
          className=" login_wrap h-100"
          direction={{ md: "row", xs: "column" }}
        >
          <Box
            className="login_left flex-1 d-flex align-items-center justify-content-center flex-column"
            sx={{ py: 3 }}
          >
            <Box
              component="img"
              src={imageObj.logo}
              sx={{ maxWidth: 280, mb: 2 }}
            />
            <Typography variant="h3" color="primary" className="fw-bolder">
              Superadmin Dashboard
            </Typography>
          </Box>

          <Box className="login_form login_right flex-1">
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
                <form onSubmit={handleSubmit} className="blue_bg">
                  <Grid container className="justify-content-center gap-3">
                    <Grid item xs={11} sm={9} md={8}>
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
                    <Grid item xs={11} sm={9} md={8}>
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
              )}
            </Formik>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
