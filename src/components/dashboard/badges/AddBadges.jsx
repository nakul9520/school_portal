import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShowOuterFileUploader from "components/common/file-uploader/ShowOuterFileUploader";
import Iconify from "components/common/iconify";

import { Formik } from "formik";
import { map } from "lodash";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEditBadge } from "redux/store/slice/dashboard/badgeSlice";

const AddBadge = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const mediaInputRef = useRef(null);
  const handleRemoveFile = (formikProp, index) => {
    const updatedFiles = imageList.filter(
      (_file, fileIndex) => fileIndex !== index
    );
    setImageList(updatedFiles);
    formikProp.setFieldValue("file", updatedFiles);
  };
  const { state } = useLocation();
  const badgeData = state ?? {};

  const handleAddEdit = (values) => {
    const data = {
      ...values,
      id: badgeData.id ? badgeData.id : "",
      image: typeof values.image === "object" ? values.image[0] : "",
    };
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
      <Box
        component="section"
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="body1" color="secondary.disabled" className="mb-4">
          Sosyal İçerik
        </Typography>

        <Formik
          initialValues={{
            title: badgeData.title ?? "",
            image: badgeData.image ?? [],
            description: badgeData.description ?? "",
            profile: badgeData.profile ?? "",
          }}
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
                    Avatar Ekle
                  </Typography>
                  <Box
                    sx={{
                      background: theme.palette.background.tableBgBody,
                      height: 70,
                    }}
                    className="cursor-pointer w-100"
                  >
                    {imageList.length <= 0 ? (
                      <Box
                        onClick={() => mediaInputRef.current.click()}
                        className="w-100 h-100 d-flex align-items-center"
                      >
                        <Typography variant="body2" className="px-3">
                          click to add Avatar
                        </Typography>
                      </Box>
                    ) : (
                      <Stack direction="row" className="gap-2 flex-wrap p-2">
                        {map(imageList, (item, index) => (
                          <Box
                            key={index}
                            className="rounded position-relative cursor-pointer overflow-hidden"
                            sx={{
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                backgroundColor: "rgba(0,0,0,0.3)",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              },
                            }}
                          >
                            <Box
                              component="img"
                              src={item.url}
                              alt={`${item.type}_${index}`}
                              className="img-cover rounded position-relative"
                              sx={{
                                width: 60,
                                height: 60,
                              }}
                            />
                            <IconButton
                              size="small"
                              sx={{
                                background: "rgba(255,255,255,.3)",
                                color: "primary.contrastText",
                                position: "absolute",
                                top: "8%",
                                right: "5%",
                                transform: "translate(-8%, -5%)",
                                zIndex: "2",
                                "&:hover": {
                                  background: "rgba(255,255,255,.3)",
                                  color: "primary.contrastText",
                                },
                              }}
                              onClick={() => handleRemoveFile(props, index)}
                            >
                              <Iconify icon="iconoir:cancel" width={18} />
                            </IconButton>
                          </Box>
                        ))}
                      </Stack>
                    )}
                  </Box>
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
              <ShowOuterFileUploader
                name="image"
                formikProp={props}
                maxFileUpload={3}
                acceptType="image/*"
                fileRef={mediaInputRef}
                imageList={imageList}
                setImageList={setImageList}
              />
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddBadge;
