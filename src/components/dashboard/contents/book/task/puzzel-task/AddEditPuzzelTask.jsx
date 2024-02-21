import {
  Button,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import { Formik } from "formik";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addEditPuzzelTask,
  getPuzzelTaskList,
} from "redux/store/slice/dashboard/contentSlice";

const AddEditPuzzelTask = (props) => {
  const { open, onClose, data } = props;
  const dispatch = useDispatch();
  const book_id = localStorage.getItem("bookId");
  const handleAddEdit = (values) => {
    const htmlContent = `<iframe width="100%" height="100%" src=${values.data} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    const payload = {
      ...values,
      id: isEmpty(data) ? "" : data.id,
      book_id: book_id,
      data: htmlContent,
      puzzel_link: values.data,
    };
    dispatch(addEditPuzzelTask(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          const param = {
            book_id: book_id,
            page: 1,
          };

          dispatch(getPuzzelTaskList(param));
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
        dialogTitle="Sürükle bırak sorularını buradan ekleyin"
        maxWidth="md"
      >
        <DialogContent>
          <Formik
            initialValues={{
              title: data.title ?? "",
              data: data.puzzel_link ?? "",
              puzzel_link: data.puzzel_link ?? "",
            }}
            onSubmit={(value, action) => {
              handleAddEdit(value, action);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Typography
                  variant="subtitle1"
                  color="text.primary"
                  className="my-3"
                >
                  Bulmacayı buradan ekleyin
                </Typography>
                <Grid container className="gap-3">
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      placeholder="Oyun Adı"
                      value={props.values.title}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                      size="small"
                      error={
                        props.errors.title && props.touched.title ? true : false
                      }
                      helperText={
                        props.errors.title && props.touched.title
                          ? props.errors.title
                          : null
                      }
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
              <TextField
                name="className"
                multiline
                rows={4}
                placeholder="3000 kelimeye kadar puzzle kelimelerini veya ipuçlarını yazın."
                fullWidth
              />

              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Açıklamaların bulmacanın altında görünmesini istiyorsanız bu
                  kutuyu işaretleyin"
              />
            </Grid> */}
                  <Grid item xs={12}>
                    {/* <RichTextEditor
                      name="data"
                      value={props.values.data}
                      setFieldValue={props.setFieldValue}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.data && props.touched.data ? true : false
                      }
                      helperText={
                        props.errors.data && props.touched.data
                          ? props.errors.data
                          : null
                      }
                    /> */}
                    <TextField
                      name="data"
                      value={props.values.data}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      fullWidth
                      placeholder="Gömülü Bağlantıyı Buraya GirinF"
                      size="small"
                      error={
                        props.errors.data && props.touched.data ? true : false
                      }
                      helperText={
                        props.errors.data && props.touched.data
                          ? props.errors.data
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} className="text-right">
                    <Button type="submit" variant="contained" color="warning">
                      Oyun ekle
                    </Button>
                  </Grid>
                </Grid>{" "}
              </form>
            )}
          </Formik>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddEditPuzzelTask;
