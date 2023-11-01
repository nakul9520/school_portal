import { Box, Button, DialogContent, Grid, Typography } from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";
import React from "react";

const VoiceRecording = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Ses kaydetme görevlerini buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Grid container className="gap-3">
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                className="my-2"
              >
                Ses kaydetme sorularınızı buraya ekleyin. Lütfen maximum sınırı
                (20 mb) aşmayın.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                className="border p-2 d-flex align-items-center justify-content-center"
                sx={{ height: 100 }}
              >
                <Iconify
                  icon="fa6-regular:file-audio"
                  width={35}
                  color="text.secondary"
                />
              </Box>
            </Grid>

            <Grid item xs={12} className="text-right">
              <Button variant="contained" color="mint" className="rounded-0">
                Kaydet
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default VoiceRecording;
