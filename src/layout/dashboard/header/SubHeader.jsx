import PropTypes from "prop-types";
// @mui
import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils

// components
import { filter, get } from "lodash";
import { useLocation } from "react-router-dom";
// import PathBreadcrumbs from "../../../components/common/breadcrumbs/PathBreadcrumbs";

// ----------------------------------------------------------------------

const HEADER_DESKTOP = 40;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: HEADER_DESKTOP,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 3),
  },
}));

// ----------------------------------------------------------------------

SubHeader.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function SubHeader({ onOpenNav }) {
  const location = useLocation();

  const headingList = [
    { path: "/dashboard/app", label: "Dashboard" },
    { path: "/dashboard/pinup-board", label: "Pin Up Board" },

    { path: "/dashboard/settings", label: "Settings" },
    { path: "/dashboard/settings/notification", label: "Settings" },
    { path: "/dashboard/settings/change-password", label: "Settings" },
    { path: "/dashboard/settings/faq", label: "Settings" },
    { path: "/dashboard/settings/terms-and-condition", label: "Settings" },
    { path: "/dashboard/settings/privacy-policy", label: "Settings" },
    { path: "/dashboard/settings/support", label: "Settings" },
  ];
  const headingContent = filter(headingList, (item) => {
    return item.path === location.pathname;
  });

  return (
    <StyledToolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.contrastText">
          {get(headingContent, "[0].label", "")}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* <PathBreadcrumbs /> */}
      DashBoard/okul
    </StyledToolbar>
  );
}
