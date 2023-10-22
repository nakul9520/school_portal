import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "components/common/iconify/Iconify";
import React from "react";
import SchoolDataTable from "./SchoolDataTable";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
          <Typography
            variant="body2"
            color="secondary.disabled"
            className="ms-4"
          >
            okul
          </Typography>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Button variant="contained" color="success" className="rounded-0">
              Excel
            </Button>

            <Button variant="contained" color="error" className="rounded-0">
              PDF
            </Button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          mt={2}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Typography
              variant="body2"
              color="secondary.disabled"
              className="ms-4"
            >
              Sayfada Göster
            </Typography>
            <Box className="d-flex align-items-center border table_show_page_check">
              <TextField
                variant="outlined"
                size="small"
                placeholder="10"
                sx={{ width: "50px" }}
              />
              <Checkbox />
            </Box>
          </Stack>

          <Box>
            <TextField
              variant="standard"
              placeholder="Arama…"
              className="header_search"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="iconamoon:search-light" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>

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
            onClick={() => navigate("/dashboard/add-school")}
          >
            Okul Ekle
          </Button>

          <Button variant="contained" className="rounded-0">
            Toplu Okul Ekle
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

export default Dashboard;
