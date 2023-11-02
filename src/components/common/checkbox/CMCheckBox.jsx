import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React from "react";
import PropTypes from "prop-types";
import Iconify from "components/common/iconify";
// import Iconify from "./"

const CustomCheckBox = styled(Checkbox)(({ theme, other }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  "& + .MuiTypography-root": {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  "&.Mui-checked": {
    "&, & + .MuiFormControlLabel-label": {
      backgroundColor: "inherit",
    },
    color: theme.palette.primary.dark,
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
