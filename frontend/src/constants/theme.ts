import { createTheme } from "@mui/material/styles";

//fonts
import danaFont from "./../assets/fonts/dana/fa-num/DanaFaNum-Medium.ttf";

const theme = createTheme({
  typography: {
    fontFamily: "dana",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'dana';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${danaFont});
        }
      `,
    },
  },
});

export default theme;
