import {
  Box,
  Button,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CMDialog from "components/common/dialog/CMDialog";
import ShowOuterFileUploader from "components/common/file-uploader/ShowOuterFileUploader";
import Iconify from "components/common/iconify";
import { Formik } from "formik";
import { map, truncate } from "lodash";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addEditVoiceTask,
  getVoiceTaskList,
} from "redux/store/slice/dashboard/contentSlice";

const AddVoiceRecording = (props) => {
  const { data, open, onClose } = props;
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const [voiceList, setVoiceList] = useState([]);
  const mediaInputRef = useRef(null);
  const theme = useTheme();

  const handleRemoveFile = (formikProp, index) => {
    const updatedFiles = voiceList.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setVoiceList(updatedFiles);
    formikProp.setFieldValue("file", updatedFiles);
  };

  const handleVoiceUpload = (values, action) => {
    const payload = {
      ...values,
      file: typeof values.file === "object" ? values.file[0] : "",
      id: data ? data.id : "",
      book_id: book_id,
    };
    dispatch(addEditVoiceTask(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getVoiceTaskList(param));
          onClose();
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
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Ses kaydetme görevlerini buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Formik
            initialValues={{
              question_type: data.question_type ?? 1,
              question: data.question ?? "",
              file: data.file ?? "",
            }}
            onSubmit={(value, action) => {
              handleVoiceUpload(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container className="gap-3">
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      className="my-2"
                    >
                      Type of Question
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="question_type"
                        value={props.values.question_type}
                        onChange={props.handleChange}
                        size="small"
                      >
                        <MenuItem value={1}>Text</MenuItem>
                        <MenuItem value={2}>File</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      className="my-2"
                    >
                      Add Question
                    </Typography>
                    <TextField
                      name="question"
                      value={props.values.question}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                      size="small"
                      error={
                        props.errors.question && props.touched.question
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.question && props.touched.question
                          ? props.errors.question
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} className="d-none">
                    <Box
                      className="border p-2 d-flex align-items-center justify-content-center"
                      sx={{ height: 100 }}
                      onClick={() => mediaInputRef.current.click()}
                    >
                      <Iconify
                        icon="fa6-regular:file-audio"
                        width={35}
                        color="text.secondary"
                      />
                    </Box>
                    <Stack direction="row" className="gap-2 flex-wrap p-2 mb-1">
                      {voiceList.length > 0
                        ? map(voiceList, (item, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: 100,
                                height: 100,
                                p: 1,
                                boxShadow: theme.shadows[3],
                              }}
                              className="rounded position-relative d-flex flex-column gap-1 align-items-center justify-content-center cursor-pointer"
                            >
                              <Box>
                                <Iconify
                                  icon="flat-color-icons:audio-file"
                                  width={30}
                                />
                              </Box>
                              <Typography variant="caption" key={index}>
                                {truncate(item.name, { length: 10 })}
                              </Typography>

                              <IconButton
                                size="small"
                                sx={{
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
                                onClick={() => handleRemoveFile(props, index)}
                              >
                                <Iconify icon="iconoir:cancel" width={18} />
                              </IconButton>
                            </Box>
                          ))
                        : null}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} className="text-right">
                    <Button
                      variant="contained"
                      color="mint"
                      className="rounded-0"
                      type="submit"
                    >
                      Kaydet
                    </Button>
                  </Grid>
                </Grid>
                <ShowOuterFileUploader
                  name="file"
                  formikProp={props}
                  maxFileUpload={3}
                  acceptType="audio/*"
                  fileRef={mediaInputRef}
                  imageList={voiceList}
                  setImageList={setVoiceList}
                />
              </form>
            )}
          </Formik>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddVoiceRecording;
