'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/context/AuthContext';
import { axiosClient } from '@/lib/axiosClient';

export default function Home() {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    // Only run demo auto-login when explicitly enabled
    if (process.env.NEXT_PUBLIC_DEMO !== 'true') {
      // Not demo mode — behave normally: redirect based on auth
      if (!authLoading && isAuthenticated) router.replace('/dashboard');
      if (!authLoading && !isAuthenticated) router.replace('/login');
      return;
    }
    const doDemoLogin = async () => {
      try {
        const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? '';
        const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? '';
        if (!demoEmail || !demoPassword) {
          console.warn('Demo enabled but demo credentials not set.');
          router.replace('/login');
          return;
        }
        if (login) {
          await login(demoEmail, demoPassword);
          router.replace('/dashboard');
          return;
        }
        router.replace('/dashboard');
      } catch (err) {
        console.error('Demo auto-login failed', err);
        router.replace('/login');
      } finally {
        setBusy(false);
      }
    };

    doDemoLogin();
  }, [login, isAuthenticated, authLoading, router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Preparing demo environment…</h2>
        <div style={{ marginTop: 16 }}><CircularProgress /></div>
      </div>
    </div>
  );
}

