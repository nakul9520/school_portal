import {
  Button,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";
import React from "react";

const AddMultipleChoiceQuestions = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle=" Çoktan seçmeli soruları buradan ekleyin"
        mxWidth="sm"
      >
        <DialogContent>
          <Grid container className="gap-2">
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                className="my-2"
              >
                Soru (varsa) buraya yazılacak
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="Choice1"
                    control={<Radio />}
                    label="Seçenek"
                  />
                  <FormControlLabel
                    value="Choice2"
                    control={<Radio />}
                    label="Seçenek"
                  />
                  <FormControlLabel
                    value="Choice3"
                    control={<Radio />}
                    label="Seçenek"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="gap-2"
              >
                <Button variant="contained" color="secondary">
                  Satır Ekle
                </Button>
                <Button variant="contained" color="mint">
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

export default AddMultipleChoiceQuestions;
