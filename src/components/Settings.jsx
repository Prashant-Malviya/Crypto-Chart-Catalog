import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

export default function Settings() {
  const { currency, setCurrency } = useSettings();

  return (
    <div className="grid gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
        <div className="flex items-center justify-between">
          <label htmlFor="currency" className="text-sm font-medium text-gray-700 dark:text-gray-200 mx-3">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-900 font-bold border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </div>
    </div>
  );
}

