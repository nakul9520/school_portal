import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import BackButton from "components/common/BackButton";
import RichTextEditor from "components/common/editor/RichTextEditor";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addEditGuideLine,
  getGuideLineList,
} from "redux/store/slice/dashboard/contentSlice";

const AddEditLegalDocuments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { guideLinesData, loading } = useSelector((state) => state.content);
  const [guideLineType, setGuideLineType] = React.useState(1);

  const handleChange = (event) => {
    setGuideLineType(event.target.value);
  };

  useEffect(() => {
    dispatch(getGuideLineList(guideLineType));
  }, [dispatch, guideLineType]);

  const handleAddEdit = (values, action) => {
    const data = {
      ...values,
      id: guideLinesData.id ? guideLinesData.id : "",
      type: guideLineType,
    };
    dispatch(addEditGuideLine(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          navigate("/dashboard/contents/platform-design");
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
      {loading ? (
        <LinearProgress />
      ) : (
        <Formik
          initialValues={{
            description: guideLinesData.description ?? "",
          }}
          onSubmit={(value, action) => {
            handleAddEdit(value, action);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="h-100">
              <Grid container className="mt-2" spacing={2}>
                <Grid item xs={12} sm={8} md={5} lg={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Guidelines
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={guideLineType}
                      label="Guidelines"
                      onChange={handleChange}
                      size="small"
                    >
                      <MenuItem value={1}>Terms & Conditions</MenuItem>
                      <MenuItem value={2}>Privacy-policy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12} className="text-right">
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className="rounded-0"
                  >
                    Kaydet
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddEditLegalDocuments;
