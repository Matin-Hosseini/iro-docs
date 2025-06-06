"use client";
import { createTheme } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";

const theme = createTheme(
  {
    cssVariables: true,
    direction: "rtl",
    palette: {
      mode: "light",
    },

    typography: {
      fontFamily: "var(--dana-font)",
    },
  },
  faIR
);

export default theme;
