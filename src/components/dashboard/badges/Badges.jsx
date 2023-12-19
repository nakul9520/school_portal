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
import { getBadgeList } from "redux/store/slice/dashboard/badgeSlice";
import SchoolDataTable from "./BadgesTable";

const Badges = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { badgeListInfo } = useSelector((state) => state.badge);

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    per_page: 10,
  });

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const getBadgeListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getBadgeList(param));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getBadgeListData, 1000),
    [getBadgeListData]
  );

  useEffect(() => {
    const payload = {
      search: "",
      per_page: 10,
    };
    debounceFn(payload, 1);
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getBadgeListData(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getBadgeListData(
      {
        ...filterOptions,
        per_page: e.target.value,
      },
      page
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
              Rozetler ve Profil resimleri
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
                getBadgeListData(
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
        <Box className="mt-3 text-right">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard/add-badges")}
          >
            Ekle
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
            {badgeListInfo.total_record} sonuçtan 1 ile{" "}
            {size(badgeListInfo.data)} arası gösteriliyor
          </Typography>
          {badgeListInfo.total_record > 0 && (
            <Pagination
              count={badgeListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Badges;
