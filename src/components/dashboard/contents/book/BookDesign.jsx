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
import Iconify from "components/common/iconify/Iconify";
import { debounce, get, size } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookList } from "redux/store/slice/dashboard/contentSlice";
import BookListTable from "./BookListTable";
import { getBookDetail } from "redux/store/slice/dashboard/contentSlice";
import { toast } from "react-toastify";

const BookDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { bookListInfo } = useSelector((state) => state.content);
  // console.log("BookList:", bookListInfo);
  const [bookId, setBookId] = useState(null);

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    per_page: 10,
  });

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const getBookListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getBookList(param));
    },
    [dispatch]
  );

  const debounceFn = useMemo(
    () => debounce(getBookListData, 1000),
    [getBookListData]
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
    getBookListData(filterOptions, value);
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
      setperPageData(10);
    }
    getBookListData(filterOptions, page);
  };

  const handleBookEdit = () => {
    dispatch(getBookDetail(bookId))
      .unwrap()
      .then((result) => {
        if (result.success) {
          localStorage.setItem("bookId", result.data.id);
          navigate("/dashboard/contents/add-book-topic", {
            state: result.data,
          });
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {});
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
              Kitap Tasarımı
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} className="text-right">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="bi:plus" />}
              onClick={() => {
                localStorage.removeItem("bookId");
                navigate("/dashboard/contents/add-book-topic");
              }}
            >
              Kitap Ekle
            </Button>
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
                getBookListData({
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

        <BookListTable bookId={bookId} setBookId={setBookId} />

        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {bookListInfo.total_record} sonuçtan 1 ile {size(bookListInfo.data)}{" "}
            arası gösteriliyor
          </Typography>
          {bookListInfo.total_record > 0 && (
            <Pagination
              count={bookListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>

        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={{ sm: "space-between", xs: "flex-start" }}
          alignItems="center"
          mt={3}
          className="gap-2"
        >
          <Stack direction="row" alignItems="center" className="gap-2">
            <Button variant="contained" color="primary">
              Pdf
            </Button>
            <Button variant="contained" color="secondary">
              Print
            </Button>
          </Stack>

          <Stack direction="row" alignItems="center" className="gap-2">
            {bookId ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBookEdit}
              >
                Düzenlemek
              </Button>
            ) : null}
            <Button variant="contained" color="primary">
              Kaydet
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default BookDesign;
