import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";

const AddBookTopic = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const addBookAudio = [
    {
      list: "List 1",
      sound: "Audio 1",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 2",
      sound: "Audio 2",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 3",
      sound: "Audio 3",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 4",
      sound: "Audio 4",
      load: "Upload",
      delete: "Delete",
    },
  ];
  const addBookPages = [
    {
      list: "List 1",
      sound: "Audio 1",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 2",
      sound: "Audio 2",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 3",
      sound: "Audio 3",
      load: "Upload",
      delete: "Delete",
    },
    {
      list: "List 4",
      sound: "Audio 4",
      load: "Upload",
      delete: "Delete",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              p: 2,
              boxShadow: theme.shadows[3],
            }}
            className="mb-3"
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              className="mb-3"
            >
              Kitap Konusu Ekle
            </Typography>
            <TextField
              name="className"
              placeholder="Kitap konusu"
              // value={formik.values.className}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              size="small"
              fullWidth
              // error={
              //   formik.errors.className && formik.touched.className
              //     ? true
              //     : false
              // }
              // helperText={
              //   formik.errors.className && formik.touched.className
              //     ? formik.errors.className
              //     : null
              // }
            />
            <Box className="mt-3">
              <Button variant="contained" color="primary" size="small">
                Kaydet
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
              className="mb-3"
            >
              Kitap Ses Dosyası Ekle
            </Typography>

            <TableContainer component={Paper} className="rounded-0 mt-3">
              <StyledTable stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Liste</StyledTableCell>
                    <StyledTableCell>Ses</StyledTableCell>
                    <StyledTableCell>Yükle</StyledTableCell>
                    <StyledTableCell>Sil</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addBookAudio.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">{row.list}</StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.sound}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.load}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.delete}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>

            <Stack direction="row" alignItems="center" className="gap-2 mt-3">
              <Button variant="contained" color="primary" className="rounded-0">
                Kaydet
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="rounded-0"
              >
                Satır Ekle
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="mb-3">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              fullWidth
              onClick={() => navigate("/dashboard/contents/create-book-event")}
            >
              Kitap etkinlikleri oluştur ve ekle
            </Button>
          </Box>
          <Box
            sx={{
              p: 2,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              className="mb-3"
            >
              Kitap Sayfaları Ekle
            </Typography>

            <TableContainer component={Paper} className="rounded-0 mt-3">
              <StyledTable stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Liste</StyledTableCell>
                    <StyledTableCell>Yükle</StyledTableCell>
                    <StyledTableCell>Sil</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addBookPages.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">{row.list}</StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.load}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.delete}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>

            <Stack direction="row" alignItems="center" className="gap-2 mt-3">
              <Button variant="contained" color="primary" size="small">
                Kaydet
              </Button>
              <Button variant="contained" color="secondary" size="small">
                Satır Ekle
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              p: 2,
              boxShadow: theme.shadows[3],
            }}
            className="mt-3"
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              className="mb-3"
            >
              İndirilebilir Materyaller Ekle
            </Typography>

            <TableContainer component={Paper} className="rounded-0 mt-3">
              <StyledTable stickyHeader>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Liste</StyledTableCell>
                    <StyledTableCell>Yükle</StyledTableCell>
                    <StyledTableCell>Sil</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addBookPages.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">{row.list}</StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.load}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {" "}
                        {row.delete}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </TableContainer>

            <Stack direction="row" alignItems="center" className="gap-2 mt-3">
              <Button variant="contained" color="primary" size="small">
                Kaydet
              </Button>
              <Button variant="contained" color="secondary" size="small">
                Satır Ekle
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddBookTopic;
