import React, { useState, useEffect } from "react";
import { formatPrice } from "../utils/chartUtils";
import { useSettings } from "../contexts/SettingsContext";

function Analysis({ data, coinData }) {
  const [loading, setLoading] = useState(true);
  const { currency } = useSettings();

  // Simulate loading or data fetching
  useEffect(() => {
    if (coinData !== undefined) {
      setLoading(false);
    }
  }, [coinData]);

  const calculateSMA = (period) => {
    const sma = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data
        .slice(i - period + 1, i + 1)
        .reduce((sum, d) => sum + d.price, 0);
      sma.push(sum / period);
    }
    return sma[sma.length - 1];
  };

  const sma50 = calculateSMA(50);
  const sma100 = calculateSMA(100);
  const latestPrice = data[data.length - 1].price;
  const priceChange = latestPrice - data[0].price;
  const percentageChange = (priceChange / data[0].price) * 100;

  console.log("coinData", coinData);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Moving Averages</h3>
        <p className="mb-2">
          <span className="font-semibold">50-day SMA:</span>{" "}
          {formatPrice(sma50, currency)}
        </p>
        <p>
          <span className="font-semibold">100-day SMA:</span>{" "}
          {formatPrice(sma100, currency)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {sma50 > sma100 ? "Bullish" : "Bearish"} trend indicated by SMA
          crossover
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Price Momentum</h3>
        <p className="text-2xl font-bold">
          {percentageChange >= 0 ? "+" : ""}
          {percentageChange.toFixed(2)}%
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Price change over the selected period
        </p>
        <p className="mt-2">
          {Math.abs(priceChange) > 0
            ? `The price has ${priceChange > 0 ? "increased" : "decreased"} by ${formatPrice(Math.abs(priceChange), currency)}`
            : "The price has remained stable"}
        </p>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">
            Loading Market Sentiment...
          </h3>
          <p>Please wait while we fetch the latest market sentiment data.</p>
        </div>
      ) : (
        coinData && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Market Sentiment</h3>
            <p className="mb-2">
              <span className="font-semibold">Market Cap Rank:</span> #
              {coinData.market_cap_rank ?? "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Market Cap: $</span>{" "}
              {coinData.market_data.market_cap?.toFixed(2) ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold">Max Supply: $</span>{" "}
              {coinData.market_data.max_supply?.toFixed(2) ?? "N/A"}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Analysis;
