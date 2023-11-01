// @mui
import { alpha, styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  fontWeight: 400,
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    fontWeight: 600,
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "5px",
      height: "100%",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
