import React, { useEffect } from "react";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { Formik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEditTeacherValidation } from "services/validations";

import {
  addEditUsers,
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import { USER_TYPE } from "services/constant";

const AddTeacherForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const userData = state ?? {};

  const { schoolListInfo, loading, classBySchoolList } = useSelector(
    (state) => state.users
  );
  const schoolList = schoolListInfo.data ?? [];

  console.log("userData", userData);

  const handleAddEdit = (values, action) => {
    console.log("edit");
    const data = {
      ...values,
      user_type: USER_TYPE.teacher,
      id: userData.id ? userData.id : "",
      school_id: values.school_id.id,
      class_id: values.class_id.id,
      activation_date: moment(values.activation_date).format("YYYY-MM-DD"),
      expired_at: moment(values.expired_at).format("YYYY-MM-DD"),
    };
    console.log("data", data);
    dispatch(addEditUsers(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          navigate("/dashboard/username-and-groups/teacher");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    const payload = {
      search: "",
      per_page: "",
      page: 0,
    };

    dispatch(getSchoolList(payload));
  }, [dispatch]);

  const handleSchoolChange = (data) => {
    dispatch(getClassesBySchool(data.id));
  };

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
          Öğretmen Ekle
        </Typography>
        <Formik
          initialValues={{
            school_id: userData.school_id ?? "",
            class_id: userData.class_id ?? "",
            email: userData.email ?? "",
            name: userData.name ?? "",
            password: userData.password ?? "",
            code: userData.code ?? "",
            activation_date: moment(userData.activation_date) ?? moment(),
            expired_at: moment(userData.expired_at) ?? moment(),
          }}
          validationSchema={addEditTeacherValidation}
          onSubmit={(value, action) => {
            handleAddEdit(value, action);
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            handleBlur,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="h-100">
              {console.log("values>>", values)}
              <Box className="custom_form border">
                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    Okul Adı
                  </Typography>
                  <Autocomplete
                    getOptionLabel={(option) => option.school_name ?? ""}
                    options={schoolList}
                    name="school_id"
                    value={values.school_id}
                    isOptionEqualToValue={(option, value) => {
                      if (value === "" || option.id === value.id) {
                        return true;
                      }
                    }}
                    onChange={(e, value) => {
                      setFieldValue("school_id", value);
                      handleSchoolChange(value);
                      setFieldValue("class_id", value);
                    }}
                    autoHighlight
                    disableClearable
                    noOptionsText="No Data"
                    loading={loading}
                    className="w-100"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        name="school_id"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        error={
                          errors.school_id && touched.school_id ? true : false
                        }
                        helperText={
                          errors.school_id && touched.school_id
                            ? errors.school_id
                            : null
                        }
                      />
                    )}
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
                  <Autocomplete
                    getOptionLabel={(option) => option.class_name ?? ""}
                    options={classBySchoolList}
                    name="school_id"
                    value={values.class_id}
                    isOptionEqualToValue={(option, value) => {
                      if (value === "" || option.id === value.id) {
                        return true;
                      }
                    }}
                    onChange={(e, value) => {
                      setFieldValue("class_id", value);
                    }}
                    autoHighlight
                    disableClearable
                    noOptionsText="No Data"
                    loading={loading}
                    className="w-100"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        name="class_id"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        error={
                          errors.school_id && touched.school_id ? true : false
                        }
                        helperText={
                          errors.school_id && touched.school_id
                            ? errors.school_id
                            : null
                        }
                      />
                    )}
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="name"
                    error={errors.name && touched.name ? true : false}
                    helperText={
                      errors.name && touched.name ? errors.name : null
                    }
                  />
                </Box>

                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    E-mail
                  </Typography>
                  <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="email"
                    error={errors.email && touched.email ? true : false}
                    helperText={
                      errors.email && touched.email ? errors.email : null
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
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="password"
                    error={errors.password && touched.password ? true : false}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
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
                  <MobileDatePicker
                    name="activation_date"
                    className="w-100"
                    value={values.activation_date}
                    onChange={(newValue) =>
                      setFieldValue("activation_date", newValue)
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
                  <MobileDatePicker
                    className="w-100"
                    name="expired_at"
                    value={values.expired_at}
                    label=" "
                    onChange={(newValue) => {
                      setFieldValue("expired_at", newValue);
                    }}
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
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddTeacherForm;
