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
import { useTheme } from "@mui/material/styles";

const GetBookReportTable = () => {
  const rows = [
    {
      order: 1,
      numberofSchool: "school 1",
      numberofClass: "class 1",
      pypTheme: "Theme 1",
      generalTheme: "Theme 1",
      achievements: "Objective 1",
      Series: "Series 1",
      book: "Book 1",
      totalNumberofReads: "2",
      totalNumberofListening: "2",
      numberofActivitiesCompleted: "2",
    },
    {
      order: 2,
      numberofSchool: "school 2",
      numberofClass: "class 2",
      pypTheme: "Theme 2",
      generalTheme: "Theme 2",
      achievements: "Objective 2",
      Series: "Series 2",
      book: "Book 2",
      totalNumberofReads: "5",
      totalNumberofListening: "5",
      numberofActivitiesCompleted: "5",
    },
    {
      order: 3,
      numberofSchool: "school 3",
      numberofClass: "class 3",
      pypTheme: "Theme 3",
      generalTheme: "Theme 3",
      achievements: "Objective 3",
      Series: "Series 3",
      book: "Book 3",
      totalNumberofReads: "7",
      totalNumberofListening: "7",
      numberofActivitiesCompleted: "7",
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
            Kitap Raporları
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
                <StyledTableCell align="left">Okul Sayısı</StyledTableCell>
                <StyledTableCell align="left">Sınıf Sayısı</StyledTableCell>
                <StyledTableCell align="left">PYP Teması </StyledTableCell>
                <StyledTableCell align="left">Genel Tema</StyledTableCell>
                <StyledTableCell align="left">Kazanımlar</StyledTableCell>
                <StyledTableCell align="left">Seriler</StyledTableCell>
                <StyledTableCell align="left">Kitap</StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Okunma Sayısı
                </StyledTableCell>
                <StyledTableCell align="left">
                  Toplam Dinleme Sayısı
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
                    {row.numberofSchool}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.numberofClass}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.pypTheme}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.generalTheme}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.achievements}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Series}</StyledTableCell>{" "}
                  <StyledTableCell align="left">{row.book}</StyledTableCell>{" "}
                  <StyledTableCell align="left">
                    {row.totalNumberofReads}
                  </StyledTableCell>{" "}
                  <StyledTableCell align="left">
                    {row.totalNumberofListening}
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
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left">15</StyledTableCell>
                <StyledTableCell align="left">15</StyledTableCell>
                <StyledTableCell align="left">15</StyledTableCell>
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

export default GetBookReportTable;
