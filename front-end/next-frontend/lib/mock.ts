// lib/mock.ts
export type GrowthPoint = { date: string; users: number; newSignups: number };

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genUserGrowth(days = 7): GrowthPoint[] {
  const out: GrowthPoint[] = [];
  const today = new Date();
  let base = rand(3500, 5200);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const trend = 1 + (Math.random() * 0.06 - 0.02); // -2% .. +4%
    base = Math.max(0, Math.round(base * trend + rand(-50, 80)));
    out.push({
      date: d.toISOString().slice(0, 10),
      users: base,
      newSignups: rand(50, 420),
    });
  }
  return out;
}

export function getStats() {
  return {
    activeUsers: rand(3800, 5200),
    newSignups: rand(120, 460),
    orders: rand(60, 380),
    revenue: (rand(3000, 12000) + Math.random()).toFixed(2),
  };
}

export function getRecentActivity() {
  return [
    { id: 1, text: 'Order #A102 shipped', time: '2m ago' },
    { id: 2, text: 'New signup: alice@example.com', time: '12m ago' },
    { id: 3, text: 'Refund processed: #A089', time: '1h ago' },
    { id: 4, text: 'Password reset requested', time: '3h ago' },
  ];
}

export function getOrders() {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `ORD-${1000 + i}`,
    customer: ['Alice', 'Bob', 'Carlos', 'Diana', 'Eve'][i],
    total: `$${rand(40, 620)}.00`,
    status: ['Processing', 'Shipped', 'Delivered', 'Cancelled'][rand(0, 3)],
  }));
}

