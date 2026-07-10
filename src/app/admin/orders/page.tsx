'use client';

import OrdersTable from '@/components/admin/OrdersTable';

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600 mt-2">View and manage all customer orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Orders</h2>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}
