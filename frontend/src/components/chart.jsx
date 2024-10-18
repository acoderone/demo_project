import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const BinanceFuturesChart = () => {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSDT');
  const [timeFrame, setTimeFrame] = useState('1d');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Fetch available perpetual futures trading pairs
  const loadTradingPairs = async () => {
    try {
      const response = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo');
      const data = await response.json();
      const pairs = data.symbols.filter(symbol => symbol.contractType === 'PERPETUAL');
      setTradingPairs(pairs);
    } catch (error) {
      console.error('Error fetching trading pairs:', error);
    }
  };

  // Fetch and display chart data for the selected trading pair and time frame
  const fetchData = async (timeFrame) => {
    try {
      const endpoint = `https://fapi.binance.com/fapi/v1/klines?symbol=${currentSymbol}&interval=${timeFrame}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const formattedData = formatChartData(data);
      updateChart(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Format Binance kline data for Chart.js
  const formatChartData = (data) => {
    return data.map(item => ({
      time: new Date(item[0]),
      open: parseFloat(item[1]),
      high: parseFloat(item[2]),
      low: parseFloat(item[3]),
      close: parseFloat(item[4])
    }));
  };

  // Update the chart with new data
  const updateChart = (chartData) => {
    const labels = chartData.map(candle => candle.time.toLocaleString());
    const chartDataset = {
      labels: labels,
      datasets: [{
        label: currentSymbol,
        data: chartData.map(candle => ({
          x: candle.time,
          y: [candle.open, candle.high, candle.low, candle.close]
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'candlestick', // Assuming you have the candlestick chart plugin
      data: chartDataset,
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'
            }
          }
        }
      }
    });
  };

  // Load pairs and fetch default chart data on component mount
  useEffect(() => {
    loadTradingPairs();
    fetchData(timeFrame);
  }, []);

  // Fetch data again when symbol or time frame changes
  useEffect(() => {
    fetchData(timeFrame);
  }, [currentSymbol, timeFrame]);

  const handleSymbolChange = (event) => {
    setCurrentSymbol(event.target.value);
  };

  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };

  return (
    <div>
      <h1>Binance Futures Chart</h1>

      {/* Symbol Selector (Dropdown) */}
      <div>
        <label htmlFor="symbolSelect">Select Trading Pair:</label>
        <select id="symbolSelect" value={currentSymbol} onChange={handleSymbolChange}>
          {tradingPairs.map(pair => (
            <option key={pair.symbol} value={pair.symbol}>
              {pair.symbol}
            </option>
          ))}
        </select>
      </div>

      {/* Time Frame Buttons */}
      <div>
        {['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '8h', '12h', '1d', '2d', '1w', '1M'].map(frame => (
          <button key={frame} onClick={() => handleTimeFrameChange(frame)}>
            {frame}
          </button>
        ))}
      </div>

      {/* Canvas for Chart.js */}
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default BinanceFuturesChart;
