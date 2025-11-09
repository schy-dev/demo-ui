'use client';

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

export default function StoragePage() {
  const handleUpload = () => alert('S3 upload integration pending.');

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Cloud Object Storage</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography>
          Placeholder for S3-compatible storage (AWS S3, MinIO, etc.).
        </Typography>
        <Box mt={2}>
          <Button variant="contained" onClick={handleUpload}>Upload File</Button>
        </Box>
      </Paper>
    </Box>
  );
}
