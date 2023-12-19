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

import { useTheme } from "@mui/material/styles";
import Iconify from "components/common/iconify/Iconify";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const GetSystemReportTable = () => {
  const rows = [
    {
      order: 1,
      schoolName: "school 1",
      Class: "class 1",
      studentName: "Student 1",
      numberofBooksRead: "3",
      totalReadingTime: "02hrs 10m 30s",
      totalListeningTime: "02hrs 10m 30s",
      numberofActivitiesCompleted: "12",
    },
    {
      order: 2,
      schoolName: "school 1",
      Class: "class 1",
      studentName: "Student 1",
      numberofBooksRead: "7",
      totalReadingTime: "02hrs 10m 30s",
      totalListeningTime: "02hrs 10m 30s",
      numberofActivitiesCompleted: "34",
    },
    {
      order: 3,
      schoolName: "school 1",
      Class: "class 1",
      studentName: "Student 1",
      numberofBooksRead: "21",
      totalReadingTime: "02hrs 10m 30s",
      totalListeningTime: "02hrs 10m 30s",
      numberofActivitiesCompleted: "65",
    },
  ];
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
            Sistem Raporları
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

        <TableContainer component={Paper} className="rounded-0 mt-3">
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Sıra</StyledTableCell>
                <StyledTableCell align="left">Okul</StyledTableCell>
                <StyledTableCell align="left">Sınıf</StyledTableCell>
                <StyledTableCell align="left">Öğrenci </StyledTableCell>
                <StyledTableCell align="left">
                  Okunan Kitap Sayısı
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Okuma Süresi
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Dinleme Süresi
                </StyledTableCell>
                <StyledTableCell align="left">
                  Tamamlanan Etkinlik Sayısı
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell scope="row">{row.order}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.schoolName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Class}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.studentName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.numberofBooksRead}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.totalReadingTime}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.totalListeningTime}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.numberofActivitiesCompleted}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <StyledTableRow
                sx={{
                  ".MuiTableCell-root": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                <StyledTableCell align="left">Toplam</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left">40</StyledTableCell>
                <StyledTableCell align="left">10hrs 52m 30s</StyledTableCell>
                <StyledTableCell align="left">10hrs 52m 30s</StyledTableCell>
                <StyledTableCell align="left">105</StyledTableCell>
              </StyledTableRow>
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
      </Box>
    </>
  );
};

export default GetSystemReportTable;
