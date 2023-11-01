import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import { useTheme } from "@mui/material/styles";
import Iconify from "components/common/iconify";

const LibraryCategories = () => {
  const theme = useTheme();

  const rows = [
    {
      categoryitems: "School 1",
      edit: "class 1",
      remove: "Student 1",
    },
    {
      categoryitems: "School 2",
      edit: "class 2",
      remove: "Teacher 1",
    },
    {
      categoryitems: "School 3",
      edit: "class 3",
      remove: "Teacher 1",
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
          Kitaplık Kategorileri
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          className="gap-2 flex-wrap"
          mt={2}
        >
          <Box className="table_bottom_tabs text-right">
            <Button variant="contained" color="primary" className="rounded-0">
              Sınıf Düzeyi Ekle/Çıkar
            </Button>
          </Box>
          <Box className="table_bottom_tabs text-right">
            <Button variant="contained" color="secondary" className="rounded-0">
              PYP Temaları Ekle/Çıkar
            </Button>
          </Box>
          <Box className="table_bottom_tabs text-right">
            <Button variant="contained" color="primary" className="rounded-0">
              Genel Temalar Ekle/Çıkar
            </Button>
          </Box>
          <Box className="table_bottom_tabs text-right">
            <Button variant="contained" color="secondary" className="rounded-0">
              Kazanımlar Ekle/Çıkar
            </Button>
          </Box>
          <Box className="table_bottom_tabs text-right">
            <Button variant="contained" color="primary" className="rounded-0">
              Seriler Ekle/Çıkar
            </Button>
          </Box>
        </Stack>

        <TableContainer component={Paper} className="rounded-0 mt-3">
          <StyledTable stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">
                  List of selected category items
                </StyledTableCell>{" "}
                <StyledTableCell align="left">Edit</StyledTableCell>
                <StyledTableCell
                  align="left"
                  className="d-flex align-items-center justify-content-between"
                >
                  Remove
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="bi:plus" />}
                    color="primary"
                  >
                    Ekle
                  </Button>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                    {row.categoryitems}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.edit}</StyledTableCell>
                  <StyledTableCell align="left">{row.remove}</StyledTableCell>
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

export default LibraryCategories;
