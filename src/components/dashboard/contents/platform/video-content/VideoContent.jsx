import { useCallback, useEffect, useMemo, useState } from "react";

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

import { useTheme } from "@mui/material/styles";
import { debounce, get, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Iconify from "components/common/iconify/Iconify";
import { getAllContentList } from "redux/store/slice/dashboard/contentSlice";
import { CONTENT_TYPE } from "services/constant";
import VideoContentTable from "./VideoContentTable";

const VideoContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { contentListInfo } = useSelector((state) => state.content);

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    per_page: 10,
  });

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const getContentListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          type: CONTENT_TYPE.videoTutorial,
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getAllContentList(param));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getContentListData, 1000),
    [getContentListData]
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
    getContentListData(filterOptions, value);
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
    getContentListData(filterOptions, page);
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
              Video Ekle
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
                getContentListData({
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

        <VideoContentTable />

        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={{ sm: "flex-end", xs: "flex-start" }}
          alignItems="center"
          mt={3}
          className="table_bottom_tabs gap-2"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              navigate("/dashboard/contents/platform-design/add-video-content")
            }
          >
            Video İçerik Ekle
          </Button>
        </Stack>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {contentListInfo.total_record} sonuçtan 1 ile{" "}
            {size(contentListInfo.data)} arası gösteriliyor
          </Typography>
          {contentListInfo.total_record > 0 && (
            <Pagination
              count={contentListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default VideoContent;
