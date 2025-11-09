// app/dashboard/SupportButton.tsx
'use client';

import React from 'react';
import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AIChatDrawer from './ai-chat-bot/ai-chat-drawer';

export default function SupportButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="AI chat"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: (theme) => theme.zIndex.tooltip + 2000,
        }}
      >
        <ChatIcon />
      </Fab>

      <AIChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}


