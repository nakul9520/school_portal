import React, { useCallback, useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
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

import { get, isEmpty, map, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import Iconify from "components/common/iconify/Iconify";
import { getSchoolReport } from "redux/store/slice/dashboard/reportSlice";
import {
  getClassesBySchool,
  getSchoolList,
} from "redux/store/slice/dashboard/userSlice";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { gradeList } from "services/constant";

const SchoolReports = () => {
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

  const { schoolReportInfo, listLoading } = useSelector(
    (state) => state.report
  );
  const schoolReportList = schoolReportInfo.data ?? [];
  const [branchId, setBranchId] = useState("");
  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});

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

  const getSchoolReportList = useCallback(
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

      dispatch(getSchoolReport(param));
    },
    [dispatch]
  );

  const handlePageChange = (e, value) => {
    setPage(value);
    getSchoolReportList(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getSchoolReportList(
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
    getSchoolReportList(
      {
        school_id: schoolData.id,
        class_id: data.id,
        search: "",
        per_page: 10,
      },
      1
    );
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
              Okul Raporları
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
                getSchoolReportList(
                  {
                    school_id: schoolData.id,
                    class_id: classData.id,
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
              Okul
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
              noOptionsText="Veri yok"
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
              Seviye
            </Typography>
            <FormControl fullWidth>
              <Select
                name="branch_id"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                size="small"
              >
                {map(gradeList, (item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-100">
            <Typography variant="body2" color="text.secondary">
              Sınıf
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
              noOptionsText="Veri yok"
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

        <TableContainer
          component={Paper}
          className="rounded-0 mt-3 scrollbar-none"
          sx={{ maxHeight: 350 }}
        >
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Sıra</StyledTableCell>
                <StyledTableCell align="left">Öğrenci </StyledTableCell>
                <StyledTableCell align="left">
                  Okunan Kitap Sayısı
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Okuma Süresi
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Dinleme Süresi
                </StyledTableCell>
                <StyledTableCell align="left">
                  Tamamlanan Etkinlik Sayısı
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listLoading ? (
                <StyledTableRow>
                  <StyledTableCell align="left" colSpan={6}>
                    <LinearProgress />
                  </StyledTableCell>
                </StyledTableRow>
              ) : isEmpty(schoolReportList) ? (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={6}>
                    <Typography variant="subtitle1" color="text.primary">
                      Mevcut Veri Yok
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                schoolReportList.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.books_read}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.reading_duraton}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.listening_duraton}
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
                <StyledTableCell align="left">Toplam</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left">
                  {schoolReportInfo.total_books_read}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {schoolReportInfo.total_reading_duraton}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {schoolReportInfo.total_listening_duraton}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {schoolReportInfo.total_activity_completed}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
        {schoolReportInfo ? (
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            mt={3}
          >
            <Typography variant="body2" color="secondary.disabled">
              {schoolReportInfo.total_record} sonuçtan 1 ile
              {size(schoolReportInfo.data)} arası gösteriliyor
            </Typography>
            {schoolReportInfo.total_record > 0 && (
              <Pagination
                count={schoolReportInfo.last_page}
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

export default SchoolReports;
