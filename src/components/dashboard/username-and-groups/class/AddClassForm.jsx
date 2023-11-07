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

import { Formik } from "formik";
import { get, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSchoolList } from "redux/store/slice/dashboard/userSlice";

import { addEditClass } from "redux/store/slice/dashboard/userSlice";
import { addEditClassValidation } from "services/validations";

const AddClassForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const classData = state ?? {};

  const { schoolListInfo, loading } = useSelector((state) => state.users);
  const schoolList = schoolListInfo.data ?? [];

  const handleAddEdit = (values) => {
    const data = {
      ...values,
      id: classData.id ? classData.id : "",
      school_id: values.school_id,
    };
    const payload = omit(data, "school_name");
    dispatch(addEditClass(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          navigate("/dashboard/username-and-groups/class");
        } else {
          toast.error(result.message);
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

        <Formik
          initialValues={{
            school_id: get(classData, "school_id", ""),
            school_name: get(classData, "school_name", ""),
            class_name: get(classData, "class_name", ""),
            class_code: get(classData, "class_code", ""),
            teacher_name1: get(classData, "teacher_name1", ""),
            teacher_email1: get(classData, "teacher_email1", ""),
            teacher_password1: get(classData, "teacher_password1", ""),
            teacher_name2: get(classData, "teacher_name2", ""),
            teacher_email2: get(classData, "teacher_email2", ""),
            teacher_password2: get(classData, "teacher_password2", ""),
            no_of_student: get(classData, "no_of_student", ""),
          }}
          validationSchema={addEditClassValidation}
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
                    getOptionLabel={(option) => {
                      return option.school_name ?? option;
                    }}
                    options={schoolList}
                    name="school_name"
                    value={values.school_name}
                    isOptionEqualToValue={(option, value) => {
                      if (value === "" || option.school_name === value) {
                        return true;
                      }
                    }}
                    onChange={(e, value) => {
                      setFieldValue("school_id", value.id);
                      setFieldValue("school_name", value.school_name);
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
                    Sınıf Adı
                  </Typography>
                  <TextField
                    name="class_name"
                    value={values.class_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="class_name"
                    error={
                      errors.class_name && touched.class_name ? true : false
                    }
                    helperText={
                      errors.class_name && touched.class_name
                        ? errors.class_name
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
                    Sınıf Şifre
                  </Typography>
                  <TextField
                    name="class_code"
                    value={values.class_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="class_code"
                    error={
                      errors.class_code && touched.class_code ? true : false
                    }
                    helperText={
                      errors.class_code && touched.class_code
                        ? errors.class_code
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
                    name="teacher_name1"
                    value={values.teacher_name1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_name1"
                    error={
                      errors.teacher_name1 && touched.teacher_name1
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_name1 && touched.teacher_name1
                        ? errors.teacher_name1
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
                    name="teacher_email1"
                    value={values.teacher_email1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_email1"
                    error={
                      errors.teacher_email1 && touched.teacher_email1
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_email1 && touched.teacher_email1
                        ? errors.teacher_email1
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
                    name="teacher_password1"
                    value={values.teacher_password1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_password1"
                    error={
                      errors.teacher_password1 && touched.teacher_password1
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_password1 && touched.teacher_password1
                        ? errors.teacher_password1
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
                    name="teacher_name2"
                    value={values.teacher_name2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_name2"
                    error={
                      errors.teacher_name2 && touched.teacher_name2
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_name2 && touched.teacher_name2
                        ? errors.teacher_name2
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
                    name="teacher_email2"
                    value={values.teacher_email2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_email2"
                    error={
                      errors.teacher_email2 && touched.teacher_email2
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_email2 && touched.teacher_email2
                        ? errors.teacher_email2
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
                    name="teacher_password2"
                    value={values.teacher_password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="teacher_password2"
                    error={
                      errors.teacher_password2 && touched.teacher_password2
                        ? true
                        : false
                    }
                    helperText={
                      errors.teacher_password2 && touched.teacher_password2
                        ? errors.teacher_password2
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
                    name="no_of_student"
                    value={values.no_of_student}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="no_of_student"
                    error={
                      errors.no_of_student && touched.no_of_student
                        ? true
                        : false
                    }
                    helperText={
                      errors.no_of_student && touched.no_of_student
                        ? errors.no_of_student
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
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddClassForm;
