import React from 'react'
import { formatPrice, formatDate } from '../utils/chartUtils'
import { useSettings } from '../contexts/SettingsContext';

function Summary({ data, coinData }) {
  const { currency } = useSettings();
  const latestPrice = data.length > 0 ? data[data.length - 1].price : 0
  const highestPrice = data.length > 0 ? Math.max(...data.map(d => d.price)) : 0
  const lowestPrice = data.length > 0 ? Math.min(...data.map(d => d.price)) : 0
  const averagePrice = data.length > 0 ? data.reduce((sum, d) => sum + d.price, 0) / data.length : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Price</h3>
        <div className="mt-1">
          <div className="text-2xl font-bold">{formatPrice(latestPrice, currency)}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            As of {formatDate(data.length > 0 ? data[data.length - 1].timestamp : null)}
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Highest Price</h3>
        <div className="mt-1">
          <div className="text-2xl font-bold">{formatPrice(highestPrice, currency)}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            In the selected time range
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lowest Price</h3>
        <div className="mt-1">
          <div className="text-2xl font-bold">{formatPrice(lowestPrice, currency)}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            In the selected time range
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Price</h3>
        <div className="mt-1">
          <div className="text-2xl font-bold">{formatPrice(averagePrice, currency)}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            In the selected time range
          </p>
        </div>
      </div>
    </div>
  )
}

export default Summary

