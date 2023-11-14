import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SystemSetting = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={{ xs: "center", sm: "start" }}
      >
        <Grid item xs={10} sm={5} md={4} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "mint.main" }}
            onClick={() => navigate("/dashboard/system-settings/edit")}
          >
            Edit
          </Box>
        </Grid>
        {/* <Grid item xs={10} sm={5} md={4} lg={2}>
          <Box
            className="common_multi_box"
            sx={{ backgroundColor: "sainsbury.main" }}
          >
            Delete
          </Box>
        </Grid> */}
        <Grid item xs={10} sm={5} md={4} lg={2}>
          <Box
            className="common_multi_box "
            sx={{ backgroundColor: "success.main" }}
            onClick={() => navigate("/dashboard/system-settings/sub-admin")}
          >
            New Super Admin
          </Box>
        </Grid>
        {/* <Grid item xs={10} sm={5} md={4} lg={2}>
          <Box
            className="common_multi_box "
            sx={{ backgroundColor: "info.main" }}
          >
            Edit Super Admin Password
          </Box>
        </Grid> */}
        {/* <Grid item xs={10} sm={5} md={4} lg={2}>
          <Box
            className="common_multi_box "
            sx={{ backgroundColor: "warning.main" }}
          >
            Get System Backup
          </Box>
        </Grid> */}
      </Grid>
    </>
  );
};

export default SystemSetting;
