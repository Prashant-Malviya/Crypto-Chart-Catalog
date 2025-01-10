const historicalData_Url = import.meta.env.VITE_API_URL_Historical_Data
const coinData_Url = import.meta.env.VITE_API_URL_Coin_Data



export async function fetchHistoricalData(days = 7, currency = 'usd') {
  const response = await fetch(`${historicalData_Url}?vs_currency=${currency}&days=${days}`);
  const data = await response.json();
  return data.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
    volume: Math.random() * 100000 + 50000 
  }));
}

export function getTimeRangeInDays(range) {
  switch (range) {
    case '1d': return 1;
    case '3d': return 3;
    case '1w': return 7;
    case '1m': return 30;
    case '6m': return 180;
    case '1y': return 365;
    case 'max': return 'max';
    default: return 7;
  }
}

export function formatPrice(price, currency = 'USD') {
  // console.log("price", price);
  
  if (typeof price !== 'number' || isNaN(price)) {
    return 'N/A';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}

export function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export async function fetchCoinData(currency = 'usd') {
  const response = await fetch(`${coinData_Url}`);
  const data = await response.json();
  return {
    ...data,
    market_data: {
      ...data.market_data,
      current_price: data.market_data.current_price[currency],
      market_cap: data.market_data.market_cap[currency],
      total_volume: data.market_data.total_volume[currency],
    }
  };
}

