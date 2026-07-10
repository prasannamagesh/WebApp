'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

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
    Processing: 'bg-yellow-100 text-yellow-800',
    Shipped: 'bg-blue-100 text-blue-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  const paymentColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-green-100 text-green-800',
    Failed: 'bg-red-100 text-red-800',
  };

  const colors = type === 'shipping' ? shippingColors : paymentColors;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        setOrders([
          {
            _id: '1',
            orderId: 'ORD-001',
            customerName: 'Priya Patel',
            customerEmail: 'priya@example.com',
            totalAmount: 89.99,
            shippingStatus: 'Processing',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: {
              city: 'Mumbai',
              state: 'Maharashtra',
              country: 'India',
              zipCode: '400001',
            },
          },
          {
            _id: '2',
            orderId: 'ORD-002',
            customerName: 'Aisha Khan',
            customerEmail: 'aisha@example.com',
            totalAmount: 159.98,
            shippingStatus: 'Shipped',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: {
              city: 'Delhi',
              state: 'Delhi',
              country: 'India',
              zipCode: '110001',
            },
          },
          {
            _id: '3',
            orderId: 'ORD-003',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            totalAmount: 119.97,
            shippingStatus: 'Delivered',
            paymentStatus: 'Completed',
            createdAt: new Date().toISOString(),
            shippingAddress: {
              city: 'New York',
              state: 'NY',
              country: 'USA',
              zipCode: '10001',
            },
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId);
      // TODO: Implement API call to update order status
      console.log(`Updating order ${orderId} status to ${newStatus}`);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, shippingStatus: newStatus as Order['shippingStatus'] }
            : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      // TODO: Implement PDF invoice generation
      const response = await fetch(`/api/orders/${orderId}/invoice`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${orderId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shipping</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tbody key={order._id}>
              <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order._id ? null : order._id)
                    }
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`}
                    />
                    {order.orderId}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>{order.customerName}</div>
                  <div className="text-gray-500 text-xs">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select
                      value={order.shippingStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingStatus === order._id}
                      className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    {updatingStatus === order._id && <Loader2 size={14} className="animate-spin text-blue-600" />}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.paymentStatus} type="payment" />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDownloadInvoice(order.orderId)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download size={14} />
                    Invoice
                  </button>
                </td>
              </tr>

              {/* Expanded row with shipping details */}
              {expandedOrder === order._id && (
                <tr className="bg-blue-50 border-b border-gray-200">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                        {order.shippingAddress ? (
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{order.customerName}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p>{order.shippingAddress.country} {order.shippingAddress.zipCode}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No shipping address available</p>
                        )}
                      </div>
                      <div className="pt-4 border-t border-blue-200">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          View Full Details →
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found</p>
        </div>
      )}
    </div>
  );
}
