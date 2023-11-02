import React from "react";
import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

import Iconify from "components/common/iconify";

const CustomSelectCheckBox = styled(Checkbox)(({ theme, other }) => ({
  color: theme.palette[other.color].main,
  backgroundColor: theme.palette[other.color].contrastText,
  padding: 5,
  borderRadius: 0,
  border: `2px solid ${theme.palette.primary.main}`,
  "&:hover,&:active,&:focus": {
    color: theme.palette[other.color].main,
    backgroundColor: theme.palette[other.color].contrastText,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 16,
  },
  "&.Mui-checked": {
    color: theme.palette[other.color].contrastText,
    backgroundColor: theme.palette[other.color].main,
    "&:hover,&:active,&:focus": {
      color: theme.palette[other.color].contrastText,
      backgroundColor: theme.palette[other.color].main,
    },
  },
}));

const SelectCheckbox = (props) => {
  const { sx, ...rest } = props;
  return (
    <>
      <CustomSelectCheckBox
        sx={{ ...sx }}
        other={props}
        icon={<Iconify icon="octicon:checkbox-16" />}
        checkedIcon={<Iconify icon="octicon:checkbox-16" />}
        {...rest}
      />
    </>
  );
};
SelectCheckbox.propTypes = {
  sx: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.string,
};
export default SelectCheckbox;
