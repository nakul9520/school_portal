import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Formik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addEditSchool } from "redux/store/slice/dashboard/userSlice";
import { addEditSchoolValidation } from "services/validations";

const AddFAQ = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  const schoolData = state ?? {};

  const handleAddEdit = (values, action) => {
    const data = {
      ...values,
      id: schoolData.id ? schoolData.id : "",
      activation_date: moment(values.activation_date).format("YYYY-MM-DD"),
      expired_at: moment(values.expired_at).format("YYYY-MM-DD"),
    };
    dispatch(addEditSchool(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/contents/platform-design/creating-page");
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
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="body1" color="secondary.disabled" className="mb-4">
          FAQ İçerik
        </Typography>

        <Formik
          initialValues={{
            school_name: schoolData.school_name ?? "",
            description: schoolData.description ?? "",
            file: "",
          }}
          validationSchema={addEditSchoolValidation}
          onSubmit={(value, action) => {
            handleAddEdit(value, action);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="h-100">
              <Box className="custom_form border">
                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    Başlık
                  </Typography>
                  <TextField
                    name="school_name"
                    value={props.values.school_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    error={
                      props.errors.school_name && props.touched.school_name
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.school_name && props.touched.school_name
                        ? props.errors.school_name
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
                    Tanım
                  </Typography>
                  <TextField
                    name="description"
                    value={props.values.description}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    multiline
                    rows={4}
                    error={
                      props.errors.description && props.touched.description
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.description && props.touched.description
                        ? props.errors.description
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

export default AddFAQ;
