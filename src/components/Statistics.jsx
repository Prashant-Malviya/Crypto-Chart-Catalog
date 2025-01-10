import React from 'react'
import { formatPrice } from '../utils/chartUtils'
import { useSettings } from '../contexts/SettingsContext';

function Statistics({ data, coinData }) {
  const { currency } = useSettings();
  const calculateVolatility = () => {
    if (data.length < 2) return 0
    const returns = data.slice(1).map((d, i) => (d.price - data[i].price) / data[i].price)
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length
    const squaredDiffs = returns.map(r => Math.pow(r - avgReturn, 2))
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length
    return Math.sqrt(variance) * Math.sqrt(365) * 100 
  }

  const volatility = calculateVolatility()
  const marketCap = coinData ? coinData.market_data.market_cap : 0
  const totalVolume = coinData ? coinData.market_data.total_volume : 0

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Volatility</h3>
        <p className="text-2xl font-bold">{volatility.toFixed(2)}%</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Annualized volatility based on daily returns</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Market Cap</h3>
        <p className="text-2xl font-bold">{formatPrice(marketCap, currency)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Total market capitalization</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">24h Trading Volume</h3>
        <p className="text-2xl font-bold">{formatPrice(totalVolume, currency)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Total trading volume in the last 24 hours</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <p className="text-2xl font-bold">
          {formatPrice(Math.min(...data.map(d => d.price)), currency)} - {formatPrice(Math.max(...data.map(d => d.price)), currency)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Lowest and highest prices in the selected period</p>
      </div>
    </div>
  )
}

export default Statistics

