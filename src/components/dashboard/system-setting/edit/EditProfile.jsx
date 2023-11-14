import {
  Avatar,
  Box,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Formik } from "formik";
import { isEmpty } from "lodash";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Iconify from "components/common/iconify";
import { updateProfile } from "redux/store/slice/auth/authSlice";
import { getProfileInfo } from "redux/store/slice/auth/authSlice";
import { getSession } from "services/utiles";

const EditProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = getSession();
  const [imageList, setImageList] = useState([]);
  const mediaInputRef = useRef(null);

  const { profileInfo, loading } = useSelector((state) => state.auth);

  const handleAddEdit = (values) => {
    const data = {
      ...values,
      image: typeof values.image === "object" ? values.image : "",
      id: profileInfo.id ? profileInfo.id : "",
    };
    dispatch(updateProfile(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          dispatch(getProfileInfo({ id }));
          navigate("/dashboard/system-settings");
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  const onImageChange = (event, formikProp) => {
    const file = event.target.files[0];
    setImageList({
      type: "image",
      url: URL.createObjectURL(file),
    });
    formikProp.setFieldValue("image", file);
  };
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box
          component="section"
          sx={{
            p: 2,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography
            variant="body1"
            color="secondary.disabled"
            className="mb-4"
          >
            Profile Edit
          </Typography>

          <Formik
            initialValues={{
              name: profileInfo.name ?? "",
              password: profileInfo.password ?? "",
              image: profileInfo.profileUrl ?? "",
            }}
            onSubmit={(value, action) => {
              handleAddEdit(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} className="h-100">
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    mx: "auto",
                    borderRadius: "100%",
                    border: `5px solid ${theme.palette.secondary.main}`,
                    mb: 2,
                    position: "relative",
                  }}
                  className="d-flex aling-items-center justify-content-center"
                >
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                    }}
                    src={
                      isEmpty(imageList)
                        ? profileInfo.profileUrl
                        : imageList.url
                    }
                    alt="profile-img"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: -10,
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover,&:focus,&:active": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      },
                    }}
                    onClick={() => mediaInputRef.current.click()}
                  >
                    <Iconify icon="mdi:camera" />
                  </IconButton>{" "}
                  <input
                    ref={mediaInputRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => onImageChange(e, props)}
                    name="image"
                    type="file"
                  />
                </Box>

                <Box className="custom_form border">
                  <Box className="custom_form_row d-flex align-items-center border-bottom">
                    <Typography
                      variant="body2"
                      color="secondary.disabled"
                      className="ms-4 w-25"
                    >
                      Name
                    </Typography>
                    <TextField
                      name="name"
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                      error={
                        props.errors.name && props.touched.name ? true : false
                      }
                      helperText={
                        props.errors.name && props.touched.name
                          ? props.errors.name
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
                      Password
                    </Typography>
                    <TextField
                      name="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                      error={
                        props.errors.password && props.touched.password
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.password && props.touched.password
                          ? props.errors.password
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
      )}
    </>
  );
};

export default EditProfile;
