import { Box, Grid } from "@mui/material";
import React from "react";

const Contents = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box className="common_multi_box sainsbury">Creating Pages</Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box sea-sparkle">Social Content</Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box sweet-midori">
            Downloadable Materials for Teacher's
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box blue-jeans">
            Video Training Pages
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="mt-2">
        <Grid item xs={2}>
          <Box className="common_multi_box highlighter-orange">FAQ</Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box deep-purple">Help</Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box safflower-red">
            Legal Documents and Permissions
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box className="common_multi_box yellow-stagshorn">Archive</Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Contents;
