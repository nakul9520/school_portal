import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTheme } from "@mui/material/styles";
import BackButton from "components/common/BackButton";
import Iconify from "components/common/iconify";
import { FieldArray, Formik, getIn } from "formik";
import { get, isEmpty, omit } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addBookFiles,
  addBookTitle,
  getFilterList,
} from "redux/store/slice/dashboard/contentSlice";
import { BOOK_FILE_TYPE, categoryName } from "services/constant";

import {
  addAudioFileValidation,
  addFileTitleValidation,
} from "services/validations";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const AddBookTopic = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState({ categoryId: 1 });
  const bookId = localStorage.getItem("bookId");
  const [activeTaskBtn, setActiveTaskBtn] = useState(true);
  const { state } = useLocation();
  const bookData = state ?? {};
  const { filterList, loading } = useSelector((state) => state.content);
  const filterListData = filterList.data ?? [];

  const handleCategoryChange = (data) => {
    setCategoryData(data);
    dispatch(
      getFilterList({
        category_id: data.categoryId,
        search: "",
        per_page: 10,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getFilterList({
        category_id: 1,
        search: "",
        per_page: 10,
      })
    );
  }, [dispatch]);

  //remove book id when component is unmounted
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("bookId");
  //   };
  // }, []);

  const handleAddBookTitle = (values) => {
    const data = omit(values, [
      "grade_name",
      "pypthemes_name",
      "generalthemes_name",
      "objectives_name",
      "series_name",
    ]);
    const payload = {
      ...data,
      id: bookData.id ?? "",
    };
    dispatch(addBookTitle(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setActiveTaskBtn(false);
          localStorage.setItem("bookId", result.data);
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleAddBookFile = (values, fileType) => {
    if (bookId) {
      const filteredFiles = values.data.filter((item) => {
        return typeof item.file === "object";
      });

      if (!isEmpty(filteredFiles)) {
        const data = {
          ...values,
          data: filteredFiles,
          book_id: bookId,
          file_type: fileType,
        };
        dispatch(addBookFiles(data))
          .unwrap()
          .then((result) => {
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
            console.log("Error: ", err);
          });
      } else {
        toast.error("Please Add a new File");
      }
    } else {
      toast.error("You Need to add First Book Title");
    }
  };

  return (
    <>
      <BackButton />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Formik
            initialValues={{
              book_name: bookData.book_name ?? "",
              book_description: bookData.book_description ?? "",
              grade: bookData.grade ?? 0,
              grade_name: bookData.grade_name ?? "",
              pypthemes: bookData.pypthemes ?? 0,
              pypthemes_name: bookData.pypthemes_name ?? "",
              generalthemes: bookData.generalthemes ?? 0,
              generalthemes_name: bookData.generalthemes_name ?? "",
              objectives: bookData.objectives ?? 0,
              objectives_name: bookData.objectives_name ?? "",
              series: bookData.series ?? 0,
              series_name: bookData.series_name ?? "",
            }}
            validationSchema={addFileTitleValidation}
            onSubmit={(value) => {
              handleAddBookTitle(value);
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    p: 2,
                    boxShadow: theme.shadows[3],
                  }}
                  className="mb-3"
                >
                  <Box className="mb-3">
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      className="mb-2"
                    >
                      kitap adi ekle
                    </Typography>
                    <TextField
                      name="book_name"
                      value={values.book_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      placeholder="kitap adi ekle"
                      error={
                        errors.book_name && touched.book_name ? true : false
                      }
                      helperText={
                        errors.book_name && touched.book_name
                          ? errors.book_name
                          : null
                      }
                    />
                  </Box>
                  <Box className="mb-3">
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      className="mb-2"
                    >
                      kitap Başlık ekle
                    </Typography>
                    <TextField
                      name="book_description"
                      value={values.book_description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      placeholder="kitap Başlık ekle"
                      error={
                        errors.book_description && touched.book_description
                          ? true
                          : false
                      }
                      helperText={
                        errors.book_description && touched.book_description
                          ? errors.book_description
                          : null
                      }
                    />
                  </Box>
                  <Box className="mb-3">
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="gap-2 overflow-scroll scrollbar-none"
                      mt={2}
                    >
                      {categoryName.map((item, index) => (
                        <Box
                          className="table_bottom_tabs text-right"
                          key={index}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            color={
                              categoryData.categoryId === item.categoryId
                                ? "secondary"
                                : "primary"
                            }
                            onClick={() => handleCategoryChange(item)}
                          >
                            {item.title}
                          </Button>
                        </Box>
                      ))}
                    </Stack>

                    <Box className="w-100 pt-2">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="mb-2"
                      >
                        Sub Category
                      </Typography>
                      {categoryData.categoryId === 1 ? (
                        <Autocomplete
                          getOptionLabel={(option) =>
                            option.filter_name ?? option
                          }
                          options={filterListData}
                          disabled={categoryData.categoryId === ""}
                          name="grade_name"
                          value={values.grade_name ?? ""}
                          isOptionEqualToValue={(option, value) => {
                            if (value === "" || option.filter_name === value) {
                              return true;
                            }
                          }}
                          onChange={(e, value) => {
                            setFieldValue("grade", value.id);
                            setFieldValue("grade_name", value.filter_name);
                          }}
                          autoHighlight
                          disableClearable
                          noOptionsText="Veri yok"
                          loading={loading}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="grade_name"
                              size="small"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                                endadornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endadornment}
                                  </React.Fragment>
                                ),
                              }}
                              error={
                                errors.grade_name && touched.grade_name
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.grade_name && touched.grade_name
                                  ? errors.grade_name
                                  : null
                              }
                            />
                          )}
                        />
                      ) : categoryData.categoryId === 2 ? (
                        <Autocomplete
                          getOptionLabel={(option) =>
                            option.filter_name ?? option
                          }
                          options={filterListData}
                          disabled={categoryData.categoryId === ""}
                          name="pypthemes_name"
                          value={values.pypthemes_name ?? ""}
                          isOptionEqualToValue={(option, value) => {
                            if (value === "" || option.filter_name === value) {
                              return true;
                            }
                          }}
                          onChange={(e, value) => {
                            setFieldValue("pypthemes", value.id);
                            setFieldValue("pypthemes_name", value.filter_name);
                          }}
                          autoHighlight
                          disableClearable
                          noOptionsText="Veri yok"
                          loading={loading}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="pypthemes_name"
                              size="small"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                                endadornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endadornment}
                                  </React.Fragment>
                                ),
                              }}
                              error={
                                errors.pypthemes_name && touched.pypthemes_name
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.pypthemes_name && touched.pypthemes_name
                                  ? errors.pypthemes_name
                                  : null
                              }
                            />
                          )}
                        />
                      ) : categoryData.categoryId === 3 ? (
                        <Autocomplete
                          getOptionLabel={(option) =>
                            option.filter_name ?? option
                          }
                          options={filterListData}
                          disabled={categoryData.categoryId === ""}
                          name="generalthemes_name"
                          value={values.generalthemes_name ?? ""}
                          isOptionEqualToValue={(option, value) => {
                            if (value === "" || option.filter_name === value) {
                              return true;
                            }
                          }}
                          onChange={(e, value) => {
                            setFieldValue("generalthemes", value.id);
                            setFieldValue(
                              "generalthemes_name",
                              value.filter_name
                            );
                          }}
                          autoHighlight
                          disableClearable
                          noOptionsText="Veri yok"
                          loading={loading}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="generalthemes_name"
                              size="small"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                                endadornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endadornment}
                                  </React.Fragment>
                                ),
                              }}
                              error={
                                errors.generalthemes_name &&
                                touched.generalthemes_name
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.generalthemes_name &&
                                touched.generalthemes_name
                                  ? errors.generalthemes_name
                                  : null
                              }
                            />
                          )}
                        />
                      ) : categoryData.categoryId === 4 ? (
                        <Autocomplete
                          getOptionLabel={(option) =>
                            option.filter_name ?? option
                          }
                          options={filterListData}
                          disabled={categoryData.categoryId === ""}
                          name="objectives_name"
                          value={values.objectives_name ?? ""}
                          isOptionEqualToValue={(option, value) => {
                            if (value === "" || option.filter_name === value) {
                              return true;
                            }
                          }}
                          onChange={(e, value) => {
                            setFieldValue("objectives", value.id);
                            setFieldValue("objectives_name", value.filter_name);
                          }}
                          autoHighlight
                          disableClearable
                          noOptionsText="Veri yok"
                          loading={loading}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="objectives_name"
                              size="small"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                                endadornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endadornment}
                                  </React.Fragment>
                                ),
                              }}
                              error={
                                errors.objectives_name &&
                                touched.objectives_name
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.objectives_name &&
                                touched.objectives_name
                                  ? errors.objectives_name
                                  : null
                              }
                            />
                          )}
                        />
                      ) : categoryData.categoryId === 5 ? (
                        <Autocomplete
                          getOptionLabel={(option) =>
                            option.filter_name ?? option
                          }
                          options={filterListData}
                          disabled={categoryData.categoryId === ""}
                          name="series_name"
                          value={values.series_name ?? ""}
                          isOptionEqualToValue={(option, value) => {
                            if (value === "" || option.filter_name === value) {
                              return true;
                            }
                          }}
                          onChange={(e, value) => {
                            setFieldValue("series", value.id);
                            setFieldValue("series_name", value.filter_name);
                          }}
                          autoHighlight
                          disableClearable
                          noOptionsText="Veri yok"
                          loading={loading}
                          className="w-100"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              name="series_name"
                              size="small"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password",
                                endadornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endadornment}
                                  </React.Fragment>
                                ),
                              }}
                              error={
                                errors.series_name && touched.series_name
                                  ? true
                                  : false
                              }
                              helperText={
                                errors.series_name && touched.series_name
                                  ? errors.series_name
                                  : null
                              }
                            />
                          )}
                        />
                      ) : null}
                    </Box>
                  </Box>
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
                </Box>
              </form>
            )}
          </Formik>

          <Formik
            initialValues={{
              data: bookData.audioData ?? [
                { id: "", page_name: "List 1", file: "" },
              ],
            }}
            validationSchema={addAudioFileValidation}
            onSubmit={(value) => {
              handleAddBookFile(value, BOOK_FILE_TYPE.audio);
            }}
          >
            {({ values, handleSubmit, handleBlur, setFieldValue, errors }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    p: 2,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    className="mb-3"
                  >
                    Kitap Ses Dosyası Ekle
                  </Typography>
                  <FieldArray
                    name="data"
                    render={(arrayHelpers) => (
                      <>
                        <TableContainer
                          component={Paper}
                          className="rounded-0 mt-3 scrollbar-none"
                          sx={{ maxHeight: 240 }}
                        >
                          <StyledTable stickyHeader>
                            <TableHead
                              sx={{ backgroundColor: "primary.contrastText" }}
                            >
                              <TableRow>
                                <StyledTableCell align="left">
                                  Liste
                                </StyledTableCell>
                                <StyledTableCell>Ses</StyledTableCell>
                                <StyledTableCell>Yükle</StyledTableCell>
                                <StyledTableCell>Sil</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values.data && values.data.length > 0
                                ? values.data.map((item, index) => {
                                    const file = `data[${index}].file`;
                                    const errorFile = getIn(errors, file);
                                    const fileContent = get(values, file);
                                    return (
                                      <StyledTableRow key={index}>
                                        <StyledTableCell align="left">
                                          List {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell
                                          align="left"
                                          sx={{
                                            border: errorFile
                                              ? `0.5px solid ${theme.palette.error.main}`
                                              : `0.5px solid ${theme.palette.text.secondary}`,
                                          }}
                                        >
                                          Audio {index + 1}
                                          {fileContent ? (
                                            typeof fileContent === "object" ? (
                                              <Stack
                                                direction="row"
                                                className="gap-2"
                                              >
                                                <Typography variant="subtitle2">
                                                  {fileContent.name}
                                                </Typography>
                                                <Iconify
                                                  icon="ic:round-close"
                                                  onClick={() => {
                                                    setFieldValue(file, "");
                                                  }}
                                                />
                                              </Stack>
                                            ) : (
                                              <IconButton
                                                size="small"
                                                onClick={() => {
                                                  window.open(
                                                    fileContent,
                                                    "_blank"
                                                  );
                                                }}
                                              >
                                                <Iconify
                                                  icon="ph:play-bold"
                                                  width={14}
                                                />
                                              </IconButton>
                                            )
                                          ) : null}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            component="label"
                                          >
                                            Upload
                                            <input
                                              hidden
                                              accept="audio/*"
                                              onChange={(event) => {
                                                setFieldValue(
                                                  file,
                                                  event.target.files[0]
                                                );
                                              }}
                                              onBlur={handleBlur}
                                              name={file}
                                              // multiple
                                              type="file"
                                            />
                                          </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            className="cursor-pointer"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            Delete
                                          </Typography>
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </StyledTable>
                        </TableContainer>

                        <Stack
                          direction="row"
                          alignItems="center"
                          className="gap-2 mt-3"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Kaydet
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              arrayHelpers.push({
                                id: "",
                                page_name: "",
                                file: "",
                              })
                            }
                          >
                            Satır Ekle
                          </Button>
                        </Stack>
                      </>
                    )}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </Grid>

        <Grid item xs={6}>
          <Box className="mb-3">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              disabled={activeTaskBtn && isEmpty(bookId)}
              onClick={() =>
                navigate("/dashboard/contents/create-book-event", {
                  state: { book_id: bookId },
                })
              }
            >
              Kitap etkinlikleri oluştur ve ekle
            </Button>
          </Box>

          <Formik
            initialValues={{
              data: bookData.imageData ?? [
                { id: "", page_name: "List 1", file: "" },
              ],
            }}
            validationSchema={addAudioFileValidation}
            onSubmit={(value) => {
              handleAddBookFile(value, BOOK_FILE_TYPE.image);
            }}
          >
            {({ values, handleSubmit, handleBlur, setFieldValue, errors }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    p: 2,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    className="mb-3"
                  >
                    Kitap Sayfaları Ekle
                  </Typography>
                  <FieldArray
                    name="data"
                    render={(arrayHelpers) => (
                      <>
                        <TableContainer
                          component={Paper}
                          className="rounded-0 mt-3 scrollbar-none"
                          sx={{ maxHeight: 240 }}
                        >
                          <StyledTable stickyHeader>
                            <TableHead
                              sx={{ backgroundColor: "primary.contrastText" }}
                            >
                              <TableRow>
                                <StyledTableCell align="left">
                                  Liste
                                </StyledTableCell>
                                <StyledTableCell>Ses</StyledTableCell>
                                <StyledTableCell>Yükle</StyledTableCell>
                                <StyledTableCell>Sil</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values.data && values.data.length > 0
                                ? values.data.map((item, index) => {
                                    const file = `data[${index}].file`;
                                    const errorFile = getIn(errors, file);
                                    const fileContent = get(values, file);
                                    return (
                                      <StyledTableRow key={index}>
                                        <StyledTableCell align="left">
                                          List {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell
                                          align="left"
                                          sx={{
                                            border: errorFile
                                              ? `0.5px solid ${theme.palette.error.main}`
                                              : `0.5px solid ${theme.palette.text.secondary}`,
                                          }}
                                        >
                                          Image {index + 1}
                                          {fileContent ? (
                                            typeof fileContent === "object" ? (
                                              <Stack
                                                direction="row"
                                                className="gap-2"
                                              >
                                                <Typography variant="subtitle2">
                                                  {fileContent.name}
                                                </Typography>
                                                <Iconify
                                                  icon="ic:round-close"
                                                  onClick={() => {
                                                    setFieldValue(file, "");
                                                  }}
                                                />
                                              </Stack>
                                            ) : (
                                              <IconButton
                                                size="small"
                                                onClick={() => {
                                                  window.open(
                                                    fileContent,
                                                    "_blank"
                                                  );
                                                }}
                                              >
                                                <Iconify
                                                  icon="carbon:view"
                                                  width={14}
                                                />
                                              </IconButton>
                                            )
                                          ) : null}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            component="label"
                                          >
                                            Upload
                                            <input
                                              hidden
                                              accept="image/*"
                                              onChange={(event) => {
                                                setFieldValue(
                                                  file,
                                                  event.target.files[0]
                                                );
                                              }}
                                              onBlur={handleBlur}
                                              name={file}
                                              // multiple
                                              type="file"
                                            />
                                          </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            className="cursor-pointer"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            Delete
                                          </Typography>
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </StyledTable>
                        </TableContainer>

                        <Stack
                          direction="row"
                          alignItems="center"
                          className="gap-2 mt-3"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Kaydet
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              arrayHelpers.push({
                                id: "",
                                page_name: "",
                                file: "",
                              })
                            }
                          >
                            Satır Ekle
                          </Button>
                        </Stack>
                      </>
                    )}
                  />
                </Box>
              </form>
            )}
          </Formik>

          <Formik
            initialValues={{
              data: bookData.pdfData ?? [
                { id: "", page_name: "List 1", file: "" },
              ],
            }}
            validationSchema={addAudioFileValidation}
            onSubmit={(value) => {
              handleAddBookFile(value, BOOK_FILE_TYPE.document);
            }}
          >
            {({ values, handleSubmit, handleBlur, setFieldValue, errors }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    p: 2,
                    mt: 2,
                    boxShadow: theme.shadows[3],
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    className="mb-3"
                  >
                    İndirilebilir PDFler YARDIM Ekle
                  </Typography>
                  <FieldArray
                    name="data"
                    render={(arrayHelpers) => (
                      <>
                        <TableContainer
                          component={Paper}
                          className="rounded-0 mt-3 scrollbar-none"
                          sx={{ maxHeight: 240 }}
                        >
                          <StyledTable stickyHeader>
                            <TableHead
                              sx={{ backgroundColor: "primary.contrastText" }}
                            >
                              <TableRow>
                                <StyledTableCell align="left">
                                  Liste
                                </StyledTableCell>
                                <StyledTableCell>Ses</StyledTableCell>
                                <StyledTableCell>Yükle</StyledTableCell>
                                <StyledTableCell>Sil</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values.data && values.data.length > 0
                                ? values.data.map((item, index) => {
                                    const file = `data[${index}].file`;
                                    const errorFile = getIn(errors, file);
                                    const fileContent = get(values, file);
                                    return (
                                      <StyledTableRow key={index}>
                                        <StyledTableCell align="left">
                                          List {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell
                                          align="left"
                                          sx={{
                                            border: errorFile
                                              ? `0.5px solid ${theme.palette.error.main}`
                                              : `0.5px solid ${theme.palette.text.secondary}`,
                                          }}
                                        >
                                          Image {index + 1}
                                          {fileContent ? (
                                            typeof fileContent === "object" ? (
                                              <Stack
                                                direction="row"
                                                className="gap-2"
                                              >
                                                <Typography variant="subtitle2">
                                                  {fileContent.name}
                                                </Typography>
                                                <Iconify
                                                  icon="ic:round-close"
                                                  onClick={() => {
                                                    setFieldValue(file, "");
                                                  }}
                                                />
                                              </Stack>
                                            ) : (
                                              <IconButton
                                                size="small"
                                                onClick={() => {
                                                  window.open(
                                                    fileContent,
                                                    "_blank"
                                                  );
                                                }}
                                              >
                                                <Iconify
                                                  icon="carbon:view"
                                                  width={14}
                                                />
                                              </IconButton>
                                            )
                                          ) : null}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            component="label"
                                          >
                                            Upload
                                            <input
                                              hidden
                                              accept="*"
                                              onChange={(event) => {
                                                setFieldValue(
                                                  file,
                                                  event.target.files[0]
                                                );
                                              }}
                                              onBlur={handleBlur}
                                              name={file}
                                              // multiple
                                              type="file"
                                            />
                                          </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                          <Typography
                                            variant="subtitle2"
                                            className="cursor-pointer"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            Delete
                                          </Typography>
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    );
                                  })
                                : null}
                            </TableBody>
                          </StyledTable>
                        </TableContainer>

                        <Stack
                          direction="row"
                          alignItems="center"
                          className="gap-2 mt-3"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Kaydet
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              arrayHelpers.push({
                                id: "",
                                page_name: "",
                                file: "",
                              })
                            }
                          >
                            Satır Ekle
                          </Button>
                        </Stack>
                      </>
                    )}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default AddBookTopic;
