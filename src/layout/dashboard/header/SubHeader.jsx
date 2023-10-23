import PropTypes from "prop-types";
// @mui
import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils

// components
import { filter, get } from "lodash";
import { useLocation } from "react-router-dom";
import navConfig from "../nav/config";
import PathBreadcrumbs from "../../../components/common/breadcrumbs/PathBreadcrumbs";

// ----------------------------------------------------------------------

const SUB_HEADER_DESKTOP = 40;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up("xs")]: {
    minHeight: SUB_HEADER_DESKTOP,
    padding: theme.spacing(0, 3),
  },
}));

// ----------------------------------------------------------------------

SubHeader.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function SubHeader({ onOpenNav }) {
  const location = useLocation();

  const headingContent = filter(navConfig, (item) => {
    return item.path === location.pathname;
  });

  return (
    <StyledToolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.contrastText">
          {get(headingContent, "[0].title", "")}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <PathBreadcrumbs />
    </StyledToolbar>
  );
}
