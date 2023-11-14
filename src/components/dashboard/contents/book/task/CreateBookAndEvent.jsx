import { useState } from "react";

import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import AddPuzzel from "./model/AddPuzzel";

const CreateBookAndEvent = () => {
  const navigate = useNavigate();

  const [open5, setOpen5] = useState(false);

  const handleClose5 = () => {
    setOpen5(false);
  };

  return (
    <>
      <Grid container className="gap-3">
        <Grid item xs={10} sm={4} md={1} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "mint.main" }}
            onClick={() =>
              navigate("/dashboard/contents/create-book-event/voice-task")
            }
          >
            Ses Kaydetme Görevi
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={1} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "sainsbury.main" }}
            onClick={() =>
              navigate("/dashboard/contents/create-book-event/mcq-task")
            }
          >
            Quiz Ekle
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "success.main" }}
            onClick={() =>
              navigate("/dashboard/contents/create-book-event/matching-task")
            }
          >
            Eşleştirme Ekle
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "info.main" }}
            onClick={() =>
              navigate("/dashboard/contents/create-book-event/drag-drop-task")
            }
          >
            Sürükle Bırak Etkinlik Ekle
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "warning.main" }}
            onClick={() => setOpen5(true)}
          >
            Bulmaca Ekle
          </Box>
        </Grid>
      </Grid>

      <AddPuzzel open={open5} onClose={handleClose5} />
    </>
  );
};

export default CreateBookAndEvent;
