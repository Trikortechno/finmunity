import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiUser, FiShare2 } from 'react-icons/fi';
import { FaRegComment, FaThumbsUp, FaThumbsDown, FaRegBookmark, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answerText, setAnswerText] = useState('');
  const [saved, setSaved] = useState(false);
  const [voted, setVoted] = useState({ up: false, down: false });
  const [answerVotes, setAnswerVotes] = useState({});
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock question data - in real app, this would come from an API
  const questions = {
    1: {
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
        },
        {
          id: 3,
          author: "LongTermHolder",
          authorAvatar: "LH",
          content: "I've been through multiple bear markets. The key is patience and not panic selling. Diversify across different projects, but keep the majority in established coins. Also, consider setting aside some cash for opportunities when prices drop significantly.",
          timestamp: "30 minutes ago",
          upvotes: 12,
          isAccepted: false
        }
      ]
    },
    2: {
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
    3: {
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
    }
  };

  const question = questions[id] || questions[1];

  const handleSubmitAnswer = () => {
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

    question.answersList.push(newAnswer);
    question.answers += 1;
    setAnswerText('');
  };

  const handleVote = (type) => {
    if (type === 'up') {
      setVoted({ up: !voted.up, down: false });
      if (!voted.up) {
        question.upvotes += 1;
      } else {
        question.upvotes -= 1;
      }
    } else {
      setVoted({ up: false, down: !voted.down });
      if (!voted.down) {
        question.downvotes += 1;
      } else {
        question.downvotes -= 1;
      }
    }
  };

  const handleAnswerVote = (answerId) => {
    const answer = question.answersList.find(a => a.id === answerId);
    if (answer && !answerVotes[answerId]) {
      answer.upvotes += 1;
      setAnswerVotes({ ...answerVotes, [answerId]: true });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this question: ${question.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
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
            <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold mb-2 ${
              question.category === 'crypto' ? 'bg-purple-100 text-purple-800' :
              question.category === 'stocks' ? 'bg-blue-100 text-blue-800' :
              question.category === 'etfs' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {question.category.toUpperCase()}
            </span>
            {question.isSolved && (
              <span className="ml-2 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold flex items-center gap-1">
                <FaCheckCircle /> SOLVED
              </span>
            )}
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
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              >
                <FiShare2 />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-10 min-w-[150px]">
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Twitter</button>
                  <button onClick={() => handleShare('facebook')} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Facebook</button>
                  <button onClick={() => handleShare('linkedin')} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">LinkedIn</button>
                  <button onClick={() => handleShare('copy')} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm">Copy Link</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-white/50"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {question.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-6 pb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base">
              {question.authorAvatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{question.author}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <FiClock className="text-xs" /> {question.timestamp}
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
            {question.content}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleVote('up')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  voted.up ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <FaThumbsUp />
                <span className="font-semibold">{question.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote('down')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  voted.down ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <FaThumbsDown />
                <span className="font-semibold">{question.downvotes}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-600">
                <FaRegComment />
                <span className="font-semibold">{question.answers} {question.answers === 1 ? 'Answer' : 'Answers'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Answers Section */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaRegComment /> {question.answers} {question.answers === 1 ? 'Answer' : 'Answers'}
          </h2>
          <div className="space-y-4">
            {question.answersList.map((answer, index) => (
              <motion.div
                key={answer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-2 ${
                  answer.isAccepted ? 'bg-green-50/80 border-green-300 shadow-green-100' : 'border-white/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base">
                      {answer.authorAvatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{answer.author}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FiClock className="text-xs" /> {answer.timestamp}
                      </div>
                    </div>
                  </div>
                  {answer.isAccepted && (
                    <span className="px-3 py-1 bg-green-500 text-white text-xs sm:text-sm rounded-full flex items-center gap-1 font-semibold">
                      <FaCheckCircle /> Accepted Answer
                    </span>
                  )}
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
                  {answer.content}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => handleAnswerVote(answer.id)}
                    disabled={answerVotes[answer.id]}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      answerVotes[answer.id] ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    <FaThumbsUp />
                    <span className="font-semibold">{answer.upvotes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Answer Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-white/50"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Your Answer</h3>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer here... Be detailed and helpful!"
            rows="6"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none mb-4"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Be respectful and provide helpful insights</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitAnswer}
              disabled={answerText.trim() === ''}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                answerText.trim() === ''
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              Post Answer
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuestionDetail;

