// app/dashboard/DashboardLayout.tsx
'use client';

import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SupportButton from './supported-button';
import { logout } from '@/lib/auth';
import ProtectedRoute from './protected-routes';
import { useAuth } from '@/context/AuthContext';

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // If logout is async, await it; otherwise call directly
      await logout();
    } catch (err) {
      // ignore for demo
      console.error(err);
    } finally {
      router.push('/login');
    }
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
        <Box>
          <Typography fontWeight={700}>Your Name</Typography>
          <Typography variant="body2" color="text.secondary">View profile</Typography>
        </Box>
      </Box>

      <Divider />

      <List>
        <ListItemButton component={Link} href="/dashboard"><ListItemText primary="Home" /></ListItemButton>
        <ListItemButton component={Link} href="/dashboard/analytics"><ListItemText primary="Analytics" /></ListItemButton>
        <ListItemButton component={Link} href="/dashboard/translate"><ListItemText primary="Translate" /></ListItemButton>
        {/* <ListItemButton component={Link} href="/dashboard/support"><ListItemText primary="Support" /></ListItemButton> */}
        <ListItemButton component={Link} href="/dashboard/payment"><ListItemText primary="Payments" /></ListItemButton>
        <ListItemButton component={Link} href="/dashboard/storage"><ListItemText primary="Cloud Storage" /></ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={handleLogout}><ListItemText primary="Sign out" /></ListItemButton>
      </List>
    </>
  );

  return (
    // <ProtectedRoute>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} aria-label="open menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
          </Toolbar>
        </AppBar>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent drawer for desktop */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: 8 },
            display: { xs: 'none', md: 'block' },
          }}
          open
        >
          {drawerContent}
        </Drawer>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>

        {/* Support button + drawer integrated globally in layout */}
        <SupportButton />
      </Box>
    // </ProtectedRoute>
  );
}
