"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "@/constants/theme";
import { ThemeProvider } from "@mui/material/styles";

export default function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir={theme.direction}>{children}</div>
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}
