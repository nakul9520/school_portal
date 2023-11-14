import { useState } from "react";

import { Box, Grid } from "@mui/material";

import { useNavigate } from "react-router-dom";
import AddMatchingQuestions from "./model/AddMatchingQuestions";
import AddPuzzel from "./model/AddPuzzel";
import QuestionsWrittenHere from "./model/QuestionsWrittenHere";

const CreateBookAndEvent = () => {
  const navigate = useNavigate();

  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
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
            onClick={() => setOpen3(true)}
          >
            Eşleştirme Ekle
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "info.main" }}
            onClick={() => setOpen4(true)}
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

      <AddMatchingQuestions open={open3} onClose={handleClose3} />
      <QuestionsWrittenHere open={open4} onClose={handleClose4} />
      <AddPuzzel open={open5} onClose={handleClose5} />
    </>
  );
};

export default CreateBookAndEvent;
