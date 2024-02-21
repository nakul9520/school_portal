import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BackButton from "components/common/BackButton";
import RichTextEditor from "components/common/editor/RichTextEditor";
import Iconify from "components/common/iconify";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";

import { Formik } from "formik";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addEditContentFile } from "redux/store/slice/dashboard/contentSlice";
import { CONTENT_TYPE, DOC_TYPE } from "services/constant";

const AddSocialContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState(null);

  const { state } = useLocation();
  const contentData = state ?? {};

  const handleAddEdit = (values, action) => {
    const data = {
      ...values,
      file: values.file instanceof File ? values.file : "",
      id: contentData.id ? contentData.id : "",
      filetype: CONTENT_TYPE.socialContent,
    };
    dispatch(addEditContentFile(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/contents/platform-design/social-content");
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
          Sosyal İçerik
        </Typography>

        <Formik
          initialValues={{
            title: contentData.title ?? "",
            visibility: contentData.visibility ?? "",
            description: contentData.description ?? "",
            file: contentData.file ?? "",
            docType: DOC_TYPE.image,
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
                      <MenuItem value={1}>Kaynaklar</MenuItem>
                      <MenuItem value={2}>Akademi</MenuItem>
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
                    className="cursor-pointer w-100 d-flex align-items-center"
                  >
                    <Box
                      className="flex-grow-1 h-100 d-flex align-items-center"
                      component="label"
                      htmlFor="image-uploader"
                    >
                      <Typography variant="body2" className="px-3">
                        Resim eklemek için tıklayın
                      </Typography>
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        id="image-uploader"
                        onChange={(e) => {
                          if (e.currentTarget.files[0]) {
                            props.setFieldValue(
                              "file",
                              e.currentTarget.files[0]
                            );
                            setImageList(
                              URL.createObjectURL(e.currentTarget.files[0])
                            );
                          }
                        }}
                      />
                    </Box>
                    {props.values.file instanceof File ? (
                      <Box
                        key={1}
                        className="d-flex align-item-center rounded position-relative cursor-pointer overflow-hidden"
                        sx={{
                          width: 70,
                          height: 70,
                          backgroundColor: "primary.contrastText",
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
                            props.setFieldValue("file", "");
                            setImageList("");
                          }}
                        >
                          <Iconify icon="iconoir:cancel" width={18} />
                        </IconButton>
                      </Box>
                    ) : null}
                    {!(props.values.file instanceof File) &&
                    !isEmpty(props.values.file) ? (
                      <ImageThumbnail
                        key={1}
                        size={70}
                        imagePath={props.values.file}
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
                    Mesa
                  </Typography>
                  <RichTextEditor
                    name="description"
                    value={props.values.description}
                    setFieldValue={props.setFieldValue}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
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

export default AddSocialContent;
