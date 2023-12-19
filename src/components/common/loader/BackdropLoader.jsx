import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const BackdropLoader = (props) => {
  const { open, rest } = props;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        {...rest}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BackdropLoader;
