'use client';

import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Configure DermFix admin panel settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <SettingsIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">General Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Configure store name, currency, and basic settings</p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <SettingsIcon size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">API Keys</h3>
              <p className="text-sm text-gray-600 mt-1">Manage payment gateways and external integrations</p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <SettingsIcon size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Configure transactional email and notifications</p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Shipping Configuration */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <SettingsIcon size={24} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Shipping Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Manage shipping providers and rates</p>
              <button className="mt-4 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-800">
                Configure →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
