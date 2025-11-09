'use client';

import { Box, Typography } from '@mui/material';

export default function PaymentPendingPage() {
  return (
    <Box>
      <Typography variant="h5">Payment integration pending</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        This section will host your future Stripe / PayPal connector.
      </Typography>
    </Box>
  );
}
