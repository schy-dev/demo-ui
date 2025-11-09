// components/Analytics/ChartCard.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type ChartCardProps = {
  title: string;
  subtitle?: string;
  height?: number; // px
  children?: React.ReactNode;
  'aria-label'?: string;
};

export default function ChartCard({ title, subtitle, height = 220, children, 'aria-label': ariaLabel }: ChartCardProps) {
  return (
    <Card role="region" aria-label={ariaLabel ?? `Chart card: ${title}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={<Typography variant="subtitle1">{title}</Typography>}
        subheader={subtitle}
        action={
          <IconButton aria-label={`options for ${title}`}>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ flex: 1, pt: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chart container */}
        <Box
          sx={{
            flex: 1,
            minHeight: height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: children ? 'stretch' : 'center',
          }}
        >
          {children ? (
            // If the user passed a chart component, render it and let it size itself
            <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
          ) : (
            // Placeholder when no chart is provided
            <Box sx={{ textAlign: 'center', color: 'text.secondary', px: 2 }}>
              <Typography variant="body2">Chart placeholder — connect your chart component here.</Typography>
            </Box>
          )}
        </Box>

        {/* Optional footer area for legends / KPIs */}
        <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          {/* Example small KPI (replace or remove as needed) */}
          <Typography variant="caption" color="text.secondary">Last 30 days</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
