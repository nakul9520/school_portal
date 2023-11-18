import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
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
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import Iconify from "components/common/iconify/Iconify";
import { Formik } from "formik";
import { get, isEmpty, map, size } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAssignmentListForAssign } from "redux/store/slice/dashboard/assignmentSlice";
import { postAssignBook } from "redux/store/slice/dashboard/leavingSlice";
import {
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const Assignment = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const categoryName = [
    { title: "Sınıf Düzeyi Ekle/Çıkar", categoryId: 1, key: "grade" },
    { title: "PYP Temaları Ekle/Çıkar", categoryId: 2, key: "pypthemes" },
    { title: "Genel Temalar Ekle/Çıkar", categoryId: 3, key: "generalthemes" },
    { title: "Kazanımlar Ekle/Çıkar", categoryId: 4, key: "objectives" },
    { title: "Seriler Ekle/Çıkar", categoryId: 5, key: "series" },
  ];
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
  // const defaultSelectBook = assignmentList.reduce((acc, obj) => {
  //   if (obj.assignedStatus === 1) {
  //     acc.push(obj.id);
  //   }
  //   return acc;
  // }, []);
  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});
  const [categoryId, setCategoryId] = useState("");

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

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
    getAssignAssignmentListData(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getAssignAssignmentListData(
      {
        ...filterOptions,
        per_page: e.target.value,
      },
      page
    );
  };
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    getAssignAssignmentListData(
      {
        school_id: schoolData.id,
        class_id: classData.id,
        category_id: e.target.value,
        search: "",
        per_page: 10,
      },
      1
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
        search: "",
        per_page: 10,
      },
      1
    );
  };

  const handleAssignAssignment = (values) => {
    const payload = {
      school_id: schoolData.id,
      class_id: classData.id,
      book_id: values.selectedBook,
    };
    dispatch(postAssignBook(payload))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          getAssignAssignmentListData(
            {
              school_id: schoolData.id,
              class_id: classData.id,
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
                getAssignAssignmentListData({
                  ...filterOptions,
                  search: e.target.value,
                });
              }}
              placeholder="Arama…"
              className="header_search"
              size="small"
              InputProps={{
                endAdornment: (
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
                        {params.InputProps.endAdornment}
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
                        {params.InputProps.endAdornment}
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
            <FormControl fullWidth>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                size="small"
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
        </Stack>

        {!listLoading ? (
          <Formik
            initialValues={
              {
                // selectedBook: defaultSelectBook ?? [],
              }
            }
            onSubmit={(value, action) => {
              handleAssignAssignment(value, action);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} className="h-100">
                {console.log("validate", values)}

                <TableContainer
                  component={Paper}
                  className="rounded-0 mt-3"
                  sx={{ minHeight: 350 }}
                >
                  <StyledTable stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Kitaplar</StyledTableCell>
                        <StyledTableCell>Okuma </StyledTableCell>
                        <StyledTableCell>Dinleme </StyledTableCell>
                        <StyledTableCell>Etkinlik </StyledTableCell>
                        <StyledTableCell>Başlangıç Tarihi </StyledTableCell>
                        <StyledTableCell>Teslim Tarihi </StyledTableCell>
                        <StyledTableCell>Kitaplıkta Görünümü </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isEmpty(assignmentList) ? (
                        <StyledTableRow>
                          <StyledTableCell align="center" colSpan={7}>
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                            >
                              No Data Available
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : (
                        assignmentList.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="left">
                              {row.book_name}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.reading_assignment} <CMCheckBox />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.listening_assignment} <CMCheckBox />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.activities_assignment} <CMCheckBox />
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.start_date}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.end_date}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <CMCheckBox /> {row.is_general}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      )}
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
                    <Typography variant="body2" color="secondary.disabled">
                      {assignAssignmentListInfo.total_record} sonuçtan 1 ile{" "}
                      {size(assignAssignmentListInfo.data)} arası gösteriliyor
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
                  <Button variant="contained" color="primary" type="submit">
                    Kaydet
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        ) : null}
      </Box>
    </>
  );
};

export default Assignment;
