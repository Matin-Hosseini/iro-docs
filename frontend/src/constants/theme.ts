"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  direction: "rtl",
  palette: {
    mode: "light",
  },

  typography: {
    fontFamily: "var(--dana-font)",
  },
});

export default theme;
