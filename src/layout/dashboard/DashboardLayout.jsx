import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
//
import { Outlet } from "react-router-dom";
import Header from "./header";
import Nav from "./nav";
import BackButton from "components/common/BackButton";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 109;
const APP_BAR_DESKTOP = 100;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  background: theme.palette.background.paper,
  paddingTop: APP_BAR_MOBILE + 20,
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 35,
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <BackButton />
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
