'use client';

import { DollarSign, ShoppingCart, Package, type LucideIcon } from 'lucide-react';

interface DashboardCardsProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    inventoryLevel: number;
  };
  loading?: boolean;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs md:text-sm font-semibold text-muted uppercase tracking-wider mb-2">{title}</p>
        {loading ? (
          <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
        ) : (
          <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
        )}
      </div>
      <div className="p-3 bg-brand-accent/10 rounded-lg">
        <Icon size={24} className="text-brand-accent" />
      </div>
    </div>
  </div>
);

export default function DashboardCards({ stats, loading }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`₹${(stats.totalRevenue / 100).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        icon={DollarSign}
        loading={loading}
      />
      <MetricCard
        title="Total Orders"
        value={stats.totalOrders.toLocaleString()}
        icon={ShoppingCart}
        loading={loading}
      />
      <MetricCard
        title="Inventory Levels"
        value={stats.inventoryLevel.toLocaleString()}
        icon={Package}
        loading={loading}
      />
    </div>
  );
}
