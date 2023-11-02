import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "components/common/iconify/Iconify";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TeacherDataTable from "./TeacherDataTable";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { debounce, get } from "lodash";
import { getUsersList } from "redux/store/slice/dashboard/userSlice";
import { USER_TYPE } from "services/constant";

const Teacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { userListInfo } = useSelector((state) => state.users);

  const [filterOptions, setFilterOptions] = useState({
    user_type: USER_TYPE.teacher,
    search: "",
    per_page: 10,
  });

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const getUserListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
          user_type: USER_TYPE.teacher,
        },
        page: pageNumber,
      };

      dispatch(getUsersList(param));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getUserListData, 1000),
    [getUserListData]
  );

  useEffect(() => {
    const payload = {
      search: "",
      per_page: 10,
      user_type: USER_TYPE.teacher,
    };
    debounceFn(payload, 1);
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getUserListData(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    if (e.target.checked) {
      setFilterOptions({
        ...filterOptions,
        per_page: perPageData,
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        per_page: 10,
      });
    }
    getUserListData(filterOptions, page);
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
              Öğretmen
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

              <Button variant="contained" color="error">
                PDF
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
              <Box className="d-flex align-items-center border">
                <TextField
                  variant="outlined"
                  value={perPageData}
                  onChange={(e) => setperPageData(e.target.value)}
                  size="small"
                  placeholder="10"
                  sx={{
                    width: "50px",
                    ".MuiInputBase-root": {
                      backgroundColor: "transparent",
                      ".MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                  }}
                />
                <Box
                  sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
                >
                  <Checkbox onChange={handlePerPageData} />
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item sm={6} xs={12} className="text-right">
            <TextField
              variant="standard"
              value={filterOptions.search}
              onChange={(e) => {
                setFilterOptions({ ...filterOptions, search: e.target.value });
                getUserListData({
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

        <TeacherDataTable />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
          mt={3}
          className="table_bottom_tabs"
        >
          <Button
            variant="contained"
            color="secondary"
            className="rounded-0"
            onClick={() =>
              navigate("/dashboard/username-and-groups/add-teacher")
            }
          >
            Öğretmen Ekle
          </Button>

          <Button
            variant="contained"
            className="rounded-0"
            onClick={() =>
              navigate("/dashboard/username-and-groups/mass-teacher")
            }
          >
            Toplu Öğretmen Ekle
          </Button>
        </Stack>

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
            className="ms-4"
          >
            {userListInfo.total_record} sonuçtan 1 ile 10 arası gösteriliyor
          </Typography>
          {userListInfo.total_record > 0 && (
            <Pagination
              count={userListInfo.total_record / 2}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Teacher;
