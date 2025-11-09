'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container, Paper, Box, Avatar, Typography, TextField, Button, InputAdornment, IconButton, Alert,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';

function getErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error';
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try { return JSON.stringify(err as object); } catch { return 'Unknown error'; }
}

export default function LoginPage() {
  const { login, accessToken } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Email and password are required');

    setLoading(true);
    try {
      await login(form.email, form.password); // AuthContext handles setting tokens & redirect
      // login() redirects to /dashboard on success
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    if(accessToken) router.push('/dashboard')
  }, [])

  return (
    <Container maxWidth="xs">
      <Paper sx={{ mt: 10, p: 4 }} elevation={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" sx={{ mb: 2 }}>Sign in</Typography>

          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              autoComplete="email"
            />

            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="large">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="current-password"
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 3 }}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </Box>

          <Button variant="text" onClick={() => router.push('/register')} sx={{ mt: 2 }}>
            Don’t have an account? Create one
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}


