import PropTypes from "prop-types";

// @mui
import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// utils
import { useLocation } from "react-router-dom";

// components
import PathBreadcrumbs from "components/common/breadcrumbs/PathBreadcrumbs";
import navConfig from "../nav/config";

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

  const findNavItem = (items, pathname) => {
    for (const item of items) {
      if (item.path === pathname) {
        return item; // Found a matching item at the current level
      } else if (item.children) {
        const childMatch = findNavItem(item.children, pathname);
        if (childMatch) {
          return childMatch; // Found a matching item among the children
        }
      }
    }
    return null; // No matching item found
  };

  const headingContent = findNavItem(navConfig, location.pathname);
  return (
    <StyledToolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.contrastText">
          {headingContent.title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <PathBreadcrumbs />
    </StyledToolbar>
  );
}
