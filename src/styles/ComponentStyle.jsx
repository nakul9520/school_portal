import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { IconButton } from "@mui/material";

export const StyledTable = styled(Table)(({ theme }) => ({
  border: `.5px solid ${theme.palette.text.secondary}`,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `.5px solid ${theme.palette.text.secondary}`,
  borderBottom: "none",
  [`&.${tableCellClasses.head}`]: {
    padding: 10,
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.tableBgBody,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

export const StyledInput = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.tableBgBody,
}));

export const StyledTextField = {
  "& .MuiInputBase-input": { textAlign: "center" },
  "& .MuiOutlinedInput-root": {
    ".MuiInputBase-input-MuiOutlinedInput-input": {
      textAlign: "center",
    },
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    fontSize: 28,
    fontWeight: 700,
    borderRadius: 10,
    padding: "0 20px",
    "&.Mui-focused fieldset": {
      border: (theme) => `8px solid ${theme.palette.secondary.main}`,
    },
    "&:hover fieldset": {
      border: (theme) => `8px solid ${theme.palette.secondary.main}`,
    },
    "& .Mui-focused fieldset": {
      border: (theme) => `8px solid ${theme.palette.secondary.main}`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: (theme) => `8px solid ${theme.palette.secondary.main}`,
    },
  },
};
