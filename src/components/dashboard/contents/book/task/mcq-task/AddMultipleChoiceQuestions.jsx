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
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";
import { FieldArray, Formik, getIn } from "formik";
import { get, includes, isEmpty, map, size, without } from "lodash";
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
              question: data.question ?? [],
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
                          props.setFieldValue("question", [""]);
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
                            accept="image/*,audio/*,video/*"
                            type="file"
                            id={`questionfile`}
                            onChange={(e) => {
                              props.setFieldValue("question", [
                                e.currentTarget.files[0],
                              ]);
                            }}
                          />
                        </Box>
                        {!isEmpty(props.values.question[0]) && (
                          <Stack direction="row" alignItems="center">
                            <Typography variant="body2">
                              {props.values.question[0].name}
                            </Typography>
                            <IconButton
                              type="button"
                              color="error"
                              onClick={() => {
                                props.setFieldValue("questions", [""]);
                              }}
                            >
                              <Iconify icon="mdi:remove" />
                            </IconButton>
                          </Stack>
                        )}
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
                        onChange={(e) => {
                          props.setFieldValue("option_type", e.target.value);
                          props.setFieldValue("options", ["", "", "", ""]);
                          props.setFieldValue("answer", []);
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
                      name="options"
                      render={({ push, remove }) => (
                        <>
                          {props.values.options &&
                          props.values.options.length > 0
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
                                    className="gap-2 mb-2"
                                  >
                                    {console.log("option", optionContent)}
                                    <CMCheckBox
                                      disabled={
                                        props.values.option_type === 1
                                          ? isEmpty(optionContent)
                                          : typeof optionContent !== "object"
                                      }
                                      checked={includes(
                                        props.values.answer,
                                        optionContent
                                      )}
                                      onChange={(e) => {
                                        const { answer } = props.values;
                                        const updatedAnswer = includes(
                                          answer,
                                          optionContent
                                        )
                                          ? without(answer, optionContent) // Remove if already exists
                                          : [optionContent]; // Add if not exists or replace existing with the current value

                                        props.setFieldValue(
                                          "answer",
                                          updatedAnswer
                                        );
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
                                            accept="image/*,audio/*,video/*"
                                            onChange={(e) => {
                                              props.setFieldValue(
                                                option,
                                                e.currentTarget.files[0]
                                              );
                                            }}
                                            type="file"
                                          />
                                        </Box>
                                      </>
                                    )}
                                    <IconButton
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      <Iconify icon="ic:round-minus" />
                                    </IconButton>
                                    {optionContent && (
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
                                            props.setFieldValue(option, "");
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
                            onClick={() => push("")}
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              padding: 1,
                              width: "100%",
                              background: "#fff",
                            }}
                          >
                            <Button variant="contained" color="secondary">
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
