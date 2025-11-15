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
            <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
          ) : (
            // ⭐ Dummy Chart When No Children Provided ⭐
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 1,
                px: 2,
              }}
            >
              {[40, 80, 55, 95, 65, 30].map((h, i) => (
                <Box
                  key={i}
                  sx={{
                    width: '14%',
                    height: `${h}%`,
                    backgroundColor: 'primary.main',
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Optional footer area for legends / KPIs */}
        <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Typography variant="caption" color="text.secondary">Last 30 days</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
