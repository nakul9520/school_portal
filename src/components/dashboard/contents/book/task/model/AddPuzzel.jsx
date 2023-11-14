import {
  Button,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography
} from "@mui/material";
import CMDialog from "components/common/dialog/CMDialog";

const AddPuzzel = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Sürükle bırak sorularını buradan ekleyin"
        maxWidth="sm"
      >
        <DialogContent>
          <Typography variant="subtitle1" color="text.primary" className="my-3">
            Bulmacayı buradan ekleyin
          </Typography>
          <Grid container className="gap-3">
            <Grid item xs={12}>
              <TextField
                name="className"
                placeholder="Bulmaca başlığı"
                className="w-75"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="className"
                multiline
                rows={4}
                placeholder="3000 kelimeye kadar puzzle kelimelerini veya ipuçlarını yazın."
                fullWidth
              />

              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Açıklamaların bulmacanın altında görünmesini istiyorsanız bu
                  kutuyu işaretleyin"
              />
            </Grid>

            <Grid item xs={12} className="text-right">
              <Button variant="contained" color="warning">
                Bulmacayı Oluştur
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default AddPuzzel;
