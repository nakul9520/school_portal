import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Drawer, Link } from "@mui/material";

// hooks
import useResponsive from "components/hooks/useResponsive";

// components
//
import Scrollbar from "components/common/scrollbar/Scrollbar";
import { imageObj } from "services/images";
import NavSection from "../nav-section/NavSection";
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 281;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive("up", "lg");
  const HEADER_DESKTOP = 80;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
    className="scrollbar-none"
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{ height: HEADER_DESKTOP, backgroundColor: "primary.main" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Link underline="none">
          <Box component="img" src={imageObj.logo} sx={{ maxWidth: 150 }} />
        </Link>
      </Box>
      <NavSection data={navConfig} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              borderRight: "none",
              boxShadow: (theme)=>theme.shadows[9]
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              borderRight: "none",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
