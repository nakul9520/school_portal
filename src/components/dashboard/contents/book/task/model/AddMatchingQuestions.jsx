import {
  Box,
  Button,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";
import React from "react";

const AddMatchingQuestions = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Eşleştirme sorularını buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Grid container className="gap-2">
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                className="mt-3 mb-2"
              >
                Soru (varsa) buraya yazılacak
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" className="align-items-center gap-3">
                <Box className="d-flex align-items-center gap-2 flex-grow-1">
                  <Iconify icon="mingcute:dots-fill" width={20} />
                  <FormControl fullWidth size="small">
                    <InputLabel>İçerik 1</InputLabel>
                    <Select label="İçerik 1">
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="flex-grow-1"
                >
                  1. Eşleştirme 1
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" className="align-items-center gap-3">
                <Box className="d-flex align-items-center gap-2 flex-grow-1">
                  <Iconify icon="mingcute:dots-fill" width={20} />
                  <FormControl fullWidth size="small">
                    <InputLabel>İçerik 2</InputLabel>
                    <Select label="İçerik 2">
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="flex-grow-1"
                >
                  2. Eşleştirme 2
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" className="align-items-center gap-3">
                <Box className="d-flex align-items-center gap-2 flex-grow-1">
                  <Iconify icon="mingcute:dots-fill" width={20} />
                  <FormControl fullWidth size="small">
                    <InputLabel>İçerik 3</InputLabel>
                    <Select label="İçerik 3">
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="flex-grow-1"
                >
                  3. Eşleştirme 3
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="gap-2 mt-3"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className="rounded-0"
                >
                  Satır Ekle
                </Button>
                <Button variant="contained" color="info" className="rounded-0">
                  Kaydet
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddMatchingQuestions;
