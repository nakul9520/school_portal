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
import Iconify from "components/common/iconify/Iconify";
import MassStudentTable from "./MassStudentTable";

const MassStudent = () => {
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
          <Typography variant="subtitle2" color="text.secondary">
            Toplu Öğretmen Ekle
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
          <Stack direction="row" alignItems="center" className="gap-2">
            <Button
              variant="contained"
              color="info"
              startIcon={<Iconify icon="ph:arrow-up" />}
            >
              Toplu Formu Yükle
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<Iconify icon="ph:arrow-down" />}
            >
              Toplu Formu İndir
            </Button>
          </Stack>
          <Button variant="contained" color="primary">
            Kaydet
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

export default MassStudent;
