import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F1F1F1",
  200: "#E6E6E6",
  300: "#E7E9EB",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#525252",
  700: "#454F5B",
  800: "#1A1A1A",
  900: "#727272",
};

const PRIMARY = {
  lighter: "#D0E0F9",
  light: "#6E94DB",
  main: "#183887",
  dark: "#0C1F61",
  darker: "#040E40",
  contrastText: "#ffffff",
};

const SECONDARY = {
  lighter: "#FAD4DE",
  light: "#E57BAB",
  main: "#A9277C",
  dark: "#79136A",
  darker: "#4D0751",
  contrastText: "#ffffff",
};

const INFO = {
  lighter: "#E8E0FE",
  light: "#B6A1FB",
  main: "#7F63F4",
  dark: "#4531AF",
  darker: "#1E1375",
  contrastText: "#ffffff",
};

const SUCCESS = {
  lighter: "#F8FCDF",
  light: "#DDEC9B",
  main: "#A9C353",
  dark: "#708C29",
  darker: "#445D0F",
  contrastText: "#ffffff",
};

const WARNING = {
  lighter: "#FEF2D8",
  light: "#FBCA8A",
  main: "#F3913D",
  dark: "#AE511E",
  darker: "#74250B",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FDE3D7",
  light: "#F39787",
  main: "#DA393E",
  dark: "#9C1C37",
  darker: "#680A2E",
  contrastText: "#ffffff",
};

const palette = {
  common: { black: "#000", white: "#ffffff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: "#6A707E",
    secondary: "#AAAAAA",
    disabled: "#ABAFB3",
    contrastText: "#ffffff",
  },
  background: {
    paper: "#ffffff",
    default: GREY[100],
    neutral: GREY[200],
    tableBgBody: "#DDDFE1",
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
