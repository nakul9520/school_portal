import PropTypes from "prop-types";
// material
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledIconButton = styled(IconButton)(({ other, theme }) => ({
  color: theme.palette[other.bgColor].main,
  "&:hover,&:active,&:focus": {
    backgroundColor: theme.palette[other.bgColor].main,
  },
}));

// ----------------------------------------------------------------------

MDIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function MDIconButton({ children, sx, ...other }) {
  return <StyledIconButton {...other}>{children}</StyledIconButton>;
}
