import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
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
import Iconify from "components/common/iconify";
import { FieldArray, Formik, getIn } from "formik";
import { filter, get, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilterList } from "redux/store/slice/dashboard/contentSlice";
import {
  addBookFiles,
  addBookTitle,
} from "redux/store/slice/dashboard/contentSlice";
import { FILE_TYPE } from "services/constant";

import {
  addFileTitleValidation,
  addAudioFileValidation,
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
  const [categoryId, setCategoryId] = useState(1);
  const bookId = localStorage.getItem("bookId");
  const [activeTaskBtn, setActiveTaskBtn] = useState(true);
  const { state } = useLocation();
  const bookData = state ?? {};
  console.log("bookData", bookData);
  const { filterList, loading } = useSelector((state) => state.content);
  const filterListData = filterList.data ?? [];

  const categoryName = [
    { title: "Sınıf Düzeyi Ekle/Çıkar", categoryId: 1, key: "grade" },
    { title: "PYP Temaları Ekle/Çıkar", categoryId: 2, key: "pypthemes" },
    { title: "Genel Temalar Ekle/Çıkar", categoryId: 3, key: "generalthemes" },
    { title: "Kazanımlar Ekle/Çıkar", categoryId: 4, key: "objectives" },
    { title: "Seriler Ekle/Çıkar", categoryId: 5, key: "series" },
  ];

  const handleCategoryChange = (id) => {
    setCategoryId(id);
    dispatch(
      getFilterList({
        category_id: id,
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
    if (
      values.grade ||
      values.generalthemes ||
      values.objectives ||
      values.pypthemes ||
      values.series === 0
    ) {
      toast.error("You need to select must one filter in all category");
    } else {
      const payload = {
        ...values,
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
    }
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

  const handleClickFilter = (id, setFieldValue) => {
    const category_id = filter(
      categoryName,
      (item) => item.categoryId === categoryId
    );
    setFieldValue(category_id[0].key, id);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Formik
            initialValues={{
              book_name: bookData.book_name ?? "",
              book_description: bookData.book_description ?? "",
              grade: bookData.grade ?? 0,
              generalthemes: bookData.generalthemes ?? 0,
              objectives: bookData.objectives ?? 0,
              pypthemes: bookData.pypthemes ?? 0,
              series: bookData.series ?? 0,
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
            }) => (
              <form onSubmit={handleSubmit}>
                {console.log(values)}
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
                      Kitap Konusu Ekle
                    </Typography>
                    <TextField
                      name="book_name"
                      value={values.book_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      size="small"
                      placeholder="Kitap konusu"
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
                      Kitap Description
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
                      placeholder="Kitap Description"
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
                              categoryId === index + 1 ? "secondary" : "primary"
                            }
                            onClick={() => handleCategoryChange(index + 1)}
                          >
                            {item.title}
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="gap-2 mt-2 flex-wrap "
                    >
                      {loading ? (
                        <LinearProgress />
                      ) : isEmpty(filterListData) ? (
                        <Typography variant="subtitle1" color="text.primary">
                          No Filters Available
                        </Typography>
                      ) : (
                        filterListData.map((row, index) => (
                          <Chip
                            icon={
                              (values.grade ||
                                values.generalthemes ||
                                values.objectives ||
                                values.pypthemes ||
                                values.series) === row.id ? (
                                <Iconify icon="ic:round-done-all" />
                              ) : null
                            }
                            label={row.filter_name}
                            key={index}
                            className="cursor-pointer p-2"
                            onClick={() => {
                              handleClickFilter(row.id, setFieldValue);
                            }}
                            variant={
                              (values.grade ||
                                values.generalthemes ||
                                values.objectives ||
                                values.pypthemes ||
                                values.series) === row.id
                                ? "contained"
                                : "outlined"
                            }
                          />
                        ))
                      )}
                    </Stack>
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
              handleAddBookFile(value, FILE_TYPE.audio);
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
              handleAddBookFile(value, FILE_TYPE.image);
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
              handleAddBookFile(value, FILE_TYPE.document);
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
                    İndirilebilir Materyaller Ekle
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
