'use client';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: { mode: 'light', background: { default: '#f0f2f5' } },
  shape: { borderRadius: 8 },
});

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}