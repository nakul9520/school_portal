import React, { useCallback, useEffect, useMemo, useState } from "react";

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

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Iconify from "components/common/iconify/Iconify";
import SchoolDataTable from "./SchoolDataTable";
import { useDispatch } from "react-redux";
import { getSchoolList } from "redux/store/slice/dashboard/userSlice";
import { debounce, get } from "lodash";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    page: 1,
    per_page: 10,
  });

  const getSchoolListData = useCallback(
    async (data) => {
      const payload = {
        search: get(data, "search", ""),
        per_page: get(data, "per_page", 10),
        page: get(data, "page", 1),
      };

      dispatch(getSchoolList(payload));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getSchoolListData, 1000),
    [getSchoolListData]
  );

  useEffect(() => {
    const payload = {
      search: "",
      page: 1,
      per_page: 10,
    };
    debounceFn(payload);
  }, [debounceFn, dispatch]);

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
              okul
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
                  <Checkbox />
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
                getSchoolListData({
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

        <SchoolDataTable />

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
              navigate("/dashboard/username-and-groups/add-school")
            }
          >
            Okul Ekle
          </Button>

          <Button
            variant="contained"
            className="rounded-0"
            onClick={() =>
              navigate("/dashboard/username-and-groups/mass-school")
            }
          >
            Toplu Okul Ekle
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
            57 sonuçtan 1 ile 10 arası gösteriliyor
          </Typography>
          <Pagination count={8} />
        </Stack>
      </Box>
    </>
  );
};

export default Dashboard;
