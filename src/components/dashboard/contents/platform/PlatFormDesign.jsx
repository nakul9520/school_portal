import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlatFormDesign = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "mint.main" }}
            onClick={() =>
              navigate("/dashboard/contents/platform-design/creating-page")
            }
          >
            Creating Pages
          </Box>
        </Grid> */}
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "sainsbury.main" }}
            onClick={() =>
              navigate("/dashboard/contents/platform-design/social-content")
            }
          >
            Social Content
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box sweet-midori"
            onClick={() =>
              navigate(
                "/dashboard/contents/platform-design/downloadable-content"
              )
            }
          >
            Downloadable Materials for Teacher's
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box blue-jeans"
            onClick={() =>
              navigate("/dashboard/contents/platform-design/video-content")
            }
          >
            Video Training Pages
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="mt-2">
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box highlighter-orange"
            onClick={() => navigate("/dashboard/contents/platform-design/faq")}
          >
            FAQ
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box deep-purple"
            onClick={() => navigate("/dashboard/contents/platform-design/help")}
          >
            Help
          </Box>
        </Grid>
        <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box
            className="common_multi_box safflower-red"
            onClick={() =>
              navigate("/dashboard/contents/platform-design/legal-documents")
            }
          >
            Legal Documents and Permissions
          </Box>
        </Grid>
        {/* <Grid item xs={10} sm={4} md={3} lg={2}>
          <Box className="common_multi_box yellow-stagshorn">Archive</Box>
        </Grid> */}
      </Grid>
    </>
  );
};

export default PlatFormDesign;
