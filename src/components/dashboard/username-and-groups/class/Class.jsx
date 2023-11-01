import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "components/common/iconify/Iconify";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ClassDataTable from "./ClassDataTable";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { debounce, get } from "lodash";
import { getClassList } from "redux/store/slice/dashboard/userSlice";

const Class = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    page: 1,
    per_page: 10,
  });

  const getClassListData = useCallback(
    async (data) => {
      const payload = {
        search: get(data, "search", ""),
        per_page: get(data, "per_page", 10),
        page: get(data, "page", 1),
      };

      dispatch(getClassList(payload));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getClassListData, 1000),
    [getClassListData]
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Sınıf
          </Typography>

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
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="gap-2"
          mt={2}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className="gap-2"
          >
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
              <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
                <Checkbox />
              </Box>
            </Box>
          </Stack>

          <TextField
            variant="standard"
            onChange={(e) => {
              setFilterOptions({ ...filterOptions, search: e.target.value });
              getClassListData({
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
        </Stack>

        <ClassDataTable />

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
            onClick={() => navigate("/dashboard/username-and-groups/add-class")}
          >
            Sınıf Ekle
          </Button>

          <Button
            variant="contained"
            className="rounded-0"
            onClick={() => navigate("/dashboard/username-and-groups/mass-class")}
          >
            Toplu Sınıf Ekle
          </Button>
        </Stack>
        <Stack
          direction="row"
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
          <Pagination count={10} />
        </Stack>
      </Box>
    </>
  );
};

export default Class;
