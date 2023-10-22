import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], .45),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
