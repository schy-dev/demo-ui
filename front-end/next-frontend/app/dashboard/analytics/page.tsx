'use client';

import { Typography, Grid } from '@mui/material';
import ChartCard from '../../components/analytics/chart-card';

export default function AnalyticsPage() {
  return (
    <>
      <Typography variant="h5" gutterBottom>Analytics Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}><ChartCard title="User Growth" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><ChartCard title="Activity Metrics" /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><ChartCard title="Order Stats" /></Grid>
      </Grid>
    </>
  );
}
