import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrendingUp, FiTrendingDown, FiClock, FiDollarSign, FiBarChart2, FiActivity, FiShare2 } from 'react-icons/fi';
import { FaRegBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

function StockDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('1D');
  const [saved, setSaved] = useState(false);

  // Mock stock data - in real app, this would come from an API
  const stockData = {
    'S&P 500': {
      symbol: 'SPX',
      name: 'S&P 500 Index',
      price: 4510.23,
      change: 54.12,
      changePercent: 1.2,
      isUp: true,
      marketCap: '40.2T',
      volume: '2.1B',
      high: 4520.45,
      low: 4480.12,
      open: 4495.67,
      prevClose: 4456.11,
      pe: 24.5,
      dividend: 1.8,
      description: 'The S&P 500 is a stock market index that measures the stock performance of 500 large companies listed on stock exchanges in the United States.',
      sector: 'Diversified',
      chartData: generateChartData(100, 4450, 4520)
    },
    'NASDAQ': {
      symbol: 'NDX',
      name: 'NASDAQ Composite',
      price: 14210.45,
      change: 292.34,
      changePercent: 2.1,
      isUp: true,
      marketCap: '25.8T',
      volume: '1.8B',
      high: 14250.89,
      low: 13980.23,
      open: 14050.12,
      prevClose: 13918.11,
      pe: 28.3,
      dividend: 1.2,
      description: 'The NASDAQ Composite is a stock market index of the common stocks and similar securities listed on the NASDAQ stock market.',
      sector: 'Technology',
      chartData: generateChartData(100, 13900, 14250)
    },
    'DOW': {
      symbol: 'DJI',
      name: 'Dow Jones Industrial Average',
      price: 34500.67,
      change: 276.45,
      changePercent: 0.8,
      isUp: true,
      marketCap: '9.5T',
      volume: '450M',
      high: 34600.12,
      low: 34300.45,
      open: 34400.89,
      prevClose: 34224.22,
      pe: 22.1,
      dividend: 2.1,
      description: 'The Dow Jones Industrial Average is a price-weighted average of 30 significant stocks traded on the New York Stock Exchange and NASDAQ.',
      sector: 'Diversified',
      chartData: generateChartData(100, 34200, 34600)
    },
    'BTC/USD': {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 49850,
      change: -398,
      changePercent: -0.8,
      isUp: false,
      marketCap: '980B',
      volume: '28.5B',
      high: 50200,
      low: 49500,
      open: 50100,
      prevClose: 50248,
      pe: null,
      dividend: null,
      description: 'Bitcoin is a decentralized digital currency without a central bank or single administrator that can be sent from user to user on the peer-to-peer bitcoin network.',
      sector: 'Cryptocurrency',
      chartData: generateChartData(100, 49500, 50200)
    },
    'ETH/USD': {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2650,
      change: -31.8,
      changePercent: -1.2,
      isUp: false,
      marketCap: '318B',
      volume: '12.3B',
      high: 2680,
      low: 2630,
      open: 2675,
      prevClose: 2681.8,
      pe: null,
      dividend: null,
      description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
      sector: 'Cryptocurrency',
      chartData: generateChartData(100, 2630, 2680)
    },
    'DXY': {
      symbol: 'DXY',
      name: 'US Dollar Index',
      price: 102.45,
      change: -0.31,
      changePercent: -0.3,
      isUp: false,
      marketCap: null,
      volume: null,
      high: 102.78,
      low: 102.12,
      open: 102.65,
      prevClose: 102.76,
      pe: null,
      dividend: null,
      description: 'The US Dollar Index measures the value of the US dollar relative to a basket of foreign currencies.',
      sector: 'Currency',
      chartData: generateChartData(100, 102.0, 102.8)
    }
  };

  const stock = stockData[symbol] || stockData['S&P 500'];
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  // Generate mock chart data
  function generateChartData(count, min, max) {
    const data = [];
    let current = (min + max) / 2;
    for (let i = 0; i < count; i++) {
      current += (Math.random() - 0.5) * (max - min) * 0.1;
      current = Math.max(min, Math.min(max, current));
      data.push({
        time: i,
        value: current
      });
    }
    return data;
  }

  const maxValue = Math.max(...stock.chartData.map(d => d.value));
  const minValue = Math.min(...stock.chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
          >
            <FiArrowLeft className="text-xl" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{stock.name}</h1>
            <p className="text-sm sm:text-base text-gray-500">{stock.symbol}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-full transition-colors ${
                saved ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
              }`}
            >
              <FaRegBookmark className={saved ? 'fill-current' : ''} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
              <FiShare2 />
            </button>
          </div>
        </div>

        {/* Price Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-white/50"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                ${stock.price.toLocaleString()}
              </div>
              <div className={`flex items-center gap-2 text-lg sm:text-xl font-semibold ${
                stock.isUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {stock.isUp ? <FiTrendingUp /> : <FiTrendingDown />}
                <span>${Math.abs(stock.change).toLocaleString()}</span>
                <span>({stock.isUp ? '+' : ''}{stock.changePercent}%)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Sector</div>
              <div className="text-base font-semibold text-gray-700">{stock.sector}</div>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Price Chart</h2>
            <div className="flex gap-2 overflow-x-auto">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    timeframe === tf
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 sm:h-80 lg:h-96 relative">
            <svg className="w-full h-full" viewBox={`0 0 ${stock.chartData.length} 100`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={stock.isUp ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={stock.isUp ? "#10b981" : "#ef4444"} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M ${stock.chartData.map((d, i) => `${i},${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}`).join(' L ')}`}
                fill="none"
                stroke={stock.isUp ? "#10b981" : "#ef4444"}
                strokeWidth="2"
              />
              <path
                d={`M 0,100 L ${stock.chartData.map((d, i) => `${i},${100 - ((d.value - minValue) / (maxValue - minValue)) * 100}`).join(' L ')} L ${stock.chartData.length - 1},100 Z`}
                fill="url(#gradient)"
              />
            </svg>
          </div>
        </motion.div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FiBarChart2 /> Market Data
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Open</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">${stock.open.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Previous Close</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">${stock.prevClose.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Day High</span>
                <span className="text-sm sm:text-base font-semibold text-green-600">${stock.high.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Day Low</span>
                <span className="text-sm sm:text-base font-semibold text-red-600">${stock.low.toLocaleString()}</span>
              </div>
              {stock.marketCap && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">Market Cap</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{stock.marketCap}</span>
                </div>
              )}
              {stock.volume && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm sm:text-base text-gray-600">Volume</span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900">{stock.volume}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FiActivity /> Key Metrics
            </h3>
            <div className="space-y-3">
              {stock.pe !== null && (
                <>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm sm:text-base text-gray-600">P/E Ratio</span>
                    <span className="text-sm sm:text-base font-semibold text-gray-900">{stock.pe}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm sm:text-base text-gray-600">Dividend Yield</span>
                    <span className="text-sm sm:text-base font-semibold text-gray-900">{stock.dividend}%</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm sm:text-base text-gray-600">52W High</span>
                <span className="text-sm sm:text-base font-semibold text-green-600">${(stock.price * 1.15).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm sm:text-base text-gray-600">52W Low</span>
                <span className="text-sm sm:text-base font-semibold text-red-600">${(stock.price * 0.85).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm sm:text-base text-gray-600">Beta</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">1.02</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm sm:text-base text-gray-600">Avg Volume</span>
                <span className="text-sm sm:text-base font-semibold text-gray-900">{stock.volume || 'N/A'}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">About {stock.name}</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{stock.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default StockDetail;

