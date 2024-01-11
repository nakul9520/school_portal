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
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";
import { FieldArray, Formik, getIn } from "formik";
import {
  concat,
  get,
  includes,
  isEmpty,
  map,
  size,
  truncate,
  without,
} from "lodash";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addEditMCQTask,
  getMCQTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import { QuizType } from "services/constant";

const AddMultipleChoiceQuestions = (props) => {
  const { data, open, onClose } = props;
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const [fileList, setFileList] = useState([]);
  const [questionfileList, setQuestionFileList] = useState([]);
  const mediaInputRef = useRef(null);
  const questionMediaInputRef = useRef(null);
  const theme = useTheme();

  const handleRemoveFile = (formikProp, index) => {
    const updatedFiles = fileList.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setFileList(updatedFiles);
    formikProp.setFieldValue("options", updatedFiles);
  };

  const handleRemoveQuestionFile = (formikProp, index) => {
    const updatedFiles = questionfileList.filter(
      (file, fileIndex) => fileIndex !== index
    );
    setQuestionFileList(updatedFiles);
    formikProp.setFieldValue("question", updatedFiles);
  };

  const handleAddEdit = (values, action) => {
    if (size(values.answer) > 0) {
      const payload = {
        ...values,
        id: data ? data.id : "",
        book_id: book_id,
      };
      dispatch(addEditMCQTask(payload))
        .unwrap()
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            const param = {
              book_id: book_id,
              page: 1,
            };

            dispatch(getMCQTaskList(param));
            onClose();
          } else {
            toast.error(result.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("Error: ", err);
        });
    } else {
      toast.error("Please Select One ANswer");
    }
  };

  const onQuestionFileChange = (event, formikProp) => {
    const file = event.target.files[0];
    setQuestionFileList({
      type: "image",
      url: URL.createObjectURL(file),
    });
    formikProp.setFieldValue("image", file);
  };

  const onOptionFileChange = (event, formikProp) => {
    const file = event.target.files[0];
    setQuestionFileList({
      type: "image",
      url: URL.createObjectURL(file),
    });
    formikProp.setFieldValue("image", file);
  };

  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Çoktan seçmeli soruları buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Formik
            initialValues={{
              question_type: data.question_type ?? 1,
              question: data.question ?? "",
              option_type: data.option_type ?? 1,
              options: data.options ?? ["", "", "", ""],
              answer: data.answer ?? [],
            }}
            onSubmit={(value, action) => {
              handleAddEdit(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container className="gap-2">
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
                        {map(QuizType, (item, index) => (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        ))}
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
                    {props.values.question_type === 1 ? (
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
                    ) : (
                      <>
                        <Box
                          className="border p-2 d-flex align-items-center justify-content-center"
                          sx={{ width: 100, height: 100 }}
                          onClick={() => questionMediaInputRef.current.click()}
                        >
                          <Iconify
                            icon="ic:round-upload-file"
                            width={35}
                            color="text.secondary"
                          />
                          <input
                            ref={questionMediaInputRef}
                            hidden
                            accept="image/*,audio/*,video/*"
                            onChange={(e) => onQuestionFileChange(e, props)}
                            name="question"
                            type="file"
                          />
                        </Box>
                        <Stack
                          direction="row"
                          className="gap-2 flex-wrap p-2 mb-1"
                        >
                          {questionfileList.length > 0
                            ? map(questionfileList, (item, index) => (
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
                                    {truncate(item.name, {
                                      length: 10,
                                    })}
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
                                    onClick={() =>
                                      handleRemoveQuestionFile(props, index)
                                    }
                                  >
                                    <Iconify icon="iconoir:cancel" width={18} />
                                  </IconButton>
                                </Box>
                              ))
                            : null}
                        </Stack>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} className="mb-2">
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      className="my-2"
                    >
                      Type of Options
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="option_type"
                        value={props.values.option_type}
                        onChange={props.handleChange}
                        size="small"
                      >
                        {map(QuizType, (item, index) => (
                          <MenuItem value={item.value} key={index}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="options"
                      render={(arrayHelpers) =>
                        props.values.options && props.values.options.length > 0
                          ? props.values.options.map((item, index) => {
                              const option = `options[${index}]`;
                              const optionError = getIn(props.errors, option);
                              const optionTouched = getIn(
                                props.touched,
                                option
                              );
                              const optionContent = get(props.values, option);
                              return (
                                <Stack
                                  key={index}
                                  direction="row"
                                  alignItems="center"
                                  className="gap-1 mb-2"
                                >
                                  <CMCheckBox
                                    disabled={isEmpty(optionContent)}
                                    checked={includes(
                                      props.values.answer,
                                      optionContent
                                    )}
                                    onChange={(e) => {
                                      if (
                                        includes(
                                          props.values.answer,
                                          optionContent
                                        )
                                      ) {
                                        props.setFieldValue(
                                          "answer",
                                          without(
                                            props.values.answer,
                                            optionContent
                                          )
                                        );
                                      } else {
                                        props.setFieldValue(
                                          "answer",
                                          concat(
                                            props.values.answer,
                                            optionContent
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  {props.values.option_type === 1 ? (
                                    <TextField
                                      name={option}
                                      value={optionContent}
                                      onChange={(e) =>
                                        props.setFieldValue(
                                          option,
                                          e.target.value
                                        )
                                      }
                                      onBlur={props.handleBlur}
                                      fullWidth
                                      size="small"
                                      error={
                                        optionError && optionTouched
                                          ? true
                                          : false
                                      }
                                      helperText={
                                        optionError && optionTouched
                                          ? optionError
                                          : null
                                      }
                                    />
                                  ) : (
                                    <>
                                      <Box
                                        className="border p-2 d-flex align-items-center justify-content-center"
                                        sx={{ width: 100, height: 100 }}
                                        onClick={() =>
                                          mediaInputRef.current.click()
                                        }
                                      >
                                        <Iconify
                                          icon="ic:round-upload-file"
                                          width={35}
                                          color="text.secondary"
                                        />
                                        <input
                                          ref={mediaInputRef}
                                          hidden
                                          accept="image/*,audio/*,video/*"
                                          onChange={(e) =>
                                            onOptionFileChange(e, props)
                                          }
                                          name="question"
                                          type="file"
                                        />
                                      </Box>
                                      <Stack
                                        direction="row"
                                        className="gap-2 flex-wrap p-2 mb-1"
                                      >
                                        {fileList.length > 0
                                          ? map(fileList, (item, index) => (
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
                                                <Typography
                                                  variant="caption"
                                                  key={index}
                                                >
                                                  {truncate(item.name, {
                                                    length: 10,
                                                  })}
                                                </Typography>

                                                <IconButton
                                                  size="small"
                                                  sx={{
                                                    background:
                                                      theme.palette.grey[300],
                                                    color: "text.primary",
                                                    position: "absolute",
                                                    top: "8%",
                                                    right: "5%",
                                                    transform:
                                                      "translate(-8%, -5%)",
                                                    zIndex: "2",
                                                    boxShadow: theme.shadows[2],
                                                    "&:hover": {
                                                      background:
                                                        theme.palette.grey[300],
                                                      color: "text.primary",
                                                    },
                                                  }}
                                                  onClick={() =>
                                                    handleRemoveFile(
                                                      props,
                                                      index
                                                    )
                                                  }
                                                >
                                                  <Iconify
                                                    icon="iconoir:cancel"
                                                    width={18}
                                                  />
                                                </IconButton>
                                              </Box>
                                            ))
                                          : null}
                                      </Stack>
                                    </>
                                  )}
                                </Stack>
                              );
                            })
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="gap-2"
                    >
                      <Button variant="contained" color="secondary">
                        Satır Ekle
                      </Button>
                      <Button variant="contained" color="mint" type="submit">
                        Kaydet
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddMultipleChoiceQuestions;
