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
      "/dashboard/school": 1,
      "/dashboard/class": 2,
      "/dashboard/teacher": 3,
      "/dashboard/student": 4,
      "/dashboard/username-and-groups": 5,
      "/dashboard/reports": 6,
      "/dashboard/reports/school-reports": 6.1,
      "/dashboard/reports/book-reports": 6.2,
      "/dashboard/reports/system-reports": 6.3,

      "/dashboard/leveling": 7,
      "/dashboard/assignment": 8,
      
      "/dashboard/contents/platform-design": 9.1,
      "/dashboard/contents/library-categories": 9.2,
      "/dashboard/contents/book-design": 9.3,
      "/dashboard/system-settings": 10,
      "/dashboard/dramatization": 11,
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
