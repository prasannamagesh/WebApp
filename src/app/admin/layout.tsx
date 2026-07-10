'use client';

import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Admin header */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Admin Panel</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
