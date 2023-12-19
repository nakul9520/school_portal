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
import { map } from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addEditSchoolAdmin,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import BackButton from "components/common/BackButton";
import { addEditSchoolAdminValidation } from "services/validations";

const AddSchoolAdminForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const schoolAdminData = state ?? {};

  const { schoolListInfo, loading } = useSelector((state) => state.users);
  const schoolList = schoolListInfo.data ?? [];

  useEffect(() => {
    const payload = {
      payload: {
        search: "",
        per_page: "",
      },
      page: 0,
    };
    dispatch(getSchoolList(payload));
  }, [dispatch]);

  const handleAddEdit = (values, action) => {
    const schoolIds = map(values.school_id, (item) => {
      if (item.school_id !== undefined) {
        return item.school_id;
      } else {
        return item.id;
      }
    });
    const data = {
      ...values,
      id: schoolAdminData.id ? schoolAdminData.id : "",
      school_id: schoolIds,
      activation_date: moment(values.activation_date).format("YYYY-MM-DD"),
      expired_at: moment(values.expired_at).format("YYYY-MM-DD"),
    };
    dispatch(addEditSchoolAdmin(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/username-and-groups/school-admin");
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };

  return (
    <>
      <BackButton />
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="body1" color="secondary.disabled" className="mb-4">
          Okul Yöneticisi
        </Typography>

        <Formik
          initialValues={{
            school_id: schoolAdminData.schoolDetails ?? [],
            name: schoolAdminData.name ?? "",
            email: schoolAdminData.email ?? "",
            password: schoolAdminData.password ?? "",
            activation_date:
              moment(schoolAdminData.activation_date) ?? moment(),
            expired_at: moment(schoolAdminData.expired_at) ?? moment(),
          }}
          validationSchema={addEditSchoolAdminValidation}
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
                    getOptionLabel={(option) => option.school_name ?? option}
                    options={schoolList}
                    name="school_name"
                    value={values.school_id}
                    isOptionEqualToValue={(option, value) => {
                      if (
                        value === "" ||
                        option.school_name === value.school_name
                      ) {
                        return true;
                      }
                    }}
                    onChange={(e, value) => {
                      setFieldValue("school_id", value);
                    }}
                    multiple
                    autoHighlight
                    disableClearable
                    noOptionsText="Veri yok"
                    loading={loading}
                    className="w-100"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        name="school_name"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password",
                          endadornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        error={
                          errors.school_name && touched.school_name
                            ? true
                            : false
                        }
                        helperText={
                          errors.school_name && touched.school_name
                            ? errors.school_name
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
                    Okul Yöneticisi
                  </Typography>
                  <TextField
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
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
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
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
                    type="password"
                    fullWidth
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

export default AddSchoolAdminForm;
