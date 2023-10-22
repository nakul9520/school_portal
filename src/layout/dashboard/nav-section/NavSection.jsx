import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText, Typography } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import { useTheme } from "@emotion/react";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const theme = useTheme();
  return (
    <Box {...other}>
      <Box sx={{
        background: theme.palette.secondary.main ,
        height: "40px",
      }}
      className="d-flex align-items-center">
        <Typography variant="h5" color="secondary.contrastText" className="ms-4">
          Superadmin Dashboard
        </Typography>
      </Box>
      <List disablePadding sx={{ p: 1, pr: 0 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          backgroundColor: "primary.contrastText",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
