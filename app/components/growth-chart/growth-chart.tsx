// app/components/GrowthChart.tsx
'use client';
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import type { GrowthPoint } from '@/lib/mock';

export default function GrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Active Users — Last {data.length} days
      </Typography>
      <Box sx={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={3} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
