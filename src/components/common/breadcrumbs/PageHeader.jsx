import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PathBreadcrumbs from "./PathBreadcrumbs";

const PageHeader = (props) => {
  const { title, titleStyle, ...rest } = props;

  return (
    <Box {...rest}>
      {title ? (
        <Typography
          variant="h4"
          sx={{ ...titleStyle }}
          className="mb-2"
        >
          {title}
        </Typography>
      ) : null}

      <PathBreadcrumbs />
    </Box>
  );
};

export default PageHeader;
