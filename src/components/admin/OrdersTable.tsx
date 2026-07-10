'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Download, Loader2, Eye } from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  shippingStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  createdAt: string;
  shippingAddress?: {
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

const StatusBadge = ({ status, type }: { status: string; type: 'shipping' | 'payment' }) => {
  const shippingColors: Record<string, string> = {
    Processing: 'bg-amber-100 text-amber-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-emerald-100 text-emerald-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const paymentColors: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    Failed: 'bg-red-100 text-red-700',
  };

  const colors = type === 'shipping' ? shippingColors : paymentColors;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Mock data with rupees
        setOrders([
          {
            _id: '1',
            orderId: 'ORD-001',
            customerName: 'Priya Patel',
            customerEmail: 'priya@example.com',
            totalAmount: 1499,
            shippingStatus: 'Processing',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: { city: 'Mumbai', state: 'Maharashtra', country: 'India', zipCode: '400001' },
          },
          {
            _id: '2',
            orderId: 'ORD-002',
            customerName: 'Aisha Khan',
            customerEmail: 'aisha@example.com',
            totalAmount: 2699,
            shippingStatus: 'Shipped',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: { city: 'Delhi', state: 'Delhi', country: 'India', zipCode: '110001' },
          },
          {
            _id: '3',
            orderId: 'ORD-003',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            totalAmount: 1999,
            shippingStatus: 'Delivered',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: { city: 'Bangalore', state: 'Karnataka', country: 'India', zipCode: '560001' },
          },
        ]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-brand-accent" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted text-sm">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table View */}
      <table className="w-full hidden md:table">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Shipping</th>
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Payment</th>
            <th className="px-4 py-3 text-left text-xs font-bold tracking-wider uppercase text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm font-semibold text-foreground">{order.orderId}</td>
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-foreground">{order.customerName}</div>
                <div className="text-xs text-muted">{order.customerEmail}</div>
              </td>
              <td className="px-4 py-3 text-sm font-bold text-brand-accent">₹{order.totalAmount}</td>
              <td className="px-4 py-3">
                <StatusBadge status={order.shippingStatus} type="shipping" />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={order.paymentStatus} type="payment" />
              </td>
              <td className="px-4 py-3 text-sm space-x-2">
                <button className="text-brand-accent hover:text-brand-accent/80 font-medium text-xs">View</button>
                <button className="text-muted hover:text-foreground font-medium text-xs">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 p-4">
        {orders.map((order) => (
          <div key={order._id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-foreground">{order.orderId}</p>
                <p className="text-xs text-muted">{order.customerName}</p>
              </div>
              <p className="font-bold text-brand-accent">₹{order.totalAmount}</p>
            </div>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted">Shipping:</span>
                <StatusBadge status={order.shippingStatus} type="shipping" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted">Payment:</span>
                <StatusBadge status={order.paymentStatus} type="payment" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-xs font-bold text-brand-accent hover:bg-brand-accent/10 py-2 rounded transition-colors">
                View Details
              </button>
              <button className="flex-1 text-xs font-bold text-muted hover:bg-slate-100 py-2 rounded transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
