'use client';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import DashboardCards from '@/components/admin/DashboardCards';
import OrdersTable from '@/components/admin/OrdersTable';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    inventoryLevel: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        setStats({
          totalRevenue: 45250.50,
          totalOrders: 328,
          inventoryLevel: 1240,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900">
        <AlertCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Monitor your DermFix business metrics</p>
      </div>

      {/* Metrics Cards */}
      <DashboardCards stats={stats} loading={loading} />

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 md:p-6 border-b border-slate-200">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Recent Orders</h2>
          <p className="text-xs md:text-sm text-muted mt-1">Track and manage orders in real-time</p>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}
