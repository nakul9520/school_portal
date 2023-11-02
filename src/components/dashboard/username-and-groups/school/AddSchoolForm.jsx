import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { Formik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addEditSchool } from "redux/store/slice/dashboard/userSlice";
import { addEditSchoolValidation } from "services/validations";

const AddSchoolForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const schoolData = state ?? {};

  console.log("schoolData", schoolData);

  const handleAddEdit = (values, action) => {
    const data = {
      ...values,
      id: schoolData.id ? schoolData.id : "",
      activation_date: moment(values.activation_date).format("YYYY-MM-DD"),
      expired_at: moment(values.expired_at).format("YYYY-MM-DD"),
    };
    console.log("data", data);
    dispatch(addEditSchool(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success(result.message);
          navigate("/dashboard/username-and-groups/school");
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });

    console.log("data", data);
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
          Okul Ekle
        </Typography>

        <Formik
          initialValues={{
            school_name: schoolData.school_name ?? "",
            user_name: schoolData.user_name ?? "",
            school_admin: schoolData.school_admin ?? "",
            school_email: schoolData.school_email ?? "",
            school_code: schoolData.school_code ?? "",
            activation_date: moment(schoolData.activation_date) ?? moment(),
            expired_at: moment(schoolData.expired_at) ?? moment(),
          }}
          validationSchema={addEditSchoolValidation}
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
                  <TextField
                    name="school_name"
                    value={values.school_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="school_name"
                    error={
                      errors.school_name && touched.school_name ? true : false
                    }
                    helperText={
                      errors.school_name && touched.school_name
                        ? errors.school_name
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
                    Okul Yöneticisi
                  </Typography>
                  <TextField
                    name="school_admin"
                    value={values.school_admin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="school_admin"
                    error={
                      errors.school_admin && touched.school_admin ? true : false
                    }
                    helperText={
                      errors.school_admin && touched.school_admin
                        ? errors.school_admin
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
                    Email
                  </Typography>
                  <TextField
                    name="school_email"
                    value={values.school_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="school_email"
                    error={
                      errors.school_email && touched.school_email ? true : false
                    }
                    helperText={
                      errors.school_email && touched.school_email
                        ? errors.school_email
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
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="user_name"
                    error={errors.user_name && touched.user_name ? true : false}
                    helperText={
                      errors.user_name && touched.user_name
                        ? errors.user_name
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
                    name="school_code"
                    value={values.school_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    type="school_code"
                    error={
                      errors.school_code && touched.school_code ? true : false
                    }
                    helperText={
                      errors.school_code && touched.school_code
                        ? errors.school_code
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

export default AddSchoolForm;
