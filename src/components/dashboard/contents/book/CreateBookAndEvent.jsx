import React, { useState } from "react";

import { Box, Grid } from "@mui/material";

import AddPuzzel from "../model/AddPuzzel";
import VoiceRecording from "../model/VoiceRecording";
import AddMultipleChoiceQuestions from "../model/AddMultipleChoiceQuestions";
import AddMatchingQuestions from "../model/AddMatchingQuestions";
import QuestionsWrittenHere from "../model/QuestionsWrittenHere";

const CreateBookAndEvent = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
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
            onClick={() => setOpen1(true)}
          >
            Ses Kaydetme Görevi
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={1} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "sainsbury.main" }}
            onClick={() => setOpen2(true)}
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

      <VoiceRecording open={open1} onClose={handleClose1} />
      <AddMultipleChoiceQuestions open={open2} onClose={handleClose2} />
      <AddMatchingQuestions open={open3} onClose={handleClose3} />
      <QuestionsWrittenHere open={open4} onClose={handleClose4} />
      <AddPuzzel open={open5} onClose={handleClose5} />
    </>
  );
};

export default CreateBookAndEvent;
