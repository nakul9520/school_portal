import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BackButton from "components/common/BackButton";
import Iconify from "components/common/iconify";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";

import { Formik } from "formik";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEditBadge } from "redux/store/slice/dashboard/badgeSlice";

const AddBadge = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState(null);
  const { state } = useLocation();
  const badgeData = state ?? {};

  const handleAddEdit = (values) => {
    const data = {
      ...values,
      id: badgeData.id ? badgeData.id : "",
      image: values.image instanceof File ? values.image : "",
    };
    console.log(data);
    dispatch(addEditBadge(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/badges");
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
          Rozetler / Profil resimleri
        </Typography>

        <Formik
          initialValues={{
            title: badgeData.title ?? "",
            image: badgeData.image ?? [],
            alert: badgeData.alert ?? "",
            description: badgeData.description ?? "",
            profile: badgeData.profile ?? "",
          }}
          onSubmit={(value, action) => {
            handleAddEdit(value, action);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="h-100">
              {console.log(props)}
              <Box className="custom_form border">
                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    İsim
                  </Typography>
                  <TextField
                    name="title"
                    value={props.values.title}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    error={
                      props.errors.title && props.touched.title ? true : false
                    }
                    helperText={
                      props.errors.title && props.touched.title
                        ? props.errors.title
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
                    Görsel
                  </Typography>
                  <Box
                    sx={{
                      background: theme.palette.background.tableBgBody,
                      height: 70,
                    }}
                    className="cursor-pointer w-100 d-flex align-items-center"
                  >
                    <Box
                      className="flex-grow-1 h-100 d-flex align-items-center"
                      component="label"
                      htmlFor="image-uploader"
                    >
                      <Typography variant="body2" className="px-3">
                        Görsel Ekle
                      </Typography>
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        id="image-uploader"
                        onChange={(e) => {
                          if (e.currentTarget.files[0]) {
                            props.setFieldValue(
                              "image",
                              e.currentTarget.files[0]
                            );
                            setImageList(
                              URL.createObjectURL(e.currentTarget.files[0])
                            );
                          }
                        }}
                      />
                    </Box>
                    {props.values.image instanceof File ? (
                      <Box
                        key={1}
                        className="rounded position-relative cursor-pointer overflow-hidden"
                        sx={{
                          width: 70,
                          height: 70,
                        }}
                      >
                        <ImageThumbnail
                          key={1}
                          size={70}
                          imagePath={imageList}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            background: "rgba(0,0,0,.8)",
                            color: "primary.contrastText",
                            position: "absolute",
                            top: "8%",
                            right: "5%",
                            transform: "translate(-8%, -5%)",
                            zIndex: "2",
                            "&:hover": {
                              background: "rgba(0,0,0,.8)",
                              color: "primary.contrastText",
                            },
                          }}
                          onClick={() => {
                            props.setFieldValue("image", "");
                            setImageList("");
                          }}
                        >
                          <Iconify icon="iconoir:cancel" width={18} />
                        </IconButton>
                      </Box>
                    ) : null}
                    {!(props.values.image instanceof File) &&
                    !isEmpty(props.values.image) ? (
                      <ImageThumbnail
                        key={1}
                        size={70}
                        imagePath={props.values.image}
                      />
                    ) : null}
                  </Box>
                </Box>
                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    Mesaj
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
                <Box className="custom_form_row d-flex align-items-center border-bottom">
                  <Typography
                    variant="body2"
                    color="secondary.disabled"
                    className="ms-4 w-25"
                  >
                    Oyunlar
                  </Typography>
                  <TextField
                    name="alert"
                    value={props.values.alert}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    error={
                      props.errors.alert && props.touched.alert ? true : false
                    }
                    helperText={
                      props.errors.alert && props.touched.alert
                        ? props.errors.alert
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
                    Profiler
                  </Typography>
                  <TextField
                    name="profile"
                    value={props.values.profile}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    fullWidth
                    error={
                      props.errors.profile && props.touched.profile
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.profile && props.touched.profile
                        ? props.errors.profile
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

export default AddBadge;
