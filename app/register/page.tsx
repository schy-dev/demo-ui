'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Stack,
} from '@mui/material';
import { PersonAdd, Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function getErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error';
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err as object);
  } catch {
    return 'Unknown error';
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const API_BASE = process.env.API_URL ?? 'http://localhost:4000';
  console.log(API_BASE, "API_BASE");
  useEffect(() => {
    console.log(accessToken, "accessToken");
    if(accessToken) router.push('/dashboard');
  }, [accessToken]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const validate = (data: RegisterForm): string | null => {
    if (!data.name?.trim()) return 'Name is required.';
    if (!data.email) return 'Email is required.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(data.email)) return 'Enter a valid email address.';
    if (!data.password || data.password.length < 6) return 'Password must be at least 6 characters.';
    if (data.password !== data.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const v = validate(form);
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
        const res = await axios.post(`${API_BASE}/api/auth/register`,
            { name: form.name.trim(), email: form.email.trim(), password: form.password }
        );

      const data = await res.data;
      if (!data.ok || (data && data.ok === false)) {
        const msg = data?.message ?? `Registration failed (status ${res.status})`;
        throw new Error(msg);
      }

      setSuccess('Registered successfully. Please check your email to verify your account.');
      // Optionally redirect to login after short pause
      if(window){
        window.location.href = data.testUrl;
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // --- Google OAuth redirect flow (simpler & reliable) ---
  // Backend should expose GET /api/auth/oauth/google which redirects to Google.
  const onGoogleSignUp = () => {
    // This will navigate away to your backend oauth start endpoint
    // Backend should eventually redirect back to frontend with session cookie or tokens
    window.location.href = `${API_BASE}/api/auth/oauth/google`;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={8} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ mb: 1, bgcolor: 'primary.main' }}>
            <PersonAdd />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Create account
          </Typography>

          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0, width: '100%' }}>
            <TextField
              name="name"
              label="Full name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoComplete="name"
            />

            <TextField
              name="email"
              label="Email address"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoComplete="email"
            />

            <TextField
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="large" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
              helperText="At least 6 characters"
            />

            <TextField
              name="confirmPassword"
              label="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
            />

            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mt: 3 }}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
            Or
          </Typography>

          <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
            <Button
              startIcon={<Google />}
              variant="outlined"
              fullWidth
              onClick={onGoogleSignUp}
              sx={{ textTransform: 'none' }}
            >
              Sign up with Google
            </Button>

            <Button
              variant="text"
              onClick={() => router.push('/login')}
              sx={{ textTransform: 'none' }}
            >
              Already have an account? Log in
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}