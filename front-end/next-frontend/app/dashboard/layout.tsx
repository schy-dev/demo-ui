// app/dashboard/layout.tsx
import React from 'react';
import DashboardLayout from '../components/dashboard-layout'; // client wrapper

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
