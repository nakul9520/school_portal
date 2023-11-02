import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomIconButton = styled(IconButton)(({ theme, other }) => ({
  color: theme.palette[other.color].contrastText,
  backgroundColor: theme.palette[other.color].main,
  padding: 7,
  borderRadius: 0,
  border: `2px solid ${theme.palette.primary.main}`,
  "& svg": {
    width: 16,
    height: 16,
  },
  "&:hover,&:active,&:focus": {
    backgroundColor: theme.palette[other.color].contrastText,
    color: theme.palette[other.color].main,
  },
}));

const CMIconButton = (props) => {
  const { children, sx, ...rest } = props;
  return (
    <>
      <CustomIconButton sx={{ ...sx }} other={props} {...rest}>
        {children}
      </CustomIconButton>
    </>
  );
};
CMIconButton.propTypes = {
  sx: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.string,
};
export default CMIconButton;
