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
import Iconify from "components/common/iconify/Iconify";
import { debounce, get, size } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getBookDetail,
  getBookList,
} from "redux/store/slice/dashboard/contentSlice";
import BookListTable from "./BookListTable";

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
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getBookListData(
      {
        ...filterOptions,
        per_page: e.target.value,
      },
      page
    );
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
                getBookListData(
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
          direction="row"
          alignItems="center"
          justifyContent="end"
          className="gap-2 mt-3"
        >
          {bookId ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBookEdit}
            >
              Düzenlemek
            </Button>
          ) : null}
        </Stack>
      </Box>
    </>
  );
};

export default BookDesign;
