import React from 'react'
import { formatPrice } from "../utils/chartUtils"

function PriceStats({ currentPrice, priceChange, percentageChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6">
        <div className="text-5xl font-bold mb-2">
          {formatPrice(currentPrice)}
          <sup className="text-2xl text-gray-500 dark:text-gray-400 ml-2">USD</sup>
        </div>
        <div className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}>
          {priceChange >= 0 ? '+' : ''}{formatPrice(priceChange)} ({percentageChange.toFixed(2)}%)
        </div>
      </div>
    </div>
  )
}

export default PriceStats

