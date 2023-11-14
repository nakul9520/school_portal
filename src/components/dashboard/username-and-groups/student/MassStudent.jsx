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
import { useTheme } from "@mui/material/styles";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Iconify from "components/common/iconify/Iconify";
import MassStudentTable from "./MassStudentTable";
import { getStudentCSVFile } from "redux/store/slice/dashboard/userSlice";
import { importStudentFile } from "redux/store/slice/dashboard/userSlice";
import { useRef } from "react";

const MassStudent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mediaInputRef = useRef(null);

  const handleDownloadCSV = () => {
    dispatch(getStudentCSVFile())
      .unwrap()
      .then((result) => {
        if (result) {
          const blob = new Blob([result], {
            type: "data:text/csv;charset=utf-8,",
          });
          const blobURL = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.download = `mass-student-list.csv`;
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
  };
  
  // import class file
  const onImageChange = (event) => {
    const file = event.target.files[0];
    console.log("file: ", file);
    dispatch(importStudentFile({ file })).then((result) => {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };
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
            Toplu Öğrenci Ekle
          </Typography>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className="gap-2"
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleDownloadCSV}
            >
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

        <MassStudentTable />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={3}
          className="table_bottom_tabs"
        >
          <Button
            variant="contained"
            color="info"
            startIcon={<Iconify icon="ph:arrow-up" />}
            onClick={() => mediaInputRef.current.click()}
          >
            Toplu Formu Yükle
          </Button>

          <Button variant="contained" color="primary">
            Kaydet
          </Button>
        </Stack>
        <input
          ref={mediaInputRef}
          hidden
          accept=".csv"
          onChange={(e) => onImageChange(e)}
          name="image"
          type="file"
        />
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

export default MassStudent;
