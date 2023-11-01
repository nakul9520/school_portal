import { DialogContent } from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import React from "react";

const DummyDialog = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Dummy Title"
        // closeIcon={true}
      >
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          soluta! 
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default DummyDialog;
