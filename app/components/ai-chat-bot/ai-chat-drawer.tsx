// app/dashboard/AIChatDrawer.tsx
'use client';

import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Message = { id: string; from: 'user' | 'bot'; text: string };

export default function AIChatDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();

  // demo messages; keep local state if you later want interactivity
  const [messages] = React.useState<Message[]>([
    { id: 'm1', from: 'bot', text: 'Hi — I am your AI assistant (demo). How can I help?' },
    { id: 'm2', from: 'user', text: 'Show my last order status.' },
    { id: 'm3', from: 'bot', text: 'Order #A102 is in transit and will arrive tomorrow.' },
  ]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // keeps the drawer in the DOM for smoother animations
      }}
      sx={{
        zIndex: (t) => t.zIndex.modal + 2000, // ensure it's above appbar & any overlays
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 420 }, // full width on mobile, 420px on small+
          maxWidth: '100%',
          height: '100vh',
          boxSizing: 'border-box',
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: 420 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6">AI Customer Support</Typography>
          <IconButton onClick={onClose} aria-label="Close chat">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Message area */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: theme.palette.mode === 'light' ? '#fafafa' : undefined }}>
          <List disablePadding>
            {messages.map((m) => (
              <ListItem
                key={m.id}
                sx={{
                  justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <ListItemText
                  primary={m.text}
                  sx={{
                    bgcolor: m.from === 'user' ? 'primary.main' : (theme.palette.mode === 'light' ? 'grey.100' : 'grey.800'),
                    color: m.from === 'user' ? theme.palette.primary.contrastText : undefined,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: '78%',
                    wordBreak: 'break-word',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Input area */}
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            disabled
            inputProps={{ 'aria-label': 'Chat input (disabled demo)' }}
          />
          <Button variant="contained" fullWidth sx={{ mt: 1 }} disabled>
            Start demo chat
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Demo mode — chat disabled. Backend integration coming soon.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

