import PropTypes from "prop-types";
// @mui
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// utils
import { useSelector } from "react-redux";

// components
import Iconify from "../../../components/common/iconify/Iconify";
import NotificationsPopover from "./NotificationsPopover";
import InputAdornment from "@mui/material/InputAdornment";
import SubHeader from "./SubHeader";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 40;

const HEADER_DESKTOP = 60;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  padding: theme.spacing(1, 1),
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 3),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { profileInfo } = useSelector((state) => state.auth);

  return (
    <StyledRoot>
      <StyledToolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            placeholder="Arama…"
            className="header_search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="iconamoon:search-light" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" className="gap-2">
          <Stack direction="row" alignItems="center" className="gap-2">
            <Badge variant="dot" overlap="circular" color="slateblue">
              <Iconify icon="clarity:email-solid" color="text.secondary" />
            </Badge>

            <NotificationsPopover />
          </Stack>
          <Stack direction="row" alignItems="center" className="gap-2">
            <Avatar
              sx={{
                backgroundColor: "slateblue.main",
                border: (theme) => `2px solid ${theme.palette.text.secondary}`,
              }}
              src={profileInfo.profileUrl}
            />

            <Box>
              <Typography variant="body1" className="text-capitalize">
                {profileInfo.name}
              </Typography>
              
            </Box>
          </Stack>
          <IconButton
            onClick={onOpenNav}
            sx={{
              color: "text.primary",
              display: { lg: "none" },
            }}
          >
            <Iconify icon="ic:round-menu" />
          </IconButton>
        </Stack>
      </StyledToolbar>
      <SubHeader />
    </StyledRoot>
  );
}
