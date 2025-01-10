import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Maximize2, Plus, X } from 'lucide-react'
import ChartCanvas from './ChartCanvas'
import PriceStats from './PriceStats'
import { fetchHistoricalData, getTimeRangeInDays, formatPrice, fetchCoinData } from '../utils/chartUtils'
import Summary from './Summary'
import Statistics from './Statistics'
import Analysis from './Analysis'
import Settings from './Settings'
import { useSettings } from '../contexts/SettingsContext';

const COMPARE_OPTIONS = [
  { id: 'eth', name: 'Ethereum', color: 'rgb(98, 126, 234)' },
  { id: 'sol', name: 'Solana', color: 'rgb(20, 241, 149)' },
  { id: 'ada', name: 'Cardano', color: 'rgb(0, 51, 173)' },
]

export default function CryptoChart() {
  const [timeRange, setTimeRange] = useState('1w')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [compareList, setCompareList] = useState([])
  const [activeTab, setActiveTab] = useState('chart')
  const containerRef = useRef(null)
  const [data, setData] = useState([])
  const [coinData, setCoinData] = useState(null)
  const { currency } = useSettings();
  
  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await fetchHistoricalData(getTimeRangeInDays(timeRange), currency.toLowerCase());
      setData(historicalData);
      const coin = await fetchCoinData(currency.toLowerCase());
      setCoinData(coin);
    };
    fetchData();
  }, [timeRange, currency])
  
  const currentPrice = data.length > 0 ? data[data.length - 1].price : 0
  const previousPrice = data.length > 0 ? data[0].price : 0
  const priceChange = currentPrice - previousPrice
  const percentageChange = previousPrice !== 0 ? (priceChange / previousPrice) * 100 : 0

  const handleCompare = useCallback((id) => {
    if (compareList.find(c => c.id === id)) return
    
    const option = COMPARE_OPTIONS.find(o => o.id === id)
    if (!option) return

    // For simplicity, we're not fetching comparison data. In a real app, you'd fetch data for each compared coin.
    const compareData = {
      ...option,
      data: data.map(d => ({ ...d, price: d.price * (0.8 + Math.random() * 0.4) }))
    }
    setCompareList(prev => [...prev, compareData])
  }, [compareList, data])

  const removeCompare = useCallback((id) => {
    setCompareList(prev => prev.filter(c => c.id !== id))
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'summary':
        return <Summary data={data} coinData={coinData} />
      case 'statistics':
        return <Statistics data={data} coinData={coinData} />
      case 'analysis':
        return <Analysis data={data} coinData={coinData} />
      case 'settings':
        return <Settings />
      default:
        return (
          <div className="relative aspect-[2/1] w-full">
            
            <div className='hidden md:block lg:block'>
          <ChartCanvas
              data={data}
              compareData={compareList}
              width={900}
              height={700}
            />
          </div>

          <div className='hidden md:block lg:hidden'>
          <ChartCanvas
              data={data}
              compareData={compareList}
              width={500}
              height={300}
            />
          </div>

          <div className='block md:hidden lg:hidden'>
          <ChartCanvas
              data={data}
              compareData={compareList}
              width={300}
              height={200}
            />
          </div>
            
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded text-sm">
              {formatPrice(Math.max(...data.map(d => d.price)), currency)}
            </div>
            <div className="absolute bottom-12 right-4 bg-blue-500 text-white px-2 py-1 rounded text-sm">
              {formatPrice(currentPrice, currency)}
            </div>
          </div>
        )
    }
  }

  return (
    <div ref={containerRef} className="w-full mx-auto p-6 relative top-8">
      <h1 className="text-4xl font-bold mb-6">Bitcoin Dashboard</h1>
      <PriceStats
        currentPrice={currentPrice}
        priceChange={priceChange}
        percentageChange={percentageChange}
        currency={currency}
      />

      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 w-full">
          {['summary', 'chart', 'statistics', 'analysis', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'chart' && (
        <div className="flex flex-col md:flex-row lg:flex-row lg:items-start md:items-start items-center lg:justify-between md:justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Fullscreen
            </button>
            
            <select
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              onChange={(e) => handleCompare(e.target.value)}
            >
              <option value="">Compare</option>
              {COMPARE_OPTIONS.map(option => (
                <option
                  key={option.id}
                  value={option.id}
                  disabled={compareList.some(c => c.id === option.id)}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {['1d', '3d', '1w', '1m', '6m', '1y', 'max'].map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded ${timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      {compareList.length > 0 && activeTab === 'chart' && (
        <div className="flex flex-wrap gap-2 mb-4">
          {compareList.map(compare => (
            <div
              key={compare.id}
              className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-full text-sm"
              style={{ borderLeft: `3px solid ${compare.color}` }}
            >
              {compare.name}
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => removeCompare(compare.id)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {renderActiveTab()}
    </div>
  )
}

