import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import {
  Box,
  Divider,
  List,
  ListItemText,
  Typography,
  alpha,
} from "@mui/material";
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
    <Box {...other} className="h-100">
      <Box
        sx={{
          background: theme.palette.secondary.main,
          height: "40px",
        }}
        className="d-flex align-items-center"
      >
        <Typography
          variant="h5"
          color="secondary.contrastText"
          className="ms-4"
        >
          Superadmin Dashboard
        </Typography>
      </Box>
      <List disablePadding sx={{ pt: 4, px: 0 }} className="h-100">
        {data.map((item) => (
          <>
            <NavItem key={item.title} item={item} />
            {item.divider ? <Divider className="my-3" /> : null}
          </>
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
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          fontWeight: "fontWeightBold",
          "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "5px",
            height: "100%",
            background: (theme) => theme.palette.primary.main,
          },
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
