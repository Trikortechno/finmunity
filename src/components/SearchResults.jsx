import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiSearch, FiTrendingUp, FiTrendingDown, FiClock, FiEye, FiBookmark, FiShare2, FiBarChart2 } from 'react-icons/fi';
import { FaRegComment, FaFire, FaNewspaper } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNewsContext } from '../contexts/NewsContext';

// Import news data (same as News component)
const newsData = [
  {
    id: 1,
    title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
    summary: "Cryptocurrency reaches new yearly high amid increased institutional investment and ETF approvals. Major corporations continue to add BTC to their balance sheets.",
    category: 'crypto',
    source: 'CoinDesk',
    timestamp: '2 hours ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 12450,
    comments: 342,
    readTime: '5 min read'
  },
  {
    id: 2,
    title: "Federal Reserve Signals Potential Rate Cuts in Q3 2024",
    summary: "Central bank minutes reveal discussions about easing monetary policy to combat economic slowdown. Analysts predict three rate cuts this year.",
    category: 'economy',
    source: 'Bloomberg',
    timestamp: '5 hours ago',
    sentiment: 'neutral',
    trending: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    views: 8920,
    comments: 156,
    readTime: '7 min read'
  },
  {
    id: 3,
    title: "Tech Stocks Plunge as AI Bubble Concerns Grow",
    summary: "NASDAQ drops 3.2% as analysts warn of overvaluation in artificial intelligence sector. Investors question sustainability of current valuations.",
    category: 'stocks',
    source: 'CNBC',
    timestamp: '1 day ago',
    sentiment: 'negative',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 15680,
    comments: 489,
    readTime: '6 min read'
  },
  {
    id: 4,
    title: "Ethereum Completes Successful Shanghai Upgrade",
    summary: "Network update enables staking withdrawals, boosting investor confidence in ETH 2.0 roadmap. Validators can now withdraw staked ETH.",
    category: 'crypto',
    source: 'The Block',
    timestamp: '1 day ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 11230,
    comments: 278,
    readTime: '4 min read'
  },
  {
    id: 5,
    title: "Inflation Drops to 4.9%, Below Market Expectations",
    summary: "Consumer price index shows slower growth, potentially easing pressure on central banks. Core inflation remains sticky at 3.8%.",
    category: 'economy',
    source: 'Wall Street Journal',
    timestamp: '2 days ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    views: 18900,
    comments: 567,
    readTime: '8 min read'
  },
  {
    id: 6,
    title: "Goldman Sachs Predicts Commodities Supercycle",
    summary: "Investment bank forecasts sustained rally in energy and metals markets through 2025. Supply constraints and green transition drive demand.",
    category: 'markets',
    source: 'Financial Times',
    timestamp: '3 days ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 6780,
    comments: 123,
    readTime: '6 min read'
  },
  {
    id: 7,
    title: "Apple Announces Revolutionary AI Chip for Next iPhone",
    summary: "New A18 processor features on-device AI capabilities, promising faster performance and better battery life. Pre-orders start next month.",
    category: 'stocks',
    source: 'TechCrunch',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 23400,
    comments: 892,
    readTime: '5 min read'
  },
  {
    id: 8,
    title: "Oil Prices Surge Amid Middle East Tensions",
    summary: "Brent crude jumps 4% as geopolitical risks escalate. Energy sector stocks rally on supply concerns.",
    category: 'markets',
    source: 'Reuters',
    timestamp: '6 hours ago',
    sentiment: 'negative',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 14560,
    comments: 334,
    readTime: '4 min read'
  },
  {
    id: 9,
    title: "DeFi Total Value Locked Reaches $100 Billion Milestone",
    summary: "Decentralized finance protocols see record inflows as yield farming returns attract institutional capital.",
    category: 'crypto',
    source: 'DeFi Pulse',
    timestamp: '8 hours ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 9870,
    comments: 201,
    readTime: '6 min read'
  },
  {
    id: 10,
    title: "Housing Market Shows Signs of Cooling",
    summary: "Home prices decline for third consecutive month as mortgage rates remain elevated. Inventory levels increase.",
    category: 'economy',
    source: 'Bloomberg',
    timestamp: '12 hours ago',
    sentiment: 'neutral',
    trending: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    views: 7650,
    comments: 145,
    readTime: '5 min read'
  },
  {
    id: 11,
    title: "Renewable Energy Stocks Rally on Policy Support",
    summary: "Solar and wind companies surge as governments announce new green energy initiatives. Clean energy ETFs hit all-time highs.",
    category: 'stocks',
    source: 'CNBC',
    timestamp: '1 day ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 11200,
    comments: 267,
    readTime: '7 min read'
  },
  {
    id: 12,
    title: "Central Banks Coordinate on Digital Currency Standards",
    summary: "Major economies agree on framework for CBDC interoperability. Pilot programs expected to launch next year.",
    category: 'crypto',
    source: 'Financial Times',
    timestamp: '2 days ago',
    sentiment: 'neutral',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 8930,
    comments: 178,
    readTime: '8 min read'
  },
  {
    id: 13,
    title: "Tesla Stock Rallies on Strong Q4 Earnings Report",
    summary: "Electric vehicle maker beats expectations with record deliveries. CEO announces new manufacturing facility plans.",
    category: 'stocks',
    source: 'Reuters',
    timestamp: '3 hours ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 18750,
    comments: 623,
    readTime: '6 min read'
  },
  {
    id: 14,
    title: "Ripple XRP Gains 15% on SEC Settlement Rumors",
    summary: "Cryptocurrency surges as market speculates on potential resolution of long-running legal dispute with regulators.",
    category: 'crypto',
    source: 'CoinTelegraph',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 15230,
    comments: 445,
    readTime: '5 min read'
  },
  {
    id: 15,
    title: "Unemployment Rate Drops to 3.7%, Lowest in Decades",
    summary: "Labor market shows continued strength despite economic headwinds. Wage growth accelerates to 4.2% annually.",
    category: 'economy',
    source: 'Bloomberg',
    timestamp: '6 hours ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    views: 11200,
    comments: 289,
    readTime: '7 min read'
  },
  {
    id: 16,
    title: "Amazon Announces Major AI Investment in Cloud Division",
    summary: "Tech giant commits $10 billion to expand AWS AI capabilities. Stock jumps 5% in after-hours trading.",
    category: 'stocks',
    source: 'TechCrunch',
    timestamp: '8 hours ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 22340,
    comments: 756,
    readTime: '5 min read'
  },
  {
    id: 17,
    title: "Cardano Launches New Smart Contract Platform",
    summary: "Blockchain network introduces enhanced scalability features. Developer activity reaches all-time high.",
    category: 'crypto',
    source: 'The Block',
    timestamp: '10 hours ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 9870,
    comments: 234,
    readTime: '4 min read'
  },
  {
    id: 18,
    title: "Global Supply Chain Disruptions Impact Manufacturing",
    summary: "Shipping delays and material shortages continue to affect production. Companies report margin pressure.",
    category: 'markets',
    source: 'Wall Street Journal',
    timestamp: '12 hours ago',
    sentiment: 'negative',
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 8760,
    comments: 167,
    readTime: '6 min read'
  },
  {
    id: 19,
    title: "Microsoft Partners with OpenAI for Enterprise AI Solutions",
    summary: "Tech partnership aims to bring advanced AI capabilities to business customers. Integration with Office 365 announced.",
    category: 'stocks',
    source: 'CNBC',
    timestamp: '1 day ago',
    sentiment: 'positive',
    trending: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 19800,
    comments: 567,
    readTime: '6 min read'
  },
  {
    id: 20,
    title: "Polygon Network Sees Record Transaction Volume",
    summary: "Layer 2 scaling solution processes over 5 million transactions daily. Gas fees remain near zero.",
    category: 'crypto',
    source: 'DeFi Pulse',
    timestamp: '1 day ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 7650,
    comments: 189,
    readTime: '5 min read'
  },
  {
    id: 21,
    title: "Consumer Confidence Index Reaches 18-Month High",
    summary: "Survey shows Americans more optimistic about economy. Spending intentions increase across all categories.",
    category: 'economy',
    source: 'Bloomberg',
    timestamp: '2 days ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    views: 9340,
    comments: 201,
    readTime: '7 min read'
  },
  {
    id: 22,
    title: "Meta Announces VR Investment Despite Revenue Concerns",
    summary: "Social media giant doubles down on metaverse vision. Investors question profitability timeline.",
    category: 'stocks',
    source: 'Financial Times',
    timestamp: '2 days ago',
    sentiment: 'neutral',
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 11200,
    comments: 334,
    readTime: '6 min read'
  },
  {
    id: 23,
    title: "Chainlink Oracle Network Expands to 15 Blockchains",
    summary: "Decentralized oracle provider adds support for new networks. Total value secured exceeds $75 billion.",
    category: 'crypto',
    source: 'CoinDesk',
    timestamp: '3 days ago',
    sentiment: 'positive',
    trending: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    views: 6780,
    comments: 145,
    readTime: '5 min read'
  },
  {
    id: 24,
    title: "Bond Yields Rise on Strong Economic Data",
    summary: "10-year Treasury yield climbs to 4.2% as investors price in continued growth. Mortgage rates follow upward trend.",
    category: 'markets',
    source: 'Reuters',
    timestamp: '3 days ago',
    sentiment: 'neutral',
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    views: 8230,
    comments: 178,
    readTime: '6 min read'
  }
];

// Market data (same as News component)
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

function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isCrypto } = useNewsContext();
  const query = searchParams.get('q') || '';

  // Filter news based on search query (show all results regardless of toggle)
  const newsResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return newsData.filter(item => {
      const matchesTitle = item.title.toLowerCase().includes(searchTerm);
      const matchesSummary = item.summary.toLowerCase().includes(searchTerm);
      const matchesCategory = item.category.toLowerCase().includes(searchTerm);
      const matchesSource = item.source.toLowerCase().includes(searchTerm);
      
      return matchesTitle || matchesSummary || matchesCategory || matchesSource;
    });
  }, [query]);

  // Filter market data (stocks/crypto) based on search query
  const marketResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return allMarketData.filter(item => {
      // Remove /USD suffix for better matching
      const nameWithoutSuffix = item.name.replace('/USD', '').toLowerCase();
      const matchesName = nameWithoutSuffix.includes(searchTerm) || item.name.toLowerCase().includes(searchTerm);
      return matchesName;
    });
  }, [query]);

  const handleViewArticle = (id) => {
    navigate(`/news/${id}`);
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-2">
            <FiSearch className="text-3xl text-blue-600" />
            Search Results
          </h1>
          {query && (
            <p className="text-sm sm:text-base text-gray-600">
              Found <span className="font-semibold text-blue-600">{newsResults.length + marketResults.length}</span> result{(newsResults.length + marketResults.length) !== 1 ? 's' : ''} for "<span className="font-semibold">{query}</span>"
            </p>
          )}
        </motion.div>

        {/* Search Results */}
        {query ? (
          (newsResults.length > 0 || marketResults.length > 0) ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Market Data Results (Stocks/Crypto) */}
              {marketResults.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FiBarChart2 className="text-2xl text-blue-600" />
                    {marketResults.length} {marketResults[0]?.type === 'crypto' ? 'Cryptocurrency' : 'Stock'}{marketResults.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {marketResults.map((item, index) => (
                      <motion.div
                        key={`${item.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleStockClick(item.name)}
                        className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">{item.name}</h3>
                          <div className={`p-2 rounded-lg ${item.isUp ? 'bg-green-100' : 'bg-red-100'}`}>
                            {item.isUp ? (
                              <FiTrendingUp className="text-lg text-green-600" />
                            ) : (
                              <FiTrendingDown className="text-lg text-red-600" />
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
                </div>
              )}

              {/* News Results */}
              {newsResults.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaNewspaper className="text-2xl text-blue-600" />
                    {newsResults.length} News Article{newsResults.length !== 1 ? 's' : ''} Found
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    {newsResults.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleViewArticle(item.id)}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6 border border-white/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/3 lg:w-1/4">
                      <div className="relative h-40 sm:h-32 lg:h-40 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x400?text=News+Image';
                          }}
                        />
                        {item.trending && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 text-xs rounded-full font-semibold bg-orange-500/80 text-white backdrop-blur-sm flex items-center gap-1">
                              <FaFire className="text-xs" /> TRENDING
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <span className={`px-2 sm:px-3 py-1 rounded-full font-semibold ${
                          item.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          item.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.category.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="text-xs" /> {item.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiEye className="text-xs" /> {item.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegComment className="text-xs" /> {item.comments}
                        </span>
                        <span>{item.source}</span>
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-12 text-center border border-white/50"
            >
              <FiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any news articles matching "<span className="font-semibold">{query}</span>"
              </p>
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Browse All News
              </motion.button>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-12 text-center border border-white/50"
          >
            <FiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Enter a search query</h3>
            <p className="text-gray-500">
              Use the search bar in the navbar to search for news articles
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

