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
import Iconify from "components/common/iconify";
import ImageThumbnail from "components/common/thumbnail/ImageThumbnail";
import VedioThumbnail from "components/common/thumbnail/VedioThumbnail";
import { FieldArray, Formik, getIn } from "formik";
import { get, isEmpty, map } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editMatchingTask } from "redux/store/slice/dashboard/contentSlice";
import {
  addEditMatchingTask,
  getMatchingTaskList,
} from "redux/store/slice/dashboard/contentSlice";
import { FILE_TYPE, QuizType } from "services/constant";
import { imageObj } from "services/images";

const AddMatchingQuestions = (props) => {
  const { data, open, onClose } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const book_id = localStorage.getItem("bookId");

  const handleAddEdit = (values) => {
    console.log("valid", values);
    let payload;

    if (isEmpty(data)) {
      payload = {
        ...values,
        book_id: book_id,
      };
      dispatch(addEditMatchingTask(payload))
        .unwrap()
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            const param = {
              book_id: book_id,
              page: 1,
            };

            dispatch(getMatchingTaskList(param));
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
        left_column_id:
          data.left_column_type === values.left_column_type
            ? []
            : data.left_column.reduce((accumulator, obj, index) => {
                accumulator[index] = obj.id;
                return accumulator;
              }, {}),
        right_column_id:
          data.right_column_type === values.right_column_type
            ? []
            : data.right_column.reduce((accumulator, obj, index) => {
                accumulator[index] = obj.id;
                return accumulator;
              }, {}),
        left_column: values.left_column.map((item) => ({
          ...item,
          is_edit:
            values.left_column_type !== FILE_TYPE.text
              ? item.data && item.data instanceof File
                ? 1
                : 0
              : 1, // Check if there's any file in options
        })),
        right_column: values.right_column.map((item) => ({
          ...item,
          is_edit:
            values.right_column_type !== FILE_TYPE.text
              ? item.data && item.data instanceof File
                ? 1
                : 0
              : 1, // Check if there's any file in options
        })),
      };
      console.log("payload", payload);
      dispatch(editMatchingTask(payload))
        .unwrap()
        .then((result) => {
          if (result.success) {
            toast.success(result.message);
            const param = {
              book_id: book_id,
              page: 1,
            };

            dispatch(getMatchingTaskList(param));
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
        dialogTitle="Eşleştirme sorularını buradan ekleyin"
        maxWidth="lg"
      >
        <DialogContent>
          <Formik
            initialValues={{
              question_type: data.question_type ?? "1",
              question: data.question ?? [],
              left_column_type: data.left_column_type ?? "1",
              right_column_type: data.right_column_type ?? "1",
              left_column_id: [],
              right_column_id: [],
              left_column: data.left_column ?? [
                {
                  data: "",
                },
                {
                  data: "",
                },
                {
                  data: "",
                },
                {
                  data: "",
                },
              ],
              right_column: data.right_column ?? [
                {
                  data: "",
                },
                {
                  data: "",
                },
                {
                  data: "",
                },
                {
                  data: "",
                },
              ],
            }}
            onSubmit={(value, action) => {
              handleAddEdit(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {console.log("props", props)}
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
                  <Grid item xs={12} sm={5.9} className="mb-2">
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      className="my-2"
                    >
                      Type of Left Options
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="left_column_type"
                        value={props.values.left_column_type}
                        onChange={(e) => {
                          props.setFieldValue(
                            "left_column_type",
                            e.target.value
                          );
                          props.setFieldValue("left_column", [
                            {
                              data: "",
                            },
                            {
                              data: "",
                            },
                            {
                              data: "",
                            },
                            {
                              data: "",
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
                  <Grid item xs={12} sm={5.9} className="mb-2">
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      className="my-2"
                    >
                      Type of Right Options
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="right_column_type"
                        value={props.values.right_column_type}
                        onChange={(e) => {
                          props.setFieldValue(
                            "right_column_type",
                            e.target.value
                          );
                          props.setFieldValue("right_column", [
                            {
                              data: "",
                            },
                            {
                              data: "",
                            },
                            {
                              data: "",
                            },
                            {
                              data: "",
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

                  <Grid item xs={12} sm={5.9} sx={{ paddingBottom: 12 }}>
                    <FieldArray
                      name="left_column"
                      render={({ push, remove }) => (
                        <>
                          {props.values.left_column &&
                          props.values.left_column.length > 0
                            ? props.values.left_column.map((item, index) => {
                                const optionName = `left_column[${index}].data`;
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

                                return (
                                  <Stack
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    className="gap-2 mb-2"
                                  >
                                    {props.values.left_column_type === "1" ? (
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
                                              props.values.left_column_type ===
                                              FILE_TYPE.image
                                                ? "image/*"
                                                : props.values
                                                    .left_column_type ===
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
                                          props.values.left_column_type ===
                                          FILE_TYPE.image ? (
                                            <ImageThumbnail
                                              key={1}
                                              size={100}
                                              imagePath={optionContent}
                                            />
                                          ) : props.values.left_column_type ===
                                            FILE_TYPE.video ? (
                                            <VedioThumbnail
                                              key={index}
                                              videoPath={optionContent}
                                              size={100}
                                            />
                                          ) : props.values.left_column_type ===
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
                              bottom: 50,
                              left: 0,
                              padding: "16px 10px",
                              width: "50%",
                              backgroundColor: "primary.contrastText",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => push({ id: "", data: "" })}
                            >
                              Satır Ekle
                            </Button>
                          </Stack>
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5.9} sx={{ paddingBottom: 12 }}>
                    <FieldArray
                      name="right_column"
                      render={({ push, remove }) => (
                        <>
                          {props.values.right_column &&
                          props.values.right_column.length > 0
                            ? props.values.right_column.map((item, index) => {
                                const optionName = `right_column[${index}].data`;
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

                                return (
                                  <Stack
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    className="gap-2 mb-2"
                                  >
                                    {props.values.right_column_type === "1" ? (
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
                                          htmlFor={`right-fileInput-${index}`}
                                        >
                                          <Iconify
                                            icon="ic:round-upload-file"
                                            width={35}
                                            color="text.secondary"
                                          />
                                          <input
                                            id={`right-fileInput-${index}`}
                                            hidden
                                            accept={
                                              props.values.right_column_type ===
                                              FILE_TYPE.image
                                                ? "image/*"
                                                : props.values
                                                    .right_column_type ===
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
                                          props.values.right_column_type ===
                                          FILE_TYPE.image ? (
                                            <ImageThumbnail
                                              key={1}
                                              size={100}
                                              imagePath={optionContent}
                                            />
                                          ) : props.values.right_column_type ===
                                            FILE_TYPE.video ? (
                                            <VedioThumbnail
                                              key={index}
                                              videoPath={optionContent}
                                              size={100}
                                            />
                                          ) : props.values.right_column_type ===
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
                            justifyContent="end"
                            className="gap-2"
                            sx={{
                              position: "absolute",
                              bottom: 50,
                              right: 0,
                              padding: "16px 10px",
                              width: "50%",
                              backgroundColor: "primary.contrastText",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => push({ id: "", data: "" })}
                            >
                              Satır Ekle
                            </Button>
                          </Stack>
                        </>
                      )}
                    />
                  </Grid>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      padding: 1,
                      width: "100%",
                      backgroundColor: "primary.contrastText",
                      textAlign: "right",
                    }}
                  >
                    <Button variant="contained" color="mint" type="submit">
                      Kaydet
                    </Button>
                  </Box>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddMatchingQuestions;
