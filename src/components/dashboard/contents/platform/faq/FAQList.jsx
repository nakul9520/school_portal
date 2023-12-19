import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import BackButton from "components/common/BackButton";
import Iconify from "components/common/iconify";
import { isEmpty, map } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteFAQ,
  getGuideLineList,
} from "redux/store/slice/dashboard/contentSlice";
import { GUIDELINE_TYPE } from "services/constant";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<Iconify icon="ic:round-expand-more" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FAQList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { guideLinesData, loading } = useSelector((state) => state.content);
  useEffect(() => {
    dispatch(getGuideLineList(GUIDELINE_TYPE.faq));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFAQ({ id: id }))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast.success(result.message);
          dispatch(getGuideLineList(GUIDELINE_TYPE.faq));
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("Error: ", err);
      });
  };
  return (
    <>
      <BackButton />
      <Box
        sx={{
          p: 2,
          boxShadow: theme.shadows[3],
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item sm={6} xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              FAQ İçerik
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} className="table_bottom_tabs text-right">
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                navigate("/dashboard/contents/platform-design/add-faq")
              }
            >
              FAQ İçerik Ekle
            </Button>
          </Grid>
        </Grid>

        <Grid container className="mt-2" spacing={2}>
          {loading ? (
            <LinearProgress />
          ) : isEmpty(guideLinesData) ? (
            <Typography variant="subtitle1" color="text.primary">
              Mevcut Veri Yok
            </Typography>
          ) : (
            map(guideLinesData, (item, index) => (
              <Grid item md={6} xs={12} key={index}>
                <Accordion
                  expanded={expanded === item.id}
                  onChange={handleChange(item.id)}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Stack
                      direction="row"
                      className="align-items-center justify-content-between w-100"
                    >
                      <Typography>{item.title}</Typography>
                      <Stack
                        direction="row"
                        className="align-items-center justify-content-between"
                      >
                        <IconButton
                          onClick={() =>
                            navigate(
                              "/dashboard/contents/platform-design/add-faq",
                              { state: item }
                            )
                          }
                        >
                          <Iconify icon="ic:baseline-edit" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <Iconify icon="fluent:delete-12-filled" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default FAQList;
