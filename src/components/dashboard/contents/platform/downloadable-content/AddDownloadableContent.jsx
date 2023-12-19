import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BackButton from "components/common/BackButton";
import ShowOuterFileUploader from "components/common/file-uploader/ShowOuterFileUploader";
import Iconify from "components/common/iconify";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";

import { Formik } from "formik";
import { isEmpty, truncate } from "lodash";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEditContentFile } from "redux/store/slice/dashboard/contentSlice";
import { CONTENT_TYPE } from "services/constant";
import { imageObj } from "services/images";

const AddDownloadableContent = () => {
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
  const contentData = state ?? {};

  const handleAddEdit = (values, action) => {
    const data = {
      ...values,
      file: typeof values.file === "object" ? values.file[0] : "",
      id: contentData.id ? contentData.id : "",
      filetype: CONTENT_TYPE.downloadadble,
    };
    dispatch(addEditContentFile(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/contents/platform-design/downloadable-content");
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
          indirilebilir İçerik
        </Typography>

        <Formik
          initialValues={{
            title: contentData.title ?? "",
            visibility: contentData.visibility ?? "",
            description: contentData.description ?? "",
            file: contentData.file ?? "",
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
                    Yayınlanacağı yer
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      name="visibility"
                      value={props.values.visibility}
                      onChange={props.handleChange}
                    >
                      <MenuItem value={1}>Kaymaklar</MenuItem>
                      <MenuItem value={2}>Academic</MenuItem>
                      <MenuItem value={3}>Benim Dünyam</MenuItem>
                      <MenuItem value={4}>Blog</MenuItem>
                    </Select>
                  </FormControl>
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
                      height: 70,
                    }}
                    className="cursor-pointer w-100"
                  >
                    {console.log("ijmafe", imageList)}
                    {imageList.length <= 0 ? (
                      <Box
                        onClick={() => mediaInputRef.current.click()}
                        className="w-100 h-100 d-flex align-items-center"
                      >
                        <Typography variant="body2" className="px-3">
                          click to add File
                        </Typography>
                      </Box>
                    ) : (
                      <Stack direction="row" className="gap-3 flex-wrap p-2">
                        {!isEmpty(imageList)
                          ? imageList.map((item, index) =>
                              item.type === "image" ? (
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
                                  <ImageThumbnail
                                    imagePath={item.url}
                                    size={60}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
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
                                    onClick={() =>
                                      handleRemoveFile(props, index)
                                    }
                                  >
                                    <Iconify icon="iconoir:cancel" width={15} />
                                  </IconButton>
                                </Box>
                              ) : item.type === "video" ? (
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
                                  <VedioThumbnail
                                    key={index}
                                    videoPath={item.url}
                                    size={60}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
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
                                    onClick={() =>
                                      handleRemoveFile(props, index)
                                    }
                                  >
                                    <Iconify icon="iconoir:cancel" width={15} />
                                  </IconButton>
                                </Box>
                              ) : item.type === "audio" ? (
                                <Box
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    p: 0.5,
                                    boxShadow: theme.shadows[3],
                                  }}
                                  className="rounded position-relative d-flex flex-column gap-1 align-items-center justify-content-center cursor-pointer"
                                >
                                  <Box
                                    component="img"
                                    src={imageObj.audioIcon}
                                    sx={{ width: 25 }}
                                    key={index}
                                  />
                                  <Typography variant="caption">
                                    {truncate(item.name, { length: 8 })}
                                  </Typography>
                                  <IconButton
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
                                      background: theme.palette.grey[300],
                                      color: "text.primary",
                                      position: "absolute",
                                      top: "8%",
                                      right: "5%",
                                      transform: "translate(-8%, -5%)",
                                      zIndex: "2",
                                      boxShadow: theme.shadows[2],
                                      "&:hover": {
                                        background: theme.palette.grey[300],
                                        color: "text.primary",
                                      },
                                    }}
                                    onClick={() =>
                                      handleRemoveFile(props, index)
                                    }
                                  >
                                    <Iconify icon="iconoir:cancel" width={15} />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    p: 0.5,
                                    boxShadow: theme.shadows[3],
                                  }}
                                  className="rounded position-relative d-flex flex-column gap-1 align-items-center justify-content-center cursor-pointer"
                                >
                                  <Box
                                    component="img"
                                    src={imageObj.documentIcon}
                                    sx={{ width: 25 }}
                                    key={index}
                                  />
                                  <Typography variant="caption">
                                    {truncate(item.name, { length: 8 })}
                                  </Typography>
                                  <IconButton
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
                                      background: theme.palette.grey[300],
                                      color: "text.primary",
                                      position: "absolute",
                                      top: "8%",
                                      right: "5%",
                                      transform: "translate(-8%, -5%)",
                                      zIndex: "2",
                                      boxShadow: theme.shadows[2],
                                      "&:hover": {
                                        background: theme.palette.grey[300],
                                        color: "text.primary",
                                      },
                                    }}
                                    onClick={() =>
                                      handleRemoveFile(props, index)
                                    }
                                  >
                                    <Iconify icon="iconoir:cancel" width={15} />
                                  </IconButton>
                                </Box>
                              )
                            )
                          : null}
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
                acceptType="*"
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

export default AddDownloadableContent;
