import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import MenuPopover from "components/common/MenuPopover";

import { useTheme } from "@mui/material/styles";
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import Iconify from "components/common/iconify/Iconify";
import { Formik } from "formik";
import { get, isEmpty, map, size, uniq } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getBookListForAssign,
  postAssignBook,
} from "redux/store/slice/dashboard/leavingSlice";
import {
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
const LevelingUp = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);
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

  const { assignBookListInfo, listLoading } = useSelector(
    (state) => state.leaving
  );
  const bookList = assignBookListInfo.data ?? [];
  const defaultSelectBook = bookList.reduce((acc, obj) => {
    if (obj.assignedStatus === 1) {
      acc.push(obj.id);
    }
    return acc;
  }, []);
  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});
  const [categoryId, setCategoryId] = useState("");

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);
  const [open, setOpen] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAllSelect = (e, setFieldValue) => {
    setIsSelectAll(e.target.checked);
    if (e.target.checked) {
      const updatedObjects = bookList.map(function (obj) {
        return obj.id;
      });
      setFieldValue("selectedBook", uniq(updatedObjects));
    } else {
      setFieldValue("selectedBook", []);
    }
  };

  useEffect(() => {
    const payload = {
      search: "",
      per_page: "",
      page: 0,
    };

    dispatch(getSchoolList(payload));
  }, [dispatch]);

  const getAssignBookListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          school_id: get(data, "school_id", ""),
          class_id: get(data, "class_id", ""),
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getBookListForAssign(param));
    },
    [dispatch]
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    getAssignBookListData(
      { school_id: schoolData.id, class_id: classData.id, ...filterOptions },
      value
    );
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getAssignBookListData(
      {
        school_id: schoolData.id,
        class_id: classData.id,
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
    getAssignBookListData(
      {
        school_id: schoolData.id,
        class_id: data.id,
        search: "",
        per_page: 10,
      },
      1
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    getAssignBookListData(
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

  const handleAssignBook = (values) => {
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
          getAssignBookListData(
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
          Seviyelendirme
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
                getAssignBookListData({
                  school_id: schoolData.id,
                  class_id: classData.id,
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
              Category
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
            initialValues={{
              selectedBook: defaultSelectBook ?? [],
            }}
            onSubmit={(value, action) => {
              handleAssignBook(value, action);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit} className="h-100">
                <TableContainer
                  component={Paper}
                  className="rounded-0 mt-3 scrollbar-none"
                  sx={{ maxHeight: 350 }}
                >
                  <StyledTable stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">
                          Kitaplar
                          {/* <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton> */}
                          <IconButton>
                            <Iconify
                              icon="ep:arrow-down"
                              color="text.secondary"
                            />
                          </IconButton>
                          <MenuPopover
                            open={open}
                            onClose={handleClose}
                            anchorEl={anchorRef.current}
                            sx={{ width: 130 }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={<CMCheckBox />}
                                label="Tümünü Seç"
                              />
                              <FormControlLabel
                                control={<CMCheckBox />}
                                label="School 1"
                              />
                            </FormGroup>
                          </MenuPopover>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box className="d-flex align-items-center justify-content-between">
                            Seç
                            <FormControlLabel
                              control={
                                <CMCheckBox
                                  checked={isSelectAll}
                                  onChange={(e) =>
                                    handleAllSelect(e, setFieldValue)
                                  }
                                />
                              }
                              label="Tümünü Seç"
                            />
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isEmpty(bookList) ? (
                        <StyledTableRow>
                          <StyledTableCell align="center" colSpan={2}>
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                            >
                              No Data Available
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : (
                        bookList.map((row, index) => {
                          const listItem = (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="left" scope="row">
                                {row.book_name}
                              </StyledTableCell>
                              <StyledTableCell style={{ width: 250 }}>
                                <CMCheckBox
                                  checked={values.selectedBook.includes(row.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue(
                                        "selectedBook",
                                        uniq([...values.selectedBook, row.id])
                                      );
                                    } else {
                                      const updatedObjects =
                                        values.selectedBook.filter(
                                          (obj) => obj !== row.id
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
                          return listItem;
                        })
                      )}
                    </TableBody>
                  </StyledTable>
                </TableContainer>
                {assignBookListInfo ? (
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    mt={3}
                  >
                    <Typography variant="body2" color="secondary.disabled">
                      {assignBookListInfo.total_record} sonuçtan 1 ile{" "}
                      {size(assignBookListInfo.data)} arası gösteriliyor
                    </Typography>
                    {assignBookListInfo.total_record > 0 && (
                      <Pagination
                        count={assignBookListInfo.last_page}
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

export default LevelingUp;
