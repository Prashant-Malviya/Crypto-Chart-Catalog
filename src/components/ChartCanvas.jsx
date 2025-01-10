import React, { useEffect, useRef } from 'react'


function ChartCanvas({ data, compareData, height, width }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up high DPI canvas
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate chart dimensions
    const chartHeight = height * 0.8
    const volumeHeight = height * 0.2

    // Find min/max values
    const allData = compareData ? [data, ...compareData.map(d => d.data)] : [data]
    const maxPrice = Math.max(...allData.flatMap(d => d.map(p => p.price)))
    const minPrice = Math.min(...allData.flatMap(d => d.map(p => p.price)))
    const maxVolume = Math.max(...data.map(d => d.volume))

    // Draw price lines
    const drawPriceLine = (chartData, color, fill = true) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      chartData.forEach((point, i) => {
        const x = (i / (chartData.length - 1)) * width
        const y = chartHeight - ((point.price - minPrice) / (maxPrice - minPrice)) * chartHeight
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })

      ctx.stroke()

      if (fill) {
        ctx.lineTo(width, chartHeight)
        ctx.lineTo(0, chartHeight)
        ctx.fillStyle = color.replace(')', ', 0.1)')
        ctx.fill()
      }
    }

    // Drawing main line
    drawPriceLine(data, 'rgb(99, 102, 241)')

    // Drawing compare lines
    if (compareData) {
      compareData.forEach(compare => {
        drawPriceLine(compare.data, compare.color, false)
      })
    }

    // Drawing volume bars
    ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'
    data.forEach((point, i) => {
      const x = (i / (data.length - 1)) * width
      const barHeight = (point.volume / maxVolume) * volumeHeight
      ctx.fillRect(
        x - 1,
        height - barHeight,
        3,
        barHeight
      )
    })

  }, [data, compareData, height, width])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width,
        height: height,
      }}
      className="w-full h-full"
    />
  )
}

export default ChartCanvas

