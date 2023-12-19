import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
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

import { useTheme } from "@mui/material/styles";
import { debounce, get, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Iconify from "components/common/iconify/Iconify";
import { getUsersList } from "redux/store/slice/dashboard/userSlice";
import { USER_TYPE } from "services/constant";
import SchoolDataTable from "./SubAdminTable";
import BackButton from "components/common/BackButton";

const SubAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { userListInfo } = useSelector((state) => state.users);

  const [filterOptions, setFilterOptions] = useState({
    user_type: USER_TYPE.subAdmin,
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
          user_type: USER_TYPE.subAdmin,
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
      user_type: USER_TYPE.subAdmin,
    };
    debounceFn(payload, 1);
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getUserListData(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getUserListData(
      {
        ...filterOptions,
        per_page: e.target.value,
      },
      page
    );
  };
  return (
    <>
      <BackButton />
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
              Alt Yönetici
            </Typography>
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
                getUserListData(
                  {
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

        <SchoolDataTable />
        <Box mt={3} className="text-right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard/system-settings/add-sub-admin")}
          >
            Okul Ekle
          </Button>
        </Box>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {userListInfo.total_record} sonuçtan 1 ile {size(userListInfo.data)}
            arası gösteriliyor
          </Typography>
          {userListInfo.total_record > 0 && (
            <Pagination
              count={userListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default SubAdmin;
