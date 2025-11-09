// app/dashboard/page.tsx
'use client';

import React from 'react';
import DashboardLayout from '../components/dashboard-layout'; // expects app/dashboard/DashboardLayout.tsx
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

import StatsCard from '../components/stats-card/stats-card';
import GrowthChart from '../components/growth-chart/growth-chart';
import { genUserGrowth, getStats, getRecentActivity, getOrders } from '../../lib/mock';

export default function DashboardPage() {
  // generate demo/mock data (stable on each render since called synchronously)
  const stats = getStats();
  const growth = genUserGrowth(7);
  const activity = getRecentActivity();
  const orders = getOrders();
  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4">Welcome back 👋</Typography>
            <Typography variant="body2" color="text.secondary">Here’s what happened in the last 7 days</Typography>
          </Box>
          <Button variant="contained">Create Report</Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Active Users"
              value={stats.activeUsers}
              subtitle={`${growth[growth.length - 1].users - growth[0].users} since last week`}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard
              title="New Signups"
              value={stats.newSignups}
              subtitle={`${Math.round((stats.newSignups / stats.activeUsers) * 100)}% of active`}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard title="Orders" value={stats.orders} subtitle={`Recent revenue $${stats.revenue}`} />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatsCard title="Revenue (USD)" value={`$${stats.revenue}`} subtitle="Estimated" />
          </Grid>

          <Grid item xs={12} md={8}>
            <GrowthChart data={growth} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Recent Activity
              </Typography>
              <List dense>
                {activity.map((a) => (
                  <React.Fragment key={a.id}>
                    <ListItem>
                      <ListItemText primary={a.text} secondary={a.time} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button sx={{ mt: 1 }} size="small">
                View all activity
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Recent Orders
              </Typography>
              <List>
                {orders.map((o) => (
                  <ListItem key={o.id}>
                    <ListItemText primary={`${o.id} — ${o.customer}`} secondary={`${o.total} • ${o.status}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Quick Actions
              </Typography>
              <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
                Create Offer
              </Button>
              <Button fullWidth variant="outlined">
                Export CSV
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}


