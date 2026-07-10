'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, Filter, MoreVertical, Mail, Phone, Calendar, Trash2, Edit2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
}

// Mock users data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Anderson',
    email: 'sarah.anderson@example.com',
    phone: '+91 9876543210',
    joinDate: '2024-01-15',
    status: 'active',
    totalOrders: 5,
    totalSpent: 3450,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 9123456789',
    joinDate: '2024-02-20',
    status: 'active',
    totalOrders: 3,
    totalSpent: 1890,
  },
  {
    id: '3',
    name: 'Anjali Patel',
    email: 'anjali.patel@example.com',
    phone: '+91 8765432109',
    joinDate: '2024-03-10',
    status: 'inactive',
    totalOrders: 1,
    totalSpent: 699,
  },
  {
    id: '4',
    name: 'Meera Desai',
    email: 'meera.desai@example.com',
    phone: '+91 7654321098',
    joinDate: '2024-03-25',
    status: 'active',
    totalOrders: 8,
    totalSpent: 5234,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(MOCK_USERS);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'spent'>('date');

  // Filter and search
  useEffect(() => {
    let result = users;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone.includes(searchQuery)
      );
    }

    // Status filter
    if (selectedStatus !== 'all') {
      result = result.filter((user) => user.status === selectedStatus);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'spent':
          return b.totalSpent - a.totalSpent;
        default:
          return 0;
      }
    });

    setFilteredUsers(result);
  }, [users, searchQuery, selectedStatus, sortBy]);

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="w-full">
      {/* Main content */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface border border-subtle transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Users Management</h1>
                <p className="text-sm text-muted mt-1">Manage and view customer information</p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="lg:col-span-2 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2.5 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-2.5 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 border border-subtle rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors"
            >
              <option value="date">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="spent">Highest Spent</option>
            </select>
          </div>

          {/* Users Table — Desktop */}
          <div className="hidden lg:block bg-surface border border-subtle rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background border-b border-subtle">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Name</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Email</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Phone</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Joined</th>
                  <th className="text-left px-6 py-3 font-semibold text-foreground">Orders</th>
                  <th className="text-right px-6 py-3 font-semibold text-foreground">Total Spent</th>
                  <th className="text-center px-6 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-center px-6 py-3 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#f2f2f0] transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 text-muted">{user.email}</td>
                      <td className="px-6 py-4 text-muted">{user.phone}</td>
                      <td className="px-6 py-4 text-muted">{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-foreground font-semibold">{user.totalOrders}</td>
                      <td className="px-6 py-4 text-right font-semibold text-foreground">₹{user.totalSpent.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-600' : 'bg-zinc-400'}`} />
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-surface rounded-lg transition-colors text-zinc-500 hover:text-foreground">
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-zinc-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-muted">
                      No users found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Users Cards — Mobile */}
          <div className="lg:hidden space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="bg-surface border border-subtle rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-xs text-muted mt-1">{user.email}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-600' : 'bg-zinc-400'}`} />
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted">
                      <Phone size={14} />
                      {user.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted">
                      <Calendar size={14} />
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                    <div className="text-foreground font-semibold">
                      {user.totalOrders} orders
                    </div>
                    <div className="text-foreground font-semibold">
                      ₹{user.totalSpent.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-subtle">
                    <button className="flex-1 px-3 py-2 border border-subtle rounded-lg text-xs font-medium hover:bg-surface transition-colors flex items-center justify-center gap-1">
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted">No users found matching your filters.</div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-subtle">
            <div className="bg-surface border border-subtle rounded-lg p-4">
              <p className="text-xs text-muted mb-1">Total Users</p>
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
            </div>
            <div className="bg-surface border border-subtle rounded-lg p-4">
              <p className="text-xs text-muted mb-1">Active Users</p>
              <p className="text-2xl font-bold text-emerald-600">{users.filter((u) => u.status === 'active').length}</p>
            </div>
            <div className="bg-surface border border-subtle rounded-lg p-4">
              <p className="text-xs text-muted mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
