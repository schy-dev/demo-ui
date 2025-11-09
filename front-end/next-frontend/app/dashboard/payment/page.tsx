'use client';

import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Payment API Integration</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography>
          Reserved area for Stripe or PayPal integration.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={() => router.push('/dashboard/payment/pending')}>
            Payment Entry
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
