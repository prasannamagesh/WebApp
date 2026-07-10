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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage DermFix operations and orders</p>
      </div>

      {/* Metrics Cards */}
      <DashboardCards stats={stats} loading={loading} />

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}
