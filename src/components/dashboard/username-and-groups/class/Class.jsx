import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
import { debounce, get, isEmpty, size } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Iconify from "components/common/iconify/Iconify";
import { toast } from "react-toastify";
import {
  getClassList,
  getSpecificClassCSVFile,
} from "redux/store/slice/dashboard/userSlice";
import ClassDataTable from "./ClassDataTable";
import { deleteClass } from "redux/store/slice/dashboard/userSlice";
import { importClassFile } from "redux/store/slice/dashboard/userSlice";
import { getClassCSVFile } from "redux/store/slice/dashboard/userSlice";
import BackdropLoader from "components/common/loader/BackdropLoader";

const Class = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mediaInputRef = useRef(null);

  const [selected, setSelected] = useState([]);
  const { uploadLoading, classListInfo } = useSelector((state) => state.users);

  const [filterOptions, setFilterOptions] = useState({
    search: "",
    per_page: 10,
  });

  const [page, setPage] = useState(1);
  const [perPageData, setperPageData] = useState(10);

  const getClassListData = useCallback(
    async (data, pageNumber) => {
      const param = {
        payload: {
          search: get(data, "search", ""),
          per_page: get(data, "per_page", 10),
        },
        page: pageNumber,
      };

      dispatch(getClassList(param));
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
      per_page: 10,
    };
    debounceFn(payload, 1);
  }, [debounceFn, dispatch]);

  const handlePageChange = (e, value) => {
    setPage(value);
    getClassListData(filterOptions, value);
  };

  const handlePerPageData = (e) => {
    setperPageData(e.target.value);
    setFilterOptions({
      ...filterOptions,
      per_page: e.target.value,
    });
    getClassListData(
      {
        ...filterOptions,
        per_page: e.target.value,
      },
      page
    );
  };

  const handleDownloadCSV = () => {
    if (isEmpty(selected)) {
      dispatch(getClassCSVFile())
        .unwrap()
        .then((result) => {
          if (result) {
            const blob = new Blob([result], {
              type: "data:text/csv;charset=utf-8,",
            });
            const blobURL = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.download = `mass-class-list.csv`;
            anchor.href = blobURL;
            anchor.dataset.downloadurl = [
              "text/csv",
              anchor.download,
              anchor.href,
            ].join(":");
            anchor.click();
            anchor.remove();
            toast.success("File downloaded successfully");
          } else {
            toast.error("Try again later");
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("Error: ", err);
        });
    } else {
      dispatch(getSpecificClassCSVFile({ id: selected }))
        .unwrap()
        .then((result) => {
          if (result) {
            const blob = new Blob([result], {
              type: "data:text/csv;charset=utf-8,",
            });
            const blobURL = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.download = `class-list.csv`;
            anchor.href = blobURL;
            anchor.dataset.downloadurl = [
              "text/csv",
              anchor.download,
              anchor.href,
            ].join(":");
            anchor.click();
            anchor.remove();
            setSelected([]);
            toast.success("File downloaded successfully");
          } else {
            toast.error("Try again later");
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("Error: ", err);
        });
    }
  };

  // import class file
  const onImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file: ", file);
    dispatch(importClassFile({ file }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          mediaInputRef.current.value = "";
          toast.success(result.message);
          dispatch(
            getClassList({
              payload: {
                search: "",
                per_page: 10,
              },
              page: 1,
            })
          );
        } else {
          mediaInputRef.current.value = "";
          toast.error("Please check your formate, something went wrong");
        }
      });
  };

  const handleDelete = () => {
    dispatch(deleteClass({ id: selected }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          setSelected([]);
          dispatch(
            getClassList({
              payload: {
                search: "",
                per_page: 10,
              },
              page: 1,
            })
          );
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  return (
    <>
      <BackdropLoader open={uploadLoading} />
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
              Sınıf
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              className="gap-2"
            >
              {size(selected) > 1 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Silmek
                </Button>
              ) : null}
              <Button
                variant="contained"
                color="info"
                startIcon={<Iconify icon="ph:arrow-up" />}
                onClick={() => mediaInputRef.current.click()}
              >
                Toplu Formu Yükle
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="ph:arrow-down" />}
                onClick={handleDownloadCSV}
                disabled={isEmpty(classListInfo?.data ?? [])}
              >
                Toplu Formu İndir
              </Button>
              <input
                ref={mediaInputRef}
                hidden
                accept=".csv"
                onChange={(e) => onImageChange(e)}
                name="image"
                type="file"
              />
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
                getClassListData(
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

        <ClassDataTable selected={selected} setSelected={setSelected} />

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
            className="rounded-0"
            onClick={() => navigate("/dashboard/username-and-groups/add-class")}
          >
            Sınıf Ekle
          </Button>
          {/* 
          <Button
            variant="contained"
            className="rounded-0"
            onClick={() =>
              navigate("/dashboard/username-and-groups/mass-class")
            }
          >
            Toplu Sınıf Ekle
          </Button> */}
        </Stack>
        <Stack
          direction={{ md: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
        >
          <Typography variant="body2" color="secondary.disabled">
            {classListInfo.total_record} sonuçtan 1 ile 10 arası gösteriliyor
          </Typography>
          {classListInfo.total_record > 0 && (
            <Pagination
              count={classListInfo.last_page}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Class;
