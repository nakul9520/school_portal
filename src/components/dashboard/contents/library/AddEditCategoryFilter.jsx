import {
  Box,
  Button,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  filterAddEdit,
  getFilterList,
} from "redux/store/slice/dashboard/contentSlice";

const AddEditCategoryFilter = (props) => {
  const { open, onClose, categoryId, filterId, filterData } = props;
  const dispatch = useDispatch();

  const handleAddEdit = (values) => {
    console.log("values", values);

    const payload = {
      ...values,
      id: filterId ?? "",
      category_id: categoryId,
    };
    dispatch(filterAddEdit(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);

          dispatch(
            getFilterList({
              category_id: categoryId,
              search: "",
              per_page: 10,
            })
          )
            .unwrap()
            .then((res) => {
              console.log("res", res);
              if (res.sucsess) {
                onClose();
              }
            });
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
        // closeIcon={true}
      >
        <Formik
          initialValues={{
            filter_name: filterData.filter_name ?? "",
          }}
          onSubmit={(value, action) => {
            handleAddEdit(value, action);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="h-100">
              <DialogContent>
                <Box className="mb-3">
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        color="text.primary"
                        className="mb-3"
                      >
                        Alt-Kategori ekle
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="filter_name"
                        value={props.values.filter_name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        fullWidth
                        size="small"
                        placeholder="Alt-Kategori"
                        error={
                          props.errors.filter_name && props.touched.filter_name
                            ? true
                            : false
                        }
                        helperText={
                          props.errors.filter_name && props.touched.filter_name
                            ? props.errors.filter_name
                            : null
                        }
                      />
                      <Box className="mt-3">
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          size="small"
                        >
                          Kaydet
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
            </form>
          )}
        </Formik>
      </CMDialog>
    </>
  );
};

export default AddEditCategoryFilter;
