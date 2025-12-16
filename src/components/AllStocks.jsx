import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiTrendingUp, FiTrendingDown, FiSearch, FiArrowLeft, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNewsContext } from '../contexts/NewsContext';

function AllStocks() {
  const navigate = useNavigate();
  const { type } = useParams(); // 'stocks' or 'crypto'
  const { isCrypto } = useNewsContext();
  const [searchQuery, setSearchQuery] = useState('');

  // Market data - same as News component
  const allMarketData = [
    // Stocks
    { name: "S&P 500", value: "4,510.23", change: "+1.2%", isUp: true, changeValue: "+54.12", type: 'stocks' },
    { name: "NASDAQ", value: "14,210.45", change: "+2.1%", isUp: true, changeValue: "+292.34", type: 'stocks' },
    { name: "DOW", value: "34,500.67", change: "+0.8%", isUp: true, changeValue: "+276.45", type: 'stocks' },
    { name: "DXY", value: "102.45", change: "-0.3%", isUp: false, changeValue: "-0.31", type: 'stocks' },
    { name: "VIX", value: "18.45", change: "-2.1%", isUp: false, changeValue: "-0.39", type: 'stocks' },
    { name: "GOLD", value: "$2,045", change: "+0.5%", isUp: true, changeValue: "+$10.25", type: 'stocks' },
    { name: "AAPL", value: "$178.45", change: "+1.8%", isUp: true, changeValue: "+$3.15", type: 'stocks' },
    { name: "MSFT", value: "$385.20", change: "+2.3%", isUp: true, changeValue: "+$8.67", type: 'stocks' },
    { name: "GOOGL", value: "$142.80", change: "+1.5%", isUp: true, changeValue: "+$2.11", type: 'stocks' },
    { name: "AMZN", value: "$152.30", change: "+0.9%", isUp: true, changeValue: "+$1.36", type: 'stocks' },
    { name: "TSLA", value: "$248.90", change: "-1.2%", isUp: false, changeValue: "-$3.02", type: 'stocks' },
    { name: "META", value: "$485.60", change: "+3.1%", isUp: true, changeValue: "+$14.61", type: 'stocks' },
    { name: "NVDA", value: "$495.25", change: "+4.2%", isUp: true, changeValue: "+$19.98", type: 'stocks' },
    { name: "JPM", value: "$158.75", change: "+0.7%", isUp: true, changeValue: "+$1.10", type: 'stocks' },
    { name: "V", value: "$285.40", change: "+1.1%", isUp: true, changeValue: "+$3.11", type: 'stocks' },
    { name: "JNJ", value: "$162.30", change: "-0.3%", isUp: false, changeValue: "-$0.49", type: 'stocks' },
    { name: "WMT", value: "$165.80", change: "+0.6%", isUp: true, changeValue: "+$0.99", type: 'stocks' },
    { name: "PG", value: "$158.20", change: "+0.4%", isUp: true, changeValue: "+$0.63", type: 'stocks' },
    { name: "UNH", value: "$525.40", change: "+1.3%", isUp: true, changeValue: "+$6.74", type: 'stocks' },
    { name: "MA", value: "$425.60", change: "+1.9%", isUp: true, changeValue: "+$7.94", type: 'stocks' },
    { name: "DIS", value: "$95.45", change: "-0.8%", isUp: false, changeValue: "-$0.76", type: 'stocks' },
    { name: "NFLX", value: "$485.20", change: "+2.5%", isUp: true, changeValue: "+$11.83", type: 'stocks' },
    { name: "AMD", value: "$142.50", change: "+3.8%", isUp: true, changeValue: "+$5.22", type: 'stocks' },
    { name: "INTC", value: "$45.80", change: "-1.1%", isUp: false, changeValue: "-$0.51", type: 'stocks' },
    { name: "CSCO", value: "$52.30", change: "+0.5%", isUp: true, changeValue: "+$0.26", type: 'stocks' },
    { name: "PFE", value: "$28.45", change: "-0.2%", isUp: false, changeValue: "-$0.06", type: 'stocks' },
    { name: "KO", value: "$60.20", change: "+0.3%", isUp: true, changeValue: "+$0.18", type: 'stocks' },
    { name: "PEP", value: "$175.60", change: "+0.7%", isUp: true, changeValue: "+$1.23", type: 'stocks' },
    { name: "T", value: "$16.85", change: "+0.1%", isUp: true, changeValue: "+$0.02", type: 'stocks' },
    { name: "XOM", value: "$108.40", change: "+1.4%", isUp: true, changeValue: "+$1.50", type: 'stocks' },
    { name: "CVX", value: "$152.30", change: "+1.6%", isUp: true, changeValue: "+$2.40", type: 'stocks' },
    // Crypto
    { name: "BTC/USD", value: "$49,850", change: "-0.8%", isUp: false, changeValue: "-$398.00", type: 'crypto' },
    { name: "ETH/USD", value: "$2,650", change: "-1.2%", isUp: false, changeValue: "-$31.80", type: 'crypto' },
    { name: "BNB/USD", value: "$315.20", change: "+2.3%", isUp: true, changeValue: "+$7.09", type: 'crypto' },
    { name: "SOL/USD", value: "$98.45", change: "+1.8%", isUp: true, changeValue: "+$1.74", type: 'crypto' },
    { name: "ADA/USD", value: "$0.52", change: "-0.5%", isUp: false, changeValue: "-$0.003", type: 'crypto' },
    { name: "XRP/USD", value: "$0.63", change: "+0.9%", isUp: true, changeValue: "+$0.006", type: 'crypto' },
    { name: "DOGE/USD", value: "$0.085", change: "+3.2%", isUp: true, changeValue: "+$0.0026", type: 'crypto' },
    { name: "DOT/USD", value: "$7.25", change: "+1.5%", isUp: true, changeValue: "+$0.11", type: 'crypto' },
    { name: "MATIC/USD", value: "$0.95", change: "-0.8%", isUp: false, changeValue: "-$0.0076", type: 'crypto' },
    { name: "AVAX/USD", value: "$38.50", change: "+2.1%", isUp: true, changeValue: "+$0.79", type: 'crypto' },
    { name: "LINK/USD", value: "$14.80", change: "+1.3%", isUp: true, changeValue: "+$0.19", type: 'crypto' },
    { name: "UNI/USD", value: "$6.45", change: "-0.6%", isUp: false, changeValue: "-$0.039", type: 'crypto' },
    { name: "LTC/USD", value: "$72.30", change: "+0.9%", isUp: true, changeValue: "+$0.65", type: 'crypto' },
    { name: "ATOM/USD", value: "$10.25", change: "+1.7%", isUp: true, changeValue: "+$0.17", type: 'crypto' },
    { name: "ETC/USD", value: "$25.40", change: "-1.1%", isUp: false, changeValue: "-$0.28", type: 'crypto' },
    { name: "XLM/USD", value: "$0.12", change: "+0.8%", isUp: true, changeValue: "+$0.001", type: 'crypto' },
    { name: "ALGO/USD", value: "$0.18", change: "+2.2%", isUp: true, changeValue: "+$0.004", type: 'crypto' },
    { name: "VET/USD", value: "$0.035", change: "-0.3%", isUp: false, changeValue: "-$0.0001", type: 'crypto' },
    { name: "FIL/USD", value: "$5.20", change: "+1.4%", isUp: true, changeValue: "+$0.073", type: 'crypto' },
    { name: "TRX/USD", value: "$0.11", change: "+0.5%", isUp: true, changeValue: "+$0.0006", type: 'crypto' },
    { name: "EOS/USD", value: "$0.75", change: "-0.7%", isUp: false, changeValue: "-$0.005", type: 'crypto' },
    { name: "AAVE/USD", value: "$95.30", change: "+2.8%", isUp: true, changeValue: "+$2.59", type: 'crypto' },
    { name: "MKR/USD", value: "$1,245", change: "+1.2%", isUp: true, changeValue: "+$14.76", type: 'crypto' },
    { name: "COMP/USD", value: "$52.40", change: "-0.9%", isUp: false, changeValue: "-$0.47", type: 'crypto' },
    { name: "SUSHI/USD", value: "$1.25", change: "+1.6%", isUp: true, changeValue: "+$0.02", type: 'crypto' },
    { name: "SNX/USD", value: "$3.45", change: "+0.8%", isUp: true, changeValue: "+$0.028", type: 'crypto' },
    { name: "YFI/USD", value: "$8,250", change: "-1.5%", isUp: false, changeValue: "-$125.50", type: 'crypto' },
    { name: "1INCH/USD", value: "$0.48", change: "+2.1%", isUp: true, changeValue: "+$0.01", type: 'crypto' },
    { name: "CRV/USD", value: "$0.65", change: "+1.3%", isUp: true, changeValue: "+$0.008", type: 'crypto' },
    { name: "BAL/USD", value: "$4.20", change: "-0.4%", isUp: false, changeValue: "-$0.017", type: 'crypto' }
  ];

  // Determine which type to show based on URL param or toggle
  const displayType = type || (isCrypto ? 'crypto' : 'stocks');

  // Filter market data based on type and search
  const filteredData = useMemo(() => {
    let filtered = allMarketData.filter(item => item.type === displayType);
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [displayType, searchQuery]);

  const handleStockClick = (stockName) => {
    navigate(`/stock/${encodeURIComponent(stockName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
            >
              <FiArrowLeft className="text-xl text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FiBarChart2 className="text-3xl text-blue-600" />
                All {displayType === 'crypto' ? 'Cryptocurrencies' : 'Stocks'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {filteredData.length} {displayType === 'crypto' ? 'cryptocurrencies' : 'stocks'} available
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder={`Search ${displayType === 'crypto' ? 'cryptocurrencies' : 'stocks'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </motion.div>

        {/* Market Data Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredData.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleStockClick(item.name)}
                className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{item.name}</h3>
                  <div className={`p-2 rounded-lg ${item.isUp ? 'bg-green-100' : 'bg-red-100'}`}>
                    {item.isUp ? (
                      <FiTrendingUp className={`text-lg ${item.isUp ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <FiTrendingDown className={`text-lg ${item.isUp ? 'text-green-600' : 'text-red-600'}`} />
                    )}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                <div className={`text-sm sm:text-base flex items-center gap-2 font-semibold ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                  <span>{item.change}</span>
                  <span className="text-gray-500 font-normal">({item.changeValue})</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-12 text-center border border-white/50"
          >
            <FiBarChart2 className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No {displayType === 'crypto' ? 'cryptocurrencies' : 'stocks'} found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AllStocks;

