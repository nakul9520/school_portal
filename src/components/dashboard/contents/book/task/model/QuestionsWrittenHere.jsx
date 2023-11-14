import {
  Box,
  Button,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CMDialog from "components/common/dialog/CMDialog";
import Iconify from "components/common/iconify";

const QuestionsWrittenHere = (props) => {
  const { open, onClose } = props;
  return (
    <>
      <CMDialog
        dialogOpen={open}
        dialogClose={onClose}
        dialogTitle="Sürükle bırak sorularını buradan ekleyin"
        // closeIcon={true}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            className="mt-3 mb-2"
          >
            Soru (varsa) buraya yazılacak
          </Typography>

          <Box className="d-flex align-items-center gap-3 w-100 mb-3">
            <Iconify icon="mingcute:dots-fill" width={20} />
            <TextField name="className" placeholder="İçerik 1" size="small" />
          </Box>

          <Box className="d-flex align-items-center gap-3 w-100 mb-3">
            <Iconify icon="mingcute:dots-fill" width={20} />
            <TextField name="className" placeholder="İçerik 2" size="small" />
          </Box>

          <Box className="d-flex align-items-center gap-3 w-100 mb-3">
            <Iconify icon="mingcute:dots-fill" width={20} />
            <TextField name="className" placeholder="İçerik 3" size="small" />
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="gap-2 mt-3"
          >
            <Button variant="contained" color="secondary">
              Satır Ekle
            </Button>
            <Button variant="contained" color="info">
              Kaydet
            </Button>
          </Stack>
        </DialogContent>
      </CMDialog>
    </>
  );
};

export default QuestionsWrittenHere;
