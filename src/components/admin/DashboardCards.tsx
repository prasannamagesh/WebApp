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
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon size={24} className="text-blue-600" />
      </div>
    </div>
  </div>
);

export default function DashboardCards({ stats, loading }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
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
