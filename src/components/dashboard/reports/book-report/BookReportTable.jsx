import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
import MenuPopover from "components/common/MenuPopover";

import Iconify from "components/common/iconify/Iconify";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import CMCheckBox from "theme/overrides/CMCheckBox";
import { useTheme } from "@mui/material/styles";

const BookReportTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const rows = [
    {
      pypTheme: "PYP Theme 1",
      class: "class 1",
      generalTheme: "Pop theme 1",
      achievements: "Objective 1",
      series: "Book Series 1",
      book: "Book 1",
    },
    {
      pypTheme: "PYP Theme 2",
      class: "class 2",
      generalTheme: "Pop theme 2",
      achievements: "Objective 2",
      series: "Book Series 2",
      book: "Book 2",
    },
    {
      pypTheme: "PYP Theme 3",
      class: "class 3",
      generalTheme: "Pop theme 3",
      achievements: "Objective 3",
      series: "Book Series 3",
      book: "Book 3",
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
          spacing={1}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Kitap Raporları
          </Typography>

          <Box className="table_bottom_tabs">
            <Button
              variant="contained"
              color="secondary"
              className="rounded-0"
              onClick={() => navigate("/dashboard/totalbook-reports")}
            >
              Rapor Al
            </Button>
          </Box>
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
                <StyledTableCell align="left">
                  Sınıf
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  PYP Theme
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Genel Tema
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Kazanımlar
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Seriler
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Kitap
                  <IconButton ref={anchorRef} onClick={handleOpen}>
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorRef.current}
                    sx={{ width: 130 }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="School 1"
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.pypTheme}</StyledTableCell>
                  <StyledTableCell scope="row">{row.class}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.generalTheme}
                  </StyledTableCell>
                  <StyledTableCell scope="row">
                    {row.achievements}
                  </StyledTableCell>
                  <StyledTableCell scope="row">{row.series}</StyledTableCell>
                  <StyledTableCell scope="row">{row.book}</StyledTableCell>
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
      </Box>
    </>
  );
};

export default BookReportTable;
