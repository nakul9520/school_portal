import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React from "react";
import PropTypes from "prop-types";
import Iconify from "components/common/iconify";
// import Iconify from "./"

const CustomCheckBox = styled(Checkbox)(({ theme, other }) => ({
  "& .MuiSvgIcon-root": {
    // fontSize: other.checkboxsize ? other.checkboxsize : 28,
  },
  "& + .MuiTypography-root": {
    fontSize: other.fontSize,
  },
  "&.Mui-checked": {
    "&, & + .MuiFormControlLabel-label": {
      backgroundColor: "inherit",
    },
    color: theme.palette.slateblue.light,
  },
}));

const CMCheckBox = (props) => {
  const { sx, ...rest } = props;
  return (
    <>
      <CustomCheckBox
        sx={{ ...sx }}
        other={props}
        checkedIcon={<Iconify icon="ic:twotone-square" />}        
        {...rest}
      />
    </>
  );
};
CMCheckBox.propTypes = {
  sx: PropTypes.any,
  children: PropTypes.any,
};
export default CMCheckBox;
