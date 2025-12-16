import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegComment, FaThumbsUp, FaThumbsDown, FaRegBookmark, FaSearch, FaChevronDown, FaCheckCircle, FaBitcoin, FaClipboardList } from 'react-icons/fa';
import { FiSend, FiTrendingUp, FiClock, FiUser, FiBarChart2, FiDollarSign, FiBook, FiTarget, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function Ask() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [votedQuestions, setVotedQuestions] = useState({});
  const [displayedCount, setDisplayedCount] = useState(5); // Initial number of questions to show
  const itemsPerPage = 5; // Number of questions to load per click

  // Enhanced sample questions data with answers
  const sampleQuestions = [
    {
      id: 1,
      title: "What's the best strategy for investing in crypto during a bear market?",
      author: "CryptoEnthusiast",
      authorAvatar: "CE",
      timestamp: "2 hours ago",
      category: "crypto",
      upvotes: 42,
      downvotes: 3,
      answers: 12,
      isTrending: true,
      isSolved: false,
      content: "I've been holding through this bear market but wondering if there are specific strategies more experienced traders use to maximize returns when the market turns around. DCA? Accumulate specific coins? Would love community insights.",
      answersList: [
        {
          id: 1,
          author: "ProTrader",
          authorAvatar: "PT",
          content: "Dollar-cost averaging (DCA) is definitely one of the best strategies. I've been investing $500 weekly regardless of price, and it's helped me average down significantly. Also, focus on BTC and ETH - they're the safest bets long-term.",
          timestamp: "1 hour ago",
          upvotes: 28,
          isAccepted: false
        },
        {
          id: 2,
          author: "CryptoAnalyst",
          authorAvatar: "CA",
          content: "Consider accumulating during major dips. I set limit orders 20-30% below current prices. Also, don't forget to stake your holdings if possible - passive income helps during bear markets.",
          timestamp: "45 minutes ago",
          upvotes: 15,
          isAccepted: true
        }
      ]
    },
    {
      id: 2,
      title: "How do Fed rate hikes typically affect tech stocks?",
      author: "InvestorNewbie",
      authorAvatar: "IN",
      timestamp: "5 hours ago",
      category: "stocks",
      upvotes: 28,
      downvotes: 2,
      answers: 8,
      isTrending: true,
      isSolved: false,
      content: "I've noticed tech stocks often react strongly to Fed announcements. Is there historical data on how long these effects typically last and which subsectors are most affected?",
      answersList: [
        {
          id: 1,
          author: "MarketHistorian",
          authorAvatar: "MH",
          content: "Historically, tech stocks underperform for 3-6 months after rate hikes. Growth stocks are hit hardest because higher rates reduce the present value of future earnings. SaaS and unprofitable tech companies typically see the biggest declines.",
          timestamp: "4 hours ago",
          upvotes: 22,
          isAccepted: false
        },
        {
          id: 2,
          author: "TechInvestor",
          authorAvatar: "TI",
          content: "The impact usually lasts 2-4 months. Semiconductors and software tend to recover faster than hardware. Look at 2018-2019 as a reference - tech recovered strongly after initial selloff.",
          timestamp: "3 hours ago",
          upvotes: 12,
          isAccepted: false
        }
      ]
    },
    {
      id: 3,
      title: "Best resources to learn fundamental analysis for beginners?",
      author: "FutureTrader",
      authorAvatar: "FT",
      timestamp: "1 day ago",
      category: "education",
      upvotes: 35,
      downvotes: 1,
      answers: 15,
      isTrending: false,
      isSolved: true,
      content: "Looking to move beyond just following trends and learn proper fundamental analysis. Any recommended books, courses, or YouTube channels that helped you get started?",
      answersList: [
        {
          id: 1,
          author: "ValueInvestor",
          authorAvatar: "VI",
          content: "Start with 'The Intelligent Investor' by Benjamin Graham. For courses, check out Aswath Damodaran's YouTube channel - he's a NYU professor with excellent free content on valuation.",
          timestamp: "20 hours ago",
          upvotes: 45,
          isAccepted: true
        },
        {
          id: 2,
          author: "FinanceGuru",
          authorAvatar: "FG",
          content: "I recommend 'Security Analysis' for deep dives, and 'One Up On Wall Street' by Peter Lynch for practical insights. For online, Coursera's Financial Markets course is excellent.",
          timestamp: "18 hours ago",
          upvotes: 32,
          isAccepted: false
        }
      ]
    },
    {
      id: 4,
      title: "Is now a good time to invest in renewable energy ETFs?",
      author: "GreenInvestor",
      authorAvatar: "GI",
      timestamp: "1 day ago",
      category: "etfs",
      upvotes: 19,
      downvotes: 4,
      answers: 7,
      isTrending: false,
      isSolved: false,
      content: "With the recent policy changes and oil price fluctuations, I'm considering allocating more to renewable energy. Which ETFs have the best mix of solar, wind, and other clean energy companies?",
      answersList: [
        {
          id: 1,
          author: "ETFAnalyst",
          authorAvatar: "EA",
          content: "ICLN (iShares Global Clean Energy) and QCLN (First Trust NASDAQ Clean Edge) are solid options. ICLN has better international exposure, while QCLN focuses more on US companies.",
          timestamp: "22 hours ago",
          upvotes: 18,
          isAccepted: false
        }
      ]
    },
    {
      id: 5,
      title: "How do you evaluate management quality when analyzing stocks?",
      author: "ValueSeeker",
      authorAvatar: "VS",
      timestamp: "2 days ago",
      category: "stocks",
      upvotes: 31,
      downvotes: 2,
      answers: 11,
      isTrending: true,
      isSolved: false,
      content: "Warren Buffett always talks about investing in companies with great management. What specific metrics or indicators do you look at to assess management quality before investing?",
      answersList: [
        {
          id: 1,
          author: "BuffettFollower",
          authorAvatar: "BF",
          content: "Look at ROIC (Return on Invested Capital) trends, insider ownership, and capital allocation decisions. Also check if management has skin in the game - high insider ownership is a good sign.",
          timestamp: "2 days ago",
          upvotes: 25,
          isAccepted: false
        }
      ]
    },
    {
      id: 6,
      title: "What's the difference between market cap and enterprise value?",
      author: "FinanceStudent",
      authorAvatar: "FS",
      timestamp: "3 days ago",
      category: "education",
      upvotes: 24,
      downvotes: 1,
      answers: 9,
      isTrending: false,
      isSolved: true,
      content: "I keep seeing these terms but don't fully understand the difference. When should I use market cap vs enterprise value for valuation?",
      answersList: [
        {
          id: 1,
          author: "FinanceProf",
          authorAvatar: "FP",
          content: "Market cap = share price × shares outstanding. Enterprise value = market cap + debt - cash. Use EV when comparing companies with different debt levels, as it gives a clearer picture of what you're actually buying.",
          timestamp: "3 days ago",
          upvotes: 38,
          isAccepted: true
        }
      ]
    },
    {
      id: 7,
      title: "Should I invest in individual stocks or index funds as a beginner?",
      author: "NewInvestor",
      authorAvatar: "NI",
      timestamp: "4 days ago",
      category: "strategies",
      upvotes: 47,
      downvotes: 3,
      answers: 18,
      isTrending: true,
      isSolved: false,
      content: "I'm just starting out with $5,000. Should I pick individual stocks or go with index funds? What's the best approach for someone new to investing?",
      answersList: [
        {
          id: 1,
          author: "InvestmentAdvisor",
          authorAvatar: "IA",
          content: "Start with index funds (80-90% of portfolio) for diversification and lower risk. Use the remaining 10-20% to learn stock picking. This way you get market returns while learning without risking too much.",
          timestamp: "4 days ago",
          upvotes: 52,
          isAccepted: false
        }
      ]
    },
    {
      id: 8,
      title: "How does inflation impact bond prices?",
      author: "BondInvestor",
      authorAvatar: "BI",
      timestamp: "5 days ago",
      category: "economy",
      upvotes: 16,
      downvotes: 2,
      answers: 6,
      isTrending: false,
      isSolved: false,
      content: "I've heard that rising inflation hurts bond prices. Can someone explain the relationship and what types of bonds are best during inflationary periods?",
      answersList: [
        {
          id: 1,
          author: "FixedIncomeExpert",
          authorAvatar: "FE",
          content: "Inflation erodes the purchasing power of fixed coupon payments. When inflation rises, bond prices fall because investors demand higher yields. TIPS (Treasury Inflation-Protected Securities) are designed to protect against inflation.",
          timestamp: "5 days ago",
          upvotes: 19,
          isAccepted: false
        }
      ]
    },
    {
      id: 9,
      title: "What are the tax implications of crypto trading?",
      author: "CryptoTrader",
      authorAvatar: "CT",
      timestamp: "6 days ago",
      category: "crypto",
      upvotes: 22,
      downvotes: 1,
      answers: 9,
      isTrending: false,
      isSolved: false,
      content: "I've been trading crypto for a few months and want to understand my tax obligations. How are gains and losses calculated?",
      answersList: [
        {
          id: 1,
          author: "TaxAdvisor",
          authorAvatar: "TA",
          content: "In the US, crypto is treated as property. Each trade is a taxable event. Short-term gains (<1 year) are taxed as ordinary income, long-term gains are taxed at capital gains rates. Keep detailed records of all transactions.",
          timestamp: "6 days ago",
          upvotes: 15,
          isAccepted: false
        }
      ]
    },
    {
      id: 10,
      title: "Best dividend stocks for passive income?",
      author: "IncomeSeeker",
      authorAvatar: "IS",
      timestamp: "1 week ago",
      category: "stocks",
      upvotes: 41,
      downvotes: 2,
      answers: 14,
      isTrending: true,
      isSolved: false,
      content: "Looking to build a dividend portfolio for retirement. Which sectors and specific companies have the best track records for consistent dividend payments?",
      answersList: [
        {
          id: 1,
          author: "DividendInvestor",
          authorAvatar: "DI",
          content: "Look for Dividend Aristocrats - companies that have increased dividends for 25+ years. Examples: JNJ, KO, MMM. REITs also offer high yields but are more volatile.",
          timestamp: "1 week ago",
          upvotes: 28,
          isAccepted: false
        }
      ]
    },
    {
      id: 11,
      title: "How to read a company's balance sheet?",
      author: "FinanceLearner",
      authorAvatar: "FL",
      timestamp: "1 week ago",
      category: "education",
      upvotes: 18,
      downvotes: 0,
      answers: 7,
      isTrending: false,
      isSolved: true,
      content: "I'm trying to learn fundamental analysis. Can someone explain the key components of a balance sheet and what to look for?",
      answersList: [
        {
          id: 1,
          author: "AccountingPro",
          authorAvatar: "AP",
          content: "Balance sheet shows Assets = Liabilities + Equity. Key metrics: Current Ratio (current assets/current liabilities), Debt-to-Equity ratio, and working capital. Look for trends over multiple quarters.",
          timestamp: "1 week ago",
          upvotes: 24,
          isAccepted: true
        }
      ]
    },
    {
      id: 12,
      title: "Is dollar-cost averaging better than lump sum investing?",
      author: "InvestmentNewbie",
      authorAvatar: "IN",
      timestamp: "1 week ago",
      category: "strategies",
      upvotes: 29,
      downvotes: 3,
      answers: 11,
      isTrending: false,
      isSolved: false,
      content: "I have $20,000 to invest. Should I invest it all at once or spread it out over time? What are the pros and cons?",
      answersList: [
        {
          id: 1,
          author: "InvestmentGuru",
          authorAvatar: "IG",
          content: "Historically, lump sum investing beats DCA about 2/3 of the time because markets trend upward. However, DCA reduces emotional stress and helps avoid bad timing. For beginners, DCA is often psychologically easier.",
          timestamp: "1 week ago",
          upvotes: 19,
          isAccepted: false
        }
      ]
    },
    {
      id: 13,
      title: "What's the difference between market and limit orders?",
      author: "TradingBeginner",
      authorAvatar: "TB",
      timestamp: "2 weeks ago",
      category: "education",
      upvotes: 15,
      downvotes: 0,
      answers: 6,
      isTrending: false,
      isSolved: true,
      content: "I'm new to trading and confused about order types. When should I use market vs limit orders?",
      answersList: [
        {
          id: 1,
          author: "TradingExpert",
          authorAvatar: "TE",
          content: "Market order executes immediately at current price. Limit order sets a max price you'll pay (or min you'll accept). Use market orders for liquid stocks when speed matters. Use limit orders to control price, especially for large orders.",
          timestamp: "2 weeks ago",
          upvotes: 17,
          isAccepted: true
        }
      ]
    },
    {
      id: 14,
      title: "How to evaluate a company's competitive advantage?",
      author: "ValueInvestor",
      authorAvatar: "VI",
      timestamp: "2 weeks ago",
      category: "stocks",
      upvotes: 33,
      downvotes: 1,
      answers: 12,
      isTrending: false,
      isSolved: false,
      content: "Warren Buffett talks about moats. What are the different types of competitive advantages and how do you identify them?",
      answersList: [
        {
          id: 1,
          author: "BusinessAnalyst",
          authorAvatar: "BA",
          content: "Common moats: Brand strength (Coca-Cola), Network effects (Facebook), Cost advantages (Walmart), Switching costs (Microsoft), Regulatory barriers. Look for sustainable advantages that competitors can't easily replicate.",
          timestamp: "2 weeks ago",
          upvotes: 22,
          isAccepted: false
        }
      ]
    },
    {
      id: 15,
      title: "Best crypto wallets for beginners?",
      author: "CryptoNewbie",
      authorAvatar: "CN",
      timestamp: "2 weeks ago",
      category: "crypto",
      upvotes: 26,
      downvotes: 2,
      answers: 10,
      isTrending: false,
      isSolved: false,
      content: "I just bought some Bitcoin and need a safe place to store it. What are the best wallet options for someone new to crypto?",
      answersList: [
        {
          id: 1,
          author: "CryptoSecurity",
          authorAvatar: "CS",
          content: "For beginners: Coinbase Wallet or Exodus (user-friendly). For larger amounts: Hardware wallets like Ledger or Trezor (most secure). Never share your private keys with anyone!",
          timestamp: "2 weeks ago",
          upvotes: 18,
          isAccepted: false
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: <FaClipboardList /> },
    { id: 'crypto', name: 'Crypto', icon: <FaBitcoin /> },
    { id: 'stocks', name: 'Stocks', icon: <FiTrendingUp /> },
    { id: 'etfs', name: 'ETFs', icon: <FiBarChart2 /> },
    { id: 'economy', name: 'Economy', icon: <FiDollarSign /> },
    { id: 'education', name: 'Education', icon: <FiBook /> },
    { id: 'strategies', name: 'Strategies', icon: <FiTarget /> }
  ];

  useEffect(() => {
    setQuestions(sampleQuestions);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (newQuestionTitle.trim() === '' || newQuestionContent.trim() === '') return;

    const newQ = {
      id: questions.length + 1,
      title: newQuestionTitle,
      author: "You",
      authorAvatar: "YO",
      timestamp: "Just now",
      category: "general",
      upvotes: 0,
      downvotes: 0,
      answers: 0,
      isTrending: false,
      isSolved: false,
      content: newQuestionContent,
      answersList: []
    };

    setQuestions([newQ, ...questions]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    setNewQuestion('');
  };

  const handleSubmitAnswer = (questionId) => {
    if (answerText.trim() === '') return;

    const newAnswer = {
      id: Date.now(),
      author: "You",
      authorAvatar: "YO",
      content: answerText,
      timestamp: "Just now",
      upvotes: 0,
      isAccepted: false
    };

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers + 1,
          answersList: [...(q.answersList || []), newAnswer]
        };
      }
      return q;
    }));

    setAnswerText('');
    setShowAnswerForm(null);
  };

  const toggleQuestionExpansion = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleQuestionClick = (id) => {
    navigate(`/ask/${id}`);
  };

  const handleVote = (questionId, type) => {
    const key = `${questionId}-${type}`;
    if (votedQuestions[key]) return; // Prevent double voting

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          upvotes: type === 'up' ? q.upvotes + 1 : q.upvotes,
          downvotes: type === 'down' ? q.downvotes + 1 : q.downvotes
        };
      }
      return q;
    }));

    setVotedQuestions({ ...votedQuestions, [key]: true });
  };

  const handleAnswerVote = (questionId, answerId, type) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answersList: q.answersList.map(a => {
            if (a.id === answerId) {
              return {
                ...a,
                upvotes: type === 'up' ? a.upvotes + 1 : a.upvotes
              };
            }
            return a;
          })
        };
      }
      return q;
    }));
  };

  const toggleSaveQuestion = (id) => {
    if (savedQuestions.includes(id)) {
      setSavedQuestions(savedQuestions.filter(qId => qId !== id));
    } else {
      setSavedQuestions([...savedQuestions, id]);
    }
  };

  const filteredQuestions = questions
    .filter(q => activeCategory === 'all' || q.category === activeCategory)
    .filter(q => searchQuery === '' || 
                 q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 q.content.toLowerCase().includes(searchQuery.toLowerCase()));

  const trendingQuestions = filteredQuestions.filter(q => q.isTrending);
  const allRegularQuestions = filteredQuestions.filter(q => !q.isTrending);
  
  // Get displayed regular questions based on pagination
  const regularQuestions = useMemo(() => {
    return allRegularQuestions.slice(0, displayedCount);
  }, [allRegularQuestions, displayedCount]);

  // Check if there are more questions to load
  const hasMoreQuestions = displayedCount < allRegularQuestions.length;

  // Handle load more
  const handleLoadMore = () => {
    setDisplayedCount(prev => Math.min(prev + itemsPerPage, allRegularQuestions.length));
  };

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(itemsPerPage);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Ask Question Form - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/50"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiMessageCircle className="text-2xl text-blue-600" /> Ask the Community
          </h2>
        <form onSubmit={handleSubmitQuestion}>
            <div className="space-y-3 sm:space-y-4">
            <input
              type="text"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                placeholder="Enter your question title..."
                className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <textarea
                value={newQuestionContent}
                onChange={(e) => setNewQuestionContent(e.target.value)}
                placeholder="Provide more details about your question..."
                rows="4"
                className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Suggested: </span>
            {categories.slice(1, 5).map(cat => (
              <button
                key={cat.id}
                type="button"
                      onClick={() => setNewQuestionContent(`${newQuestionContent} ${cat.name} `)}
                      className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                      <span className="text-sm">{cat.icon}</span> {cat.name}
              </button>
            ))}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  <FiSend />
                  <span className="text-sm sm:text-base">Post Question</span>
                </motion.button>
              </div>
          </div>
        </form>
        </motion.div>

        {/* Search and Filter - Enhanced */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="relative w-full sm:w-64 lg:w-80">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        
          <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

        {/* Trending Questions - Enhanced */}
      {trendingQuestions.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <FiTrendingUp className="text-orange-500 text-xl sm:text-2xl" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Trending Questions</h2>
          </div>
            <div className="space-y-4 sm:space-y-6">
              {trendingQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-800 font-semibold flex items-center gap-1">
                          <FiTrendingUp className="text-xs" /> TRENDING
                        </span>
                        <span className={`px-2 sm:px-3 py-1 text-xs rounded-full font-semibold ${
                          question.category === 'crypto' ? 'bg-purple-100 text-purple-800' :
                          question.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
                          question.category === 'etfs' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                      {question.category.toUpperCase()}
                    </span>
                        {question.isSolved && (
                          <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold flex items-center gap-1">
                            <FaCheckCircle /> SOLVED
                          </span>
                        )}
                      </div>
                      <h3 
                        className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors mb-2"
                        onClick={() => handleQuestionClick(question.id)}
                    >
                      {question.title}
                    </h3>
                      <AnimatePresence>
                    {expandedQuestion === question.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm sm:text-base text-gray-600 mb-4"
                          >
                            <p className="mb-4">{question.content}</p>
                            
                            {/* Answers Section */}
                            {question.answersList && question.answersList.length > 0 && (
                              <div className="mt-4 space-y-4">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <FaRegComment /> {question.answers} {question.answers === 1 ? 'Answer' : 'Answers'}
                                </h4>
                                {question.answersList.map((answer) => (
                                  <div key={answer.id} className={`p-3 sm:p-4 rounded-lg border-2 ${
                                    answer.isAccepted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                                  }`}>
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm">
                                          {answer.authorAvatar}
                                        </div>
                                        <div>
                                          <div className="font-medium text-sm sm:text-base">{answer.author}</div>
                                          <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <FiClock className="text-xs" /> {answer.timestamp}
                                          </div>
                                        </div>
                                      </div>
                                      {answer.isAccepted && (
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                                          <FaCheckCircle /> Accepted
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 mb-2">{answer.content}</p>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => handleAnswerVote(question.id, answer.id, 'up')}
                                        className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                                      >
                                        <FaThumbsUp className="text-sm" />
                                        <span className="text-xs sm:text-sm">{answer.upvotes}</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Answer Form */}
                            <div className="mt-4 pt-4">
                              {showAnswerForm === question.id ? (
                                <div className="space-y-3">
                                  <textarea
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                    placeholder="Write your answer..."
                                    rows="4"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleSubmitAnswer(question.id)}
                                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                    >
                                      Submit Answer
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowAnswerForm(null);
                                        setAnswerText('');
                                      }}
                                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setShowAnswerForm(question.id)}
                                  className="w-full sm:w-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base font-medium"
                                >
                                  Write an Answer
                                </button>
                    )}
                  </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() => toggleSaveQuestion(question.id)}
                      className={`p-2 rounded-full transition-all flex-shrink-0 ${
                        savedQuestions.includes(question.id)
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <FaRegBookmark className={savedQuestions.includes(question.id) ? 'fill-current' : ''} />
                  </button>
                </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleVote(question.id, 'up')}
                          disabled={votedQuestions[`${question.id}-up`]}
                          className={`flex items-center gap-1 ${votedQuestions[`${question.id}-up`] ? 'text-green-600' : 'text-gray-500 hover:text-green-600'} transition-colors`}
                      >
                        <FaThumbsUp />
                          <span className="text-xs sm:text-sm font-medium">{question.upvotes}</span>
                      </button>
                    </div>
                      <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleVote(question.id, 'down')}
                          disabled={votedQuestions[`${question.id}-down`]}
                          className={`flex items-center gap-1 ${votedQuestions[`${question.id}-down`] ? 'text-red-600' : 'text-gray-500 hover:text-red-600'} transition-colors`}
                      >
                        <FaThumbsDown />
                          <span className="text-xs sm:text-sm font-medium">{question.downvotes}</span>
                      </button>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <FaRegComment />
                        <span className="text-xs sm:text-sm font-medium">{question.answers}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
                        {question.authorAvatar}
                      </div>
                      <span>{question.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-xs" /> {question.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      )}

        {/* All Questions - Enhanced */}
      <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            {activeCategory === 'all' ? 'All Questions' : `${categories.find(c => c.id === activeCategory)?.name} Questions`}
        </h2>
        {regularQuestions.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {regularQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border border-white/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2 sm:px-3 py-1 text-xs rounded-full font-semibold ${
                      question.category === 'crypto' ? 'bg-purple-100 text-purple-800' :
                      question.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
                      question.category === 'etfs' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {question.category.toUpperCase()}
                    </span>
                        {question.isSolved && (
                          <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold flex items-center gap-1">
                            <FaCheckCircle /> SOLVED
                          </span>
                        )}
                      </div>
                      <h3 
                        className="text-base sm:text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors mb-2"
                        onClick={() => handleQuestionClick(question.id)}
                    >
                      {question.title}
                    </h3>
                      <AnimatePresence>
                    {expandedQuestion === question.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm sm:text-base text-gray-600 mb-4"
                          >
                            <p className="mb-4">{question.content}</p>
                            
                            {/* Answers Section */}
                            {question.answersList && question.answersList.length > 0 && (
                              <div className="mt-4 space-y-4">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <FaRegComment /> {question.answers} {question.answers === 1 ? 'Answer' : 'Answers'}
                                </h4>
                                {question.answersList.map((answer) => (
                                  <div key={answer.id} className={`p-3 sm:p-4 rounded-lg border-2 ${
                                    answer.isAccepted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                                  }`}>
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm">
                                          {answer.authorAvatar}
                                        </div>
                                        <div>
                                          <div className="font-medium text-sm sm:text-base">{answer.author}</div>
                                          <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <FiClock className="text-xs" /> {answer.timestamp}
                                          </div>
                                        </div>
                                      </div>
                                      {answer.isAccepted && (
                                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
                                          <FaCheckCircle /> Accepted
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-700 mb-2">{answer.content}</p>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => handleAnswerVote(question.id, answer.id, 'up')}
                                        className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                                      >
                                        <FaThumbsUp className="text-sm" />
                                        <span className="text-xs sm:text-sm">{answer.upvotes}</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Answer Form */}
                            <div className="mt-4 pt-4">
                              {showAnswerForm === question.id ? (
                                <div className="space-y-3">
                                  <textarea
                                    value={answerText}
                                    onChange={(e) => setAnswerText(e.target.value)}
                                    placeholder="Write your answer..."
                                    rows="4"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleSubmitAnswer(question.id)}
                                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                    >
                                      Submit Answer
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowAnswerForm(null);
                                        setAnswerText('');
                                      }}
                                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setShowAnswerForm(question.id)}
                                  className="w-full sm:w-auto px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base font-medium"
                                >
                                  Write an Answer
                                </button>
                    )}
                  </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() => toggleSaveQuestion(question.id)}
                      className={`p-2 rounded-full transition-all flex-shrink-0 ${
                        savedQuestions.includes(question.id)
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <FaRegBookmark className={savedQuestions.includes(question.id) ? 'fill-current' : ''} />
                  </button>
                </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleVote(question.id, 'up')}
                          disabled={votedQuestions[`${question.id}-up`]}
                          className={`flex items-center gap-1 ${votedQuestions[`${question.id}-up`] ? 'text-green-600' : 'text-gray-500 hover:text-green-600'} transition-colors`}
                      >
                        <FaThumbsUp />
                          <span className="text-xs sm:text-sm font-medium">{question.upvotes}</span>
                      </button>
                    </div>
                      <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleVote(question.id, 'down')}
                          disabled={votedQuestions[`${question.id}-down`]}
                          className={`flex items-center gap-1 ${votedQuestions[`${question.id}-down`] ? 'text-red-600' : 'text-gray-500 hover:text-red-600'} transition-colors`}
                      >
                        <FaThumbsDown />
                          <span className="text-xs sm:text-sm font-medium">{question.downvotes}</span>
                      </button>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <FaRegComment />
                        <span className="text-xs sm:text-sm font-medium">{question.answers}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
                        {question.authorAvatar}
                      </div>
                      <span>{question.author}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-xs" /> {question.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        ) : (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-8 sm:p-12 text-center border border-white/50">
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No questions found</h3>
              <p className="text-sm sm:text-base text-gray-500">Be the first to ask a question about {categories.find(c => c.id === activeCategory)?.name || 'this topic'}</p>
          </div>
        )}
      </div>

        {/* Load More Button - Enhanced */}
        {hasMoreQuestions && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Load More Questions</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ask;
