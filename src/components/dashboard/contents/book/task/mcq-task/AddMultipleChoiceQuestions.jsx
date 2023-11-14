import {
  Button,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import CMDialog from "components/common/dialog/CMDialog";
import { FieldArray, Formik, getIn } from "formik";
import { concat, get, includes, isEmpty, size, without } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addEditMCQTask,
  getMCQTaskList,
} from "redux/store/slice/dashboard/contentSlice";

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
              question: data.question ?? "",
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
                  <Grid item xs={12} className="mb-2">
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
