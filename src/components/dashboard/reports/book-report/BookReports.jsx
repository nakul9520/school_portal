import React, { useCallback, useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
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

import { useDispatch, useSelector } from "react-redux";

import Iconify from "components/common/iconify/Iconify";
import { get, isEmpty, map, size } from "lodash";
import { getBookReport } from "redux/store/slice/dashboard/reportSlice";
import {
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { getFilterList } from "redux/store/slice/dashboard/contentSlice";

const BookReport = () => {
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

  const { filterList } = useSelector((state) => state.content);
  const filterListData = filterList.data ?? [];

  const { schoolListInfo, loading, classBySchoolList } = useSelector(
    (state) => state.users
  );
  const schoolList = schoolListInfo.data ?? [];

  const { bookReportInfo, listLoading } = useSelector((state) => state.report);
  const bookReportList = bookReportInfo.data ?? [];

  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [subfilterId, setSubfilterId] = useState("");

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

  const getBookReportList = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          school_id: get(data, "school_id", ""),
          class_id: get(data, "class_id", ""),
          filter_id: get(data, "filter_id", ""),
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getBookReport(param));
    },
    [dispatch]
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    getBookReportList(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getBookReportList(
      {
        school_id: schoolData.id,
        class_id: classData.id,
        filter_id: subfilterId,
        ...filterOptions,

        per_page: e.target.value,
      },
      page
    );
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubfilterId("");
    dispatch(
      getFilterList({
        category_id: e.target.value,
        search: "",
        per_page: 10,
      })
    );
    if (e.target.value === "") {
      getBookReportList(
        {
          school_id: schoolData.id,
          class_id: classData.id,
          filter_id: "",
          search: "",
          per_page: 10,
        },
        1
      );
    }
  };

  const handleSchoolChange = (data) => {
    dispatch(getClassesBySchool(data.id));
  };

  const handleClassChange = (data) => {
    getBookReportList(
      {
        school_id: schoolData.id,
        class_id: data.id,
        filter_id: subfilterId,
        search: "",
        per_page: 10,
      },
      1
    );
  };

  const handleClickCategory = (id) => {
    if (subfilterId === id) {
      setSubfilterId("");
      getBookReportList(
        {
          school_id: schoolData.id,
          class_id: classData.id,
          filter_id: "",
          search: "",
          per_page: 10,
        },
        1
      );
    } else {
      setSubfilterId(id);
      getBookReportList(
        {
          school_id: schoolData.id,
          class_id: classData.id,
          filter_id: id,
          search: "",
          per_page: 10,
        },
        1
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item sm={6} xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Kitap Raporları
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              className="gap-2"
            >
              <Button variant="contained" color="success">
                Excel
              </Button>
            </Stack>
          </Grid>
        </Grid>
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
                setFilterOptions({ ...filterOptions, search: e.target.value });
                getBookReportList(
                  {
                    school_id: schoolData.id,
                    class_id: classData.id,
                    filter_id: subfilterId,
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
        <Box className="w-100 py-2 d-flex align-items-center gap-2">
          {map(filterListData, (item, index) => (
            <Chip
              label={item.filter_name}
              key={index}
              icon={
                subfilterId === item.id ? (
                  <Iconify icon="ic:round-done-all" />
                ) : null
              }
              onClick={() => {
                handleClickCategory(item.id);
              }}
              variant={subfilterId === item.id ? "contained" : "outlined"}
            />
          ))}
        </Box>
        <TableContainer
          component={Paper}
          className="rounded-0 mt-3 scrollbar-none"
          sx={{ maxHeight: 350 }}
        >
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Sıra</StyledTableCell>
                <StyledTableCell align="left">Kitap</StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Okunma Sayısı
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Dinleme Sayısı
                </StyledTableCell>
                <StyledTableCell align="left">
                  Tamamlanan Etkinlik Sayısı
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listLoading ? (
                <StyledTableRow>
                  <StyledTableCell align="left" colSpan={11}>
                    <LinearProgress />
                  </StyledTableCell>
                </StyledTableRow>
              ) : isEmpty(bookReportList) ? (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={11}>
                    <Typography variant="subtitle1" color="text.primary">
                      No Data Available
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                bookReportList.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.book_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.book_read}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.book_listened}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.activity_completed}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
              <StyledTableRow
                sx={{
                  ".MuiTableCell-root": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <StyledTableCell align="left">Total</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>

                <StyledTableCell align="left">
                  {bookReportInfo.total_book_read}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {bookReportInfo.total_book_listened}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {bookReportInfo.total_activity_completed}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
        {bookReportInfo ? (
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            mt={3}
          >
            <Typography variant="body2" color="secondary.disabled">
              {bookReportInfo.total_record} sonuçtan 1 ile
              {size(bookReportInfo.data)} arası gösteriliyor
            </Typography>
            {bookReportInfo.total_record > 0 && (
              <Pagination
                count={bookReportInfo.last_page}
                page={page}
                onChange={handlePageChange}
              />
            )}
          </Stack>
        ) : null}
      </Box>
    </>
  );
};

export default BookReport;
