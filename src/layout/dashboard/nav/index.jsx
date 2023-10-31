import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// @mui
import { Box, Drawer, Link } from "@mui/material";

// hooks
import useResponsive from "components/hooks/useResponsive";

// components
//
import { imageObj } from "services/images";
import NavSection from "../nav-section/NavSection";
import navConfig from "./config";
import { getProfileInfo } from "redux/store/slice/auth/authSlice";
import { getSession } from "services/utiles";

// ----------------------------------------------------------------------

const NAV_WIDTH = 281;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isDesktop = useResponsive("up", "lg");
  const HEADER_DESKTOP = 60;

  const {id} = getSession();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <>
      <Box
        sx={{ minHeight: HEADER_DESKTOP, backgroundColor: "primary.main" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Link underline="none">
          <Box component="img" src={imageObj.logo} sx={{ maxWidth: 150 }} />
        </Link>
      </Box>
      <NavSection data={navConfig} />
    </>
  );

  useEffect(() => {
    dispatch(getProfileInfo({id}));
  }, [dispatch, id]);

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
              boxShadow: (theme) => theme.shadows[9],
              "&::-webkit-scrollbar": {
                display: "none",
              },
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
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
