'use client';

import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>('Verifying your email...');

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000';

    useEffect(() => {
        const token = searchParams.get('token');
        const id = searchParams.get('id');
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link.');
            return;
        }

        const verify = async () => {
            try {
                const res = await axios(`${API_BASE}/api/auth/verify?token=${token}&id=${id}`);
                const data = res.data;
                if (!data?.status || data?.status !== 200) throw new Error(data.message || 'Verification failed.');
                setStatus('success');
                setMessage('Your email has been verified! You can now log in.');
                setTimeout(() => router.push(data?.url), 2500);
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message || 'Verification failed.');
            }
        };
        verify();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', width: '100%' }} elevation={4}>
                {status === 'loading' && (
                    <>
                        <CircularProgress sx={{ mb: 2 }} />
                        <Typography variant="h6">Verifying your email...</Typography>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                        <Typography variant="h5">Email Verified 🎉</Typography>
                        <Alert severity="success" sx={{ mt: 2, mb: 3 }}>{message}</Alert>
                        <Button variant="contained" onClick={() => router.push('/login')}>
                            Go to Login
                        </Button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
                        <Typography variant="h5">Verification Failed</Typography>
                        <Alert severity="error" sx={{ mt: 2, mb: 3 }}>{message}</Alert>
                        <Button variant="outlined" onClick={() => router.push('/register')}>
                            Back to Sign Up
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
}
