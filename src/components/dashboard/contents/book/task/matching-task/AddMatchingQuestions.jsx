import {
  Button,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";
import { FieldArray, Formik, getIn } from "formik";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addEditMatchingTask,
  getMatchingTaskList,
} from "redux/store/slice/dashboard/contentSlice";

const AddMatchingQuestions = (props) => {
  const { data, open, onClose } = props;
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");

  const handleAddEdit = (values) => {
    console.log("valid", values);
    const payload = {
      ...values,
      id: data ? data.id : "",
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
  };
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Eşleştirme sorularını buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Formik
            initialValues={{
              question: data.question ?? "",
              left_column: data.left_column ?? ["", "", "", ""],
              right_column: data.right_column ?? ["", "", "", ""],
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
                    <Stack direction="row" className="gap-2">
                      <Stack direction="column" className="gap-2 flex-grow-1">
                        <FieldArray
                          name="left_column"
                          render={(arrayHelpers) =>
                            props.values.left_column &&
                            props.values.left_column.length > 0
                              ? props.values.left_column.map((item, index) => {
                                  const leftColumn = `left_column[${index}]`;
                                  const leftColumnError = getIn(
                                    props.errors,
                                    leftColumn
                                  );
                                  const leftColumnTouched = getIn(
                                    props.touched,
                                    leftColumn
                                  );
                                  const leftColumnContent = get(
                                    props.values,
                                    leftColumn
                                  );
                                  return (
                                    <Stack
                                      key={index}
                                      direction="row"
                                      alignItems="center"
                                      className="gap-2 "
                                    >
                                      <Iconify
                                        icon="mingcute:dots-fill"
                                        width={20}
                                      />
                                      <TextField
                                        name={leftColumn}
                                        value={leftColumnContent}
                                        onChange={(e) =>
                                          props.setFieldValue(
                                            leftColumn,
                                            e.target.value
                                          )
                                        }
                                        onBlur={props.handleBlur}
                                        fullWidth
                                        size="small"
                                        error={
                                          leftColumnError && leftColumnTouched
                                            ? true
                                            : false
                                        }
                                        helperText={
                                          leftColumnError && leftColumnTouched
                                            ? leftColumnError
                                            : null
                                        }
                                      />
                                    </Stack>
                                  );
                                })
                              : null
                          }
                        />
                      </Stack>
                      <Stack direction="column" className="gap-2 flex-grow-1">
                        <FieldArray
                          name="right_column"
                          render={(arrayHelpers) =>
                            props.values.right_column &&
                            props.values.right_column.length > 0
                              ? props.values.right_column.map((item, index) => {
                                  const rightColumn = `right_column[${index}]`;
                                  const rightColumnError = getIn(
                                    props.errors,
                                    rightColumn
                                  );
                                  const rightColumnTouched = getIn(
                                    props.touched,
                                    rightColumn
                                  );
                                  const rightColumnContent = get(
                                    props.values,
                                    rightColumn
                                  );
                                  return (
                                    <TextField
                                      key={index}
                                      name={rightColumn}
                                      value={rightColumnContent}
                                      onChange={(e) =>
                                        props.setFieldValue(
                                          rightColumn,
                                          e.target.value
                                        )
                                      }
                                      onBlur={props.handleBlur}
                                      fullWidth
                                      size="small"
                                      error={
                                        rightColumnError && rightColumnTouched
                                          ? true
                                          : false
                                      }
                                      helperText={
                                        rightColumnError && rightColumnTouched
                                          ? rightColumnError
                                          : null
                                      }
                                    />
                                  );
                                })
                              : null
                          }
                        />
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      className="gap-2 mt-3"
                    >
                      <Button variant="contained" color="secondary">
                        Satır Ekle
                      </Button>
                      <Button variant="contained" color="info" type="submit">
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

export default AddMatchingQuestions;
