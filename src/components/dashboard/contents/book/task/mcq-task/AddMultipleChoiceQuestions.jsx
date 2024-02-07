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
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";
import { FieldArray, Formik, getIn } from "formik";
import { get, isEmpty, map } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editMCQTask } from "redux/store/slice/dashboard/contentSlice";
import {
  addEditMCQTask,
  getMCQTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import { FILE_TYPE } from "services/constant";
import { QuizType } from "services/constant";
import { imageObj } from "services/images";

const AddMultipleChoiceQuestions = (props) => {
  const { data, open, onClose } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const book_id = localStorage.getItem("bookId");
  const handleAddEdit = (values) => {
    let payload;

    if (isEmpty(data)) {
      payload = {
        ...values,
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
      payload = {
        ...values,
        id: data ? data.id : "",
        book_id: book_id,
        is_edit:
          values.question_type !== FILE_TYPE.text
            ? values.question && values.question instanceof File
              ? 1
              : 0
            : 1,
        data: values.data.map((item) => ({
          ...item,
          is_edit:
            values.options_type !== FILE_TYPE.text
              ? item.option && item.option instanceof File
                ? 1
                : 0
              : 1, // Check if there's any file in options
        })),
      };
      console.log("payload", payload);
      dispatch(editMCQTask(payload))
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
    }
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
              question_type: data.question_type ?? "1",
              question: data.question ?? [],
              options_type: data.options_type ?? "1",
              data: data.data ?? [
                {
                  option: "",
                  status: "0",
                },
                {
                  option: "",
                  status: "0",
                },
                {
                  option: "",
                  status: "0",
                },
                {
                  option: "",
                  status: "0",
                },
              ],
            }}
            onSubmit={(value, action) => {
              handleAddEdit(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {console.log(props)}
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
                        onChange={(e) => {
                          props.setFieldValue("question_type", e.target.value);
                          props.setFieldValue("question", "");
                        }}
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
                    <Stack direction="row" className="gap-2">
                      {props.values.question_type === "1" ? (
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
                            component="label"
                            htmlFor={`questionfile`}
                          >
                            <Iconify
                              icon="ic:round-upload-file"
                              width={35}
                              color="text.secondary"
                            />
                            <input
                              hidden
                              accept={
                                props.values.question_type === FILE_TYPE.image
                                  ? "image/*"
                                  : props.values.question_type ===
                                    FILE_TYPE.audio
                                  ? "audio/*"
                                  : "video/*"
                              }
                              type="file"
                              id={`questionfile`}
                              onChange={(e) => {
                                props.setFieldValue(
                                  "question",
                                  e.currentTarget.files[0]
                                );
                              }}
                            />
                          </Box>
                          {!(props.values.question instanceof File) &&
                          !isEmpty(props.values.question) ? (
                            props.values.question_type === FILE_TYPE.image ? (
                              <ImageThumbnail
                                key={1}
                                size={100}
                                imagePath={props.values.question}
                              />
                            ) : props.values.question_type ===
                              FILE_TYPE.video ? (
                              <VedioThumbnail
                                key={1}
                                videoPath={props.values.question}
                                size={100}
                              />
                            ) : props.values.question_type ===
                              FILE_TYPE.audio ? (
                              <Box
                                sx={{
                                  width: 100,
                                  height: 100,
                                  p: 1,
                                  boxShadow: theme.shadows[3],
                                  backgroundColor:
                                    theme.palette.background.paper,
                                }}
                                className="rounded position-relative d-flex flex-column gap-3 align-items-center justify-content-center cursor-pointer"
                              >
                                <Box
                                  component="img"
                                  src={imageObj.audioIcon}
                                  sx={{ width: 40 }}
                                  onClick={() => {
                                    window.open(
                                      props.values.question,
                                      "_blank"
                                    );
                                  }}
                                />
                              </Box>
                            ) : null
                          ) : null}

                          {props.values.question instanceof File && (
                            <Stack direction="row" alignItems="center">
                              <Typography variant="body2">
                                {props.values.question?.name}
                              </Typography>
                              <IconButton
                                type="button"
                                color="error"
                                onClick={() => {
                                  props.setFieldValue("questions", "");
                                }}
                              >
                                <Iconify icon="mdi:remove" />
                              </IconButton>
                            </Stack>
                          )}
                        </>
                      )}
                    </Stack>
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
                        name="options_type"
                        value={props.values.options_type}
                        onChange={(e) => {
                          props.setFieldValue("options_type", e.target.value);
                          props.setFieldValue("data", [
                            {
                              option: "",
                              status: "0",
                            },
                            {
                              option: "",
                              status: "0",
                            },
                            {
                              option: "",
                              status: "0",
                            },
                            {
                              option: "",
                              status: "0",
                            },
                          ]);
                        }}
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
                  <Grid item xs={12} sx={{ paddingBottom: 5 }}>
                    <FieldArray
                      name="data"
                      render={({ push, remove }) => (
                        <>
                          {props.values.data && props.values.data.length > 0
                            ? props.values.data.map((item, index) => {
                                const optionName = `data[${index}].option`;
                                const optionError = getIn(
                                  props.errors,
                                  optionName
                                );
                                const optionTouched = getIn(
                                  props.touched,
                                  optionName
                                );
                                const optionContent = get(
                                  props.values,
                                  optionName
                                );

                                const status = `data[${index}].status`;
                                const statusContent = get(props.values, status);

                                return (
                                  <Stack
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    className="gap-2 mb-2"
                                  >
                                    <CMCheckBox
                                      checked={
                                        statusContent === "0" ? false : true
                                      }
                                      onChange={(e) => {
                                        props.setFieldValue(
                                          status,
                                          e.target.checked ? "1" : "0"
                                        );
                                      }}
                                    />
                                    {props.values.options_type === "1" ? (
                                      <TextField
                                        name={optionName}
                                        value={optionContent}
                                        onChange={(e) =>
                                          props.setFieldValue(
                                            optionName,
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
                                          component="label"
                                          htmlFor={`fileInput-${index}`}
                                        >
                                          <Iconify
                                            icon="ic:round-upload-file"
                                            width={35}
                                            color="text.secondary"
                                          />
                                          <input
                                            id={`fileInput-${index}`}
                                            hidden
                                            accept={
                                              props.values.options_type ===
                                              FILE_TYPE.image
                                                ? "image/*"
                                                : props.values.options_type ===
                                                  FILE_TYPE.audio
                                                ? "audio/*"
                                                : "video/*"
                                            }
                                            onChange={(e) => {
                                              props.setFieldValue(
                                                optionName,
                                                e.currentTarget.files[0]
                                              );
                                            }}
                                            type="file"
                                          />
                                        </Box>
                                        {!(optionContent instanceof File) &&
                                        !isEmpty(optionContent) ? (
                                          props.values.options_type ===
                                          FILE_TYPE.image ? (
                                            <ImageThumbnail
                                              key={1}
                                              size={100}
                                              imagePath={optionContent}
                                            />
                                          ) : props.values.options_type ===
                                            FILE_TYPE.video ? (
                                            <VedioThumbnail
                                              key={index}
                                              videoPath={optionContent}
                                              size={100}
                                            />
                                          ) : props.values.options_type ===
                                            FILE_TYPE.audio ? (
                                            <Box
                                              sx={{
                                                width: 100,
                                                height: 100,
                                                p: 1,
                                                boxShadow: theme.shadows[3],
                                                backgroundColor:
                                                  theme.palette.background
                                                    .paper,
                                              }}
                                              className="rounded position-relative d-flex flex-column gap-3 align-items-center justify-content-center cursor-pointer"
                                            >
                                              <Box
                                                component="img"
                                                src={imageObj.audioIcon}
                                                sx={{ width: 40 }}
                                                onClick={() => {
                                                  window.open(
                                                    optionContent,
                                                    "_blank"
                                                  );
                                                }}
                                              />
                                            </Box>
                                          ) : null
                                        ) : null}
                                      </>
                                    )}

                                    <IconButton
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      <Iconify icon="ic:round-minus" />
                                    </IconButton>

                                    {optionContent instanceof File && (
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                      >
                                        <Typography variant="body2">
                                          {optionContent.name}
                                        </Typography>
                                        <IconButton
                                          type="button"
                                          color="error"
                                          onClick={() => {
                                            props.setFieldValue(optionName, "");
                                          }}
                                        >
                                          <Iconify icon="mdi:remove" />
                                        </IconButton>
                                      </Stack>
                                    )}
                                  </Stack>
                                );
                              })
                            : null}
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="gap-2"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              padding: 1,
                              width: "100%",
                              background: "#fff",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                push({ id: "", option: "", status: "0" })
                              }
                            >
                              Satır Ekle
                            </Button>
                            <Button
                              variant="contained"
                              color="mint"
                              type="submit"
                            >
                              Kaydet
                            </Button>
                          </Stack>
                        </>
                      )}
                    />
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
