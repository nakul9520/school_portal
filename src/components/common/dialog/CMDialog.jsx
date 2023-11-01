import React, { memo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

import Iconify from "../iconify/Iconify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ other, theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    borderColor: theme.palette.grey[200],
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const BootstrapDialogTitle = (props) => {
  const { children, onClose, closeIcon, ...other } = props;
  return (
    <DialogTitle
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        m: 0,
        py: 1,
        px: 2,
      }}
      {...other}
    >
      <Typography variant="body1" className="fw-bold">
        {children}
      </Typography>
      {closeIcon ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            backgroundColor: (theme) => theme.palette.grey[600],
            color: "primary.contrastText",
            "&:hover,&:focus": {
              backgroundColor: (theme) => theme.palette.grey[600],
              color: "primary.contrastText",
            },
          }}
          size="small"
        >
          <Iconify icon="material-symbols:close-rounded" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CMDialog = (props) => {
  const {
    dialogOpen,
    dialogClose,
    closeIcon,
    dialogTitle,
    dialogContent,
    dialogAction,
    children,
    maxWidth,
    dividers,
    rounded,
    sx,
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <>
      <BootstrapDialog
        TransitionComponent={Transition}
        open={dialogOpen}
        onClose={dialogClose}
        aria-labelledby="customized-dialog-title"
        maxWidth={maxWidth ? maxWidth : "lg"}
        sx={{
          "& .MuiDialog-paper": {
            [theme.breakpoints.down("sm")]: {
              margin: { xs: 2 },
            },
            borderRadius: rounded && props.fullWidth ? "20px 20px 0 0" : "5px",
          },
          ...sx,
        }}
        other={props}
        {...rest}
      >
        {dialogTitle && (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={dialogClose}
            closeIcon={closeIcon}
            other={props}
          >
            {dialogTitle}
          </BootstrapDialogTitle>
        )}
        {dialogContent && (
          <DialogContent dividers={dividers ? dividers : true}>
            {dialogContent}
          </DialogContent>
        )}
        {dialogAction && <DialogActions>{dialogAction}</DialogActions>}
        {children}
      </BootstrapDialog>
    </>
  );
};
export default memo(CMDialog);
