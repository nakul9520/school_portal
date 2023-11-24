import React, { useCallback, useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
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

import { FieldArray, Formik } from "formik";
import { get, isEmpty, map, size, uniq } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CMCheckBox from "components/common/checkbox/CMCheckBox";
import Iconify from "components/common/iconify/Iconify";
import {
  getAssignmentListForAssign,
  postAssignAssignment,
} from "redux/store/slice/dashboard/assignmentSlice";
import { getFilterList } from "redux/store/slice/dashboard/contentSlice";
import {
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import { categoryName } from "services/constant";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const Assignment = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    per_page: 10,
  });

  const { schoolListInfo, loading, classBySchoolList } = useSelector(
    (state) => state.users
  );
  const schoolList = schoolListInfo.data ?? [];

  const { assignAssignmentListInfo, listLoading } = useSelector(
    (state) => state.assignment
  );
  const assignmentList = assignAssignmentListInfo.data ?? [];

  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryData, setSubCategoryData] = useState({});
  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const { filterList } = useSelector((state) => state.content);
  const filterListData = filterList.data ?? [];

  useEffect(() => {
    const payload = {
      search: "",
      per_page: "",
      page: 0,
    };

    dispatch(getSchoolList(payload));
  }, [dispatch]);

  const getAssignAssignmentListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          school_id: get(data, "school_id", ""),
          class_id: get(data, "class_id", ""),
          category_id: get(data, "category_id", ""),
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getAssignmentListForAssign(param));
    },
    [dispatch]
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    getAssignAssignmentListData(
      {
        school_id: schoolData.id,
        class_id: classData.id,
        category_id: categoryId,
        ...filterOptions,
      },
      value
    );
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getAssignAssignmentListData(
      {
        school_id: schoolData.id,
        class_id: classData.id,
        category_id: categoryId,
        ...filterOptions,
        per_page: e.target.value,
      },
      page
    );
  };

  const handleSchoolChange = (data) => {
    dispatch(getClassesBySchool(data.id));
  };

  const handleClassChange = (data) => {
    getAssignAssignmentListData(
      {
        school_id: schoolData.id,
        class_id: data.id,
        category_id: categoryId,
        search: "",
        per_page: 10,
      },
      1
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubCategoryData({});
    dispatch(
      getFilterList({
        category_id: e.target.value,
        search: "",
        per_page: 10,
      })
    );
    if (e.target.value === "") {
      getAssignAssignmentListData(
        {
          school_id: schoolData.id,
          class_id: classData.id,
          category_id: "",
          search: "",
          per_page: 10,
        },
        1
      );
    }
  };

  const handleClickCategory = (value) => {
    getAssignAssignmentListData(
      {
        school_id: schoolData.id,
        class_id: classData.id,
        category_id: value.id,
        ...filterOptions,
      },
      1
    );
  };

  const handleAssignAssignment = (values) => {
    const payload = {
      school_id: schoolData.id,
      class_id: classData.id,
      data: values.selectedBook,
    };
    dispatch(postAssignAssignment(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          getAssignAssignmentListData(
            {
              school_id: schoolData.id,
              class_id: classData.id,
              category_id: categoryId,
              search: "",
              per_page: 10,
            },
            1
          );
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };

  const handleAllSelect = (e, allData, setFieldValue, key) => {
    let updatedArray;
    if (e.target.checked) {
      updatedArray = allData.map((item) => {
        const updatedItem = { ...item };
        updatedItem[key] = "1";
        return updatedItem;
      });
    } else {
      updatedArray = allData.map((item) => {
        const updatedItem = { ...item };
        updatedItem[key] = "0";
        return updatedItem;
      });
    }

    setFieldValue("data", updatedArray);
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Görevlendirme
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={1}
        >
          <Grid item sm={6} xs={12}>
            <Stack direction="row" alignItems="center" className="gap-2">
              <Typography variant="caption" color="text.secondary">
                Sayfada Göster
              </Typography>

              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={perPageData}
                  onChange={handlePerPageData}
                  size="small"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item sm={6} xs={12} className="text-right">
            <TextField
              variant="standard"
              value={filterOptions.search}
              onChange={(e) => {
                setFilterOptions({
                  ...filterOptions,
                  search: e.target.value,
                });
                getAssignAssignmentListData(
                  {
                    school_id: schoolData.id,
                    class_id: classData.id,
                    category_id: categoryId,
                    ...filterOptions,
                    search: e.target.value,
                  },
                  1
                );
              }}
              placeholder="Arama…"
              className="header_search"
              size="small"
              InputProps={{
                endadornment: (
                  <InputAdornment position="start">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <Iconify icon="iconamoon:search-light" width={20} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          className="gap-2"
          mt={2}
        >
          <Box className="w-100">
            <Typography variant="body2" color="text.secondary">
              School
            </Typography>
            <Autocomplete
              getOptionLabel={(option) => {
                return option.school_name ?? option;
              }}
              options={schoolList}
              value={schoolData.school_name ?? ""}
              isOptionEqualToValue={(option, value) => {
                if (value === "" || option.school_name === value.school_name) {
                  return true;
                }
              }}
              onChange={(e, value) => {
                setSchoolData(value);
                setClassData({});
                handleSchoolChange(value);
              }}
              autoHighlight
              disableClearable
              noOptionsText="No Data"
              loading={loading}
              className="w-100"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                    endadornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endadornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box className="w-100">
            <Typography variant="body2" color="text.secondary">
              Class
            </Typography>
            <Autocomplete
              getOptionLabel={(option) => option.class_name ?? option}
              options={classBySchoolList}
              disabled={isEmpty(classBySchoolList) || isEmpty(schoolData)}
              value={classData.class_name ?? ""}
              isOptionEqualToValue={(option, value) => {
                if (value === "" || option.class_name === value.class_name) {
                  return true;
                }
              }}
              onChange={(e, value) => {
                setClassData(value);
                handleClassChange(value);
              }}
              autoHighlight
              disableClearable
              noOptionsText="No Data"
              loading={loading}
              className="w-100"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                    endadornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endadornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box className="w-100">
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
            <FormControl fullWidth>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                size="small"
                disabled={isEmpty(classBySchoolList) || isEmpty(classData)}
              >
                <MenuItem value="">No Category</MenuItem>
                {map(categoryName, (item, index) => (
                  <MenuItem key={index} value={item.categoryId}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-100">
            <Typography variant="body2" color="text.secondary">
              Sub Category
            </Typography>
            <Autocomplete
              getOptionLabel={(option) => option.filter_name ?? option}
              options={filterListData}
              disabled={categoryId === ""}
              value={subCategoryData.filter_name ?? ""}
              isOptionEqualToValue={(option, value) => {
                if (value === "" || option.filter_name === value.filter_name) {
                  return true;
                }
              }}
              onChange={(e, value) => {
                setSubCategoryData(value);
                handleClickCategory(value);
              }}
              autoHighlight
              disableClearable
              noOptionsText="No Data"
              loading={loading}
              className="w-100"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                    endadornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endadornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Stack>

        {!listLoading ? (
          <Formik
            initialValues={{
              data: assignmentList ?? [],
              selectedBook: [],
            }}
            onSubmit={(value, action) => {
              handleAssignAssignment(value, action);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} className="h-100">
                {console.log("values", values)}
                <FieldArray
                  name="data"
                  render={(arrayHelpers) => (
                    <>
                      <TableContainer
                        component={Paper}
                        className="rounded-0 mt-3"
                        sx={{ minHeight: 250 }}
                      >
                        <StyledTable stickyHeader>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="left">
                                Kitaplar
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <FormControlLabel
                                  labelPlacement="start"
                                  control={
                                    <CMCheckBox
                                      onChange={(e) =>
                                        handleAllSelect(
                                          e,
                                          values.data,
                                          setFieldValue,
                                          "reading_assignment"
                                        )
                                      }
                                    />
                                  }
                                  label="Okuma"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <FormControlLabel
                                  labelPlacement="start"
                                  control={
                                    <CMCheckBox
                                      onChange={(e) =>
                                        handleAllSelect(
                                          e,
                                          values.data,
                                          setFieldValue,
                                          "listening_assignment"
                                        )
                                      }
                                    />
                                  }
                                  label="Dinleme"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <FormControlLabel
                                  labelPlacement="start"
                                  control={
                                    <CMCheckBox
                                      onChange={(e) =>
                                        handleAllSelect(
                                          e,
                                          values.data,
                                          setFieldValue,
                                          "activities_assignment"
                                        )
                                      }
                                    />
                                  }
                                  label="Etkinlik"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Başlangıç Tarihi
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Teslim Tarihi
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <FormControlLabel
                                  labelPlacement="start"
                                  control={
                                    <CMCheckBox
                                      onChange={(e) =>
                                        handleAllSelect(
                                          e,
                                          values.data,
                                          setFieldValue,
                                          "is_general"
                                        )
                                      }
                                    />
                                  }
                                  label="Kitaplıkta Görünümü"
                                />
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Edit
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isEmpty(values.data) ? (
                              <StyledTableRow>
                                <StyledTableCell align="center" colSpan={8}>
                                  <Typography
                                    variant="subtitle1"
                                    color="text.primary"
                                  >
                                    No Data Available
                                  </Typography>
                                </StyledTableCell>
                              </StyledTableRow>
                            ) : values.data && values.data.length > 0 ? (
                              values.data.map((item, index) => {
                                const reading_assignment = `data[${index}].reading_assignment`;
                                const listening_assignment = `data[${index}].listening_assignment`;
                                const activities_assignment = `data[${index}].activities_assignment`;
                                const is_general = `data[${index}].is_general`;

                                return (
                                  <StyledTableRow key={index}>
                                    <StyledTableCell align="left">
                                      {item.book_name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <CMCheckBox
                                        checked={
                                          item.reading_assignment === "1"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) =>
                                          setFieldValue(
                                            reading_assignment,
                                            e.target.checked ? "1" : "0"
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <CMCheckBox
                                        checked={
                                          item.listening_assignment === "1"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) =>
                                          setFieldValue(
                                            listening_assignment,
                                            e.target.checked ? "1" : "0"
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <CMCheckBox
                                        checked={
                                          item.activities_assignment === "1"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) =>
                                          setFieldValue(
                                            activities_assignment,
                                            e.target.checked ? "1" : "0"
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {item.start_date}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      {item.end_date}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <CMCheckBox
                                        checked={
                                          item.is_general === "1" ? true : false
                                        }
                                        onChange={(e) =>
                                          setFieldValue(
                                            is_general,
                                            e.target.checked ? "1" : "0"
                                          )
                                        }
                                      />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                      <CMCheckBox
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setFieldValue(
                                              "selectedBook",
                                              uniq([
                                                ...values.selectedBook,
                                                item,
                                              ])
                                            );
                                          } else {
                                            const updatedObjects =
                                              values.selectedBook.filter(
                                                (obj) => obj.id !== item.id
                                              );
                                            setFieldValue(
                                              "selectedBook",
                                              updatedObjects
                                            );
                                          }
                                        }}
                                      />
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })
                            ) : null}
                          </TableBody>
                        </StyledTable>
                      </TableContainer>

                      {assignAssignmentListInfo ? (
                        <Stack
                          direction={{ md: "row", xs: "column" }}
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                          mt={3}
                        >
                          <Typography
                            variant="body2"
                            color="secondary.disabled"
                          >
                            {assignAssignmentListInfo.total_record} sonuçtan 1
                            ile {size(assignAssignmentListInfo.data)} arası
                            gösteriliyor
                          </Typography>
                          {assignAssignmentListInfo.total_record > 0 && (
                            <Pagination
                              count={assignAssignmentListInfo.last_page}
                              page={page}
                              onChange={handlePageChange}
                            />
                          )}
                        </Stack>
                      ) : null}
                      <Box className="table_bottom_tabs text-right mt-3">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Kaydet
                        </Button>
                      </Box>
                    </>
                  )}
                />
              </form>
            )}
          </Formik>
        ) : null}
      </Box>
    </>
  );
};

export default Assignment;
