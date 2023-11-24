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

const AssignmentSelect = () => {
  const theme = useTheme();

  const rows = [
    {
      books: "Book 1",
      reading: "PYP Theme 1",
      listening: "Pop theme 1",
      Activity: "Objective 1",
      startDate: "Select date",
      deliveryDate: "Select date",
      viewLibrary: "Görünsün",
    },
    {
      books: "Book 2",
      reading: "PYP Theme 2",
      listening: "Pop theme 2",
      Activity: "Objective 2",
      startDate: "Select date",
      deliveryDate: "Select date",
      viewLibrary: "Görünsün",
    },
    {
      books: "Book 3",
      reading: "PYP Theme 3",
      listening: "Pop theme 3",
      Activity: "Objective 3",
      startDate: "Select date",
      deliveryDate: "Select date",
      viewLibrary: "Görünsün",
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
        <Typography variant="subtitle2" color="text.secondary">
          Seviyelendirme
        </Typography>

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

        <TableContainer component={Paper} className="rounded-0 mt-3">
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Kitaplar</StyledTableCell>
                <StyledTableCell>Okuma </StyledTableCell>
                <StyledTableCell>Dinleme </StyledTableCell>
                <StyledTableCell>Etkinlik </StyledTableCell>
                <StyledTableCell>Başlangıç Tarihi </StyledTableCell>
                <StyledTableCell>Teslim Tarihi </StyledTableCell>
                <StyledTableCell>Kitaplıkta Görünümü </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.books}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.reading} <CMCheckBox />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.listening} <CMCheckBox />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Activity} <CMCheckBox />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.startDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.deliveryDate}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <CMCheckBox /> {row.viewLibrary}
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
        <Box className="table_bottom_tabs text-right mt-3">
          <Button variant="contained" color="primary" className="rounded-0">
            Kaydet
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AssignmentSelect;
