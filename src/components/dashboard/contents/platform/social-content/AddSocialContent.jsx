import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RichTextEditor from "components/common/editor/RichTextEditor";
import ShowOuterFileUploader from "components/common/file-uploader/ShowOuterFileUploader";
import Iconify from "components/common/iconify";

import { Formik } from "formik";
import { map } from "lodash";
import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addEditSchool } from "redux/store/slice/dashboard/userSlice";
import { addEditSchoolValidation } from "services/validations";

const AddSocialContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const mediaInputRef = useRef(null);
  const handleRemoveFile = (formikProp, index) => {
    const updatedFiles = imageList.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setImageList(updatedFiles);
    formikProp.setFieldValue("file", updatedFiles);
  };
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
          Sosyal İçerik
        </Typography>

        <Formik
          initialValues={{
            school_name: schoolData.school_name ?? "",
            user_name: schoolData.user_name ?? "",
            brief_infomation: schoolData.brief_infomation ?? "",
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
                    Dosya Ekle
                  </Typography>
                  <Box
                    sx={{
                      background: theme.palette.background.tableBgBody,
                      height: 70,
                    }}
                    className="cursor-pointer w-100 d-flex align-items-center"
                  >
                    {imageList.length <= 0 ? (
                      <Box
                        onClick={() => mediaInputRef.current.click()}
                        className="w-100"
                      >
                        <Typography variant="body2" className="px-3">
                          click to add Image
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
                  <RichTextEditor
                    name="brief_infomation"
                    value={props.values.brief_infomation}
                    setFieldValue={props.setFieldValue}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.errors.brief_infomation &&
                      props.touched.brief_infomation
                        ? true
                        : false
                    }
                    helperText={
                      props.errors.brief_infomation &&
                      props.touched.brief_infomation
                        ? props.errors.brief_infomation
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
                name="file"
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

export default AddSocialContent;
