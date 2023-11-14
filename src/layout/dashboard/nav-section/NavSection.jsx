import PropTypes from "prop-types";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
//
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const [open, setOpen] = useState(0);

  const handleToggle = (id) => {
    setOpen((preId) => (preId === id ? 0 : id));
  };

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
          <React.Fragment key={item.id}>
            <NavItem item={item} handleToggle={() => handleToggle(item.id)} />
            {item.divider ? <Divider className="my-3" /> : null}
            {item.type === "collapse" && (
              <Collapse in={open === item.id}>
                {item.children.map((childItem, index) => (
                  <NavItem
                    key={index}
                    item={childItem}
                    handleToggle={handleToggle}
                  />
                ))}
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, handleToggle }) {
  const { title, path, icon } = item;
  const { pathname } = useLocation();

  const [pathStatus, setPathStatus] = useState(1);

  useEffect(() => {
    const pathStatusMappings = {
      "/dashboard/username-and-groups": 1,
      "/dashboard/username-and-groups/school": 1.1,
      "/dashboard/username-and-groups/class": 1.2,
      "/dashboard/username-and-groups/teacher": 1.3,
      "/dashboard/username-and-groups/student": 1.4,
      "/dashboard/reports": 2,
      "/dashboard/reports/school-reports": 2.1,
      "/dashboard/reports/book-reports": 2.2,
      "/dashboard/reports/system-reports": 2.3,
      "/dashboard/leveling": 3,
      "/dashboard/assignment": 4,
      "/dashboard/contents/platform-design": 5.1,
      "/dashboard/contents/library-categories": 5.2,
      "/dashboard/contents/book-design": 5.3,
      "/dashboard/system-settings": 6,
      "/dashboard/badges": 7,
      "/dashboard/add-badges": 7,
    };
    // Find the parent id of the current pathname
    let parentItem = null;
    for (const path in pathStatusMappings) {
      if (pathname === path) {
        parentItem = pathStatusMappings[path];
        break;
      } else if (
        Array.isArray(pathStatusMappings[path]) &&
        pathStatusMappings[path].includes(pathname)
      ) {
        parentItem = pathStatusMappings[path][0];
        break;
      }
    }
    if (parentItem) {
      setPathStatus(parentItem);
    }
  }, [pathname]);

  return (
    <StyledNavItem
      component={RouterLink}
      onClick={handleToggle}
      to={path}
      selected={item.id === pathStatus}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  );
}
