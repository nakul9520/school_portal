import React from "react";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CMDialog from "./dialog/CMDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = (props) => {
  const {
    dialogTitle,
    dialogOpen,
    dialogClose,
    action,
    buttonLabel,
    confirmationText,
  } = props;
  return (
    <>
      <CMDialog
        dialogTitle={dialogTitle}
        dialogOpen={dialogOpen}
        dialogClose={dialogClose}
        TransitionComponent={Transition}
        maxWidth="md"
      >
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body1">
                {confirmationText
                  ? confirmationText
                  : "Are you sure you want to Delete ?"}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="end"
          >
            <Button onClick={() => dialogClose()}>Cancel</Button>
            <Button variant="contained" color="error" onClick={action}>
              {buttonLabel ? buttonLabel : "Delete"}
            </Button>
          </Stack>
        </DialogActions>
      </CMDialog>
    </>
  );
};

export default ConfirmationDialog;
