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
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Iconify from "components/common/iconify/Iconify";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import CMCheckBox from "components/common/checkbox/CMCheckBox";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const BookDesign = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const rows = [
    {
      order: 1,
    },
    {
      order: 2,
    },
    {
      order: 3,
    },
    {
      order: 4,
    },
  ];

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
          className="gap-2"
        >
          <Typography variant="subtitle2" color="text.secondary">
            Kitap Tasarımı
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="bi:plus" />}
            onClick={() => navigate("/dashboard/contents/add-book-topic")}
          >
            Kitap Ekle
          </Button>
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

        <TableContainer component={Paper} className="rounded-0 mt-3">
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Sıra</StyledTableCell>
                <StyledTableCell>Kitap Adı </StyledTableCell>
                <StyledTableCell>Seviyesi </StyledTableCell>
                <StyledTableCell>PYP Teması </StyledTableCell>
                <StyledTableCell>Genel Teması </StyledTableCell>
                <StyledTableCell>Kazanımlar</StyledTableCell>
                <StyledTableCell>Seriler</StyledTableCell>
                <StyledTableCell>Seç</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.order}</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">
                    <CMCheckBox />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className="gap-2"
          mt={2}
        >
          <Stack direction="row" alignItems="center" className="gap-2">
            <Button variant="contained" color="primary" className="rounded-0">
              Pdf
            </Button>
            <Button variant="contained" color="secondary" className="rounded-0">
              Print
            </Button>
          </Stack>

          <Box className="table_bottom_tabs text-right mt-3">
            <Button variant="contained" color="primary" className="rounded-0">
              Kaydet
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default BookDesign;
