import { Box, Grid } from "@mui/material";
import BackButton from "components/common/BackButton";
import { useNavigate } from "react-router-dom";

const CreateBookAndEvent = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackButton />
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
            onClick={() =>
              navigate("/dashboard/contents/create-book-event/puzzel-task")
            }
          >
            Uyarı
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateBookAndEvent;
