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

import { useTheme } from "@mui/material/styles";
import Iconify from "components/common/iconify/Iconify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledTable,
  StyledTableCell,
  StyledTableRow,
} from "styles/ComponentStyle";
import CMCheckBox from "components/common/checkbox/CMCheckBox";

const BooksSelect = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState({
    school: null,
    class: null,
    branch: null,
    level: null,
  });

  const handleClick = (event, fieldName) => {
    setAnchorEl((prevstate) => ({
      ...prevstate,
      [fieldName]: event.currentTarget,
    }));
  };
  const handleClose = (fieldName) => {
    setAnchorEl((prevstate) => ({
      ...prevstate,
      [fieldName]: null,
    }));
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const rows = [
    {
      school: "school 1",
      class: "class 1",
      branch: "student 1",
      level: "stdent 1",
    },
    {
      school: "school 2",
      class: "class 2",
      branch: "student 2",
      level: "stdent 2",
    },
    {
      school: "school 3",
      class: "class 3",
      branch: "student 3",
      level: "stdent 3",
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
                <StyledTableCell align="left">
                  Okul
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, "school");
                    }}
                  >
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={Boolean(anchorEl.school)}
                    onClose={() => handleClose("school")}
                    anchorEl={anchorEl.school}
                    sx={{ width: 180, padding: 1 }}
                  >
                    <FormGroup className="">
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label="Tümünü Seç"
                      />
                      <FormControlLabel
                        control={<CMCheckBox />}
                        label={
                          <Typography variant="body2" color="text.secondary">
                            School 1
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </MenuPopover>
                </StyledTableCell>
                <StyledTableCell align="left">
                  Sınıf
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, "class");
                    }}
                  >
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={Boolean(anchorEl.class)}
                    onClose={() => handleClose("class")}
                    anchorEl={anchorEl.class}
                    sx={{ width: 180, padding: 1 }}
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
                  Şube
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, "branch");
                    }}
                  >
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={Boolean(anchorEl.branch)}
                    onClose={() => handleClose("branch")}
                    anchorEl={anchorEl.branch}
                    sx={{ width: 180, padding: 1 }}
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
                  Seviye
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, "level");
                    }}
                  >
                    <Iconify icon="ep:arrow-down" color="text.secondary" />
                  </IconButton>
                  <MenuPopover
                    open={Boolean(anchorEl.level)}
                    onClose={() => handleClose("level")}
                    anchorEl={anchorEl.level}
                    sx={{ width: 180, padding: 1 }}
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
                  <StyledTableCell align="left">{row.school}</StyledTableCell>
                  <StyledTableCell scope="row">{row.class}</StyledTableCell>
                  <StyledTableCell align="left">{row.branch}</StyledTableCell>
                  <StyledTableCell scope="row">{row.level}</StyledTableCell>
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
          <Button
            variant="contained"
            color="success"
            className="rounded-0"
            onClick={() => navigate("/dashboard/leveling/book-select")}
          >
            Göster
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BooksSelect;
