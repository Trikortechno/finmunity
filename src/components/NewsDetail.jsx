import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookmark, FiShare2, FiClock, FiEye, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { FaRegComment, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock news data - in real app, this would come from an API
  const newsArticles = {
    1: {
      id: 1,
      title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
      summary: "Cryptocurrency reaches new yearly high amid increased institutional investment and ETF approvals.",
      fullContent: `Bitcoin has surged past the $50,000 mark for the first time this year, reaching a new yearly high as institutional investors continue to pour money into the cryptocurrency market. The rally comes amid growing acceptance of Bitcoin as a legitimate asset class and the approval of several Bitcoin exchange-traded funds (ETFs).

The price surge has been driven by several factors, including increased adoption by major corporations, favorable regulatory developments, and growing interest from institutional investors seeking portfolio diversification. Companies like MicroStrategy and Tesla have added significant Bitcoin holdings to their balance sheets, signaling confidence in the digital asset's long-term value proposition.

Market analysts attribute the recent gains to a combination of technical factors and fundamental improvements in the cryptocurrency ecosystem. The approval of Bitcoin ETFs has made it easier for traditional investors to gain exposure to Bitcoin without directly holding the cryptocurrency, leading to increased demand.

"The institutional adoption we're seeing is unprecedented," said Sarah Johnson, a cryptocurrency analyst at Digital Assets Research. "We're witnessing a fundamental shift in how Bitcoin is perceived by the traditional financial community."

The rally has also been supported by positive developments in the broader cryptocurrency market, including improvements in blockchain technology and growing acceptance of digital assets by governments and financial institutions worldwide.

However, some analysts caution that the cryptocurrency market remains highly volatile, and investors should be prepared for potential price swings. The market has historically experienced significant corrections after major rallies, and current price levels may not be sustainable in the short term.

Looking ahead, market participants will be watching for further regulatory clarity, institutional adoption trends, and macroeconomic factors that could influence Bitcoin's price trajectory. The cryptocurrency's correlation with traditional risk assets has also been a point of discussion among investors.

Despite the volatility, many long-term investors remain bullish on Bitcoin's prospects, citing its limited supply, growing adoption, and potential as a hedge against inflation. The cryptocurrency's performance over the past year has attracted attention from both retail and institutional investors seeking exposure to digital assets.`,
      category: 'crypto',
      source: 'CoinDesk',
      author: 'Michael Chen',
      timestamp: '2 hours ago',
      publishDate: 'March 15, 2024',
      sentiment: 'positive',
      trending: true,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      views: 12450,
      comments: 342,
      readTime: '8 min read',
      tags: ['Bitcoin', 'Cryptocurrency', 'ETF', 'Institutional Investment']
    },
    2: {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cuts in Q3 2024",
      summary: "Central bank minutes reveal discussions about easing monetary policy to combat economic slowdown.",
      fullContent: `The Federal Reserve has signaled potential interest rate cuts in the third quarter of 2024, according to minutes from the latest Federal Open Market Committee (FOMC) meeting. The central bank's discussions reveal growing concerns about economic growth and a willingness to adjust monetary policy to support the economy.

The minutes show that Fed officials are closely monitoring economic indicators, including inflation trends, employment data, and GDP growth. While the economy has shown resilience, there are signs of slowing growth that may warrant a more accommodative monetary policy stance.

"The committee is prepared to adjust the stance of monetary policy as appropriate to promote maximum employment and price stability," the minutes stated. "Members discussed the potential need for policy adjustments in response to evolving economic conditions."

Market participants have been closely watching Fed communications for signals about future policy direction. The potential for rate cuts has already influenced market expectations, with bond yields declining and stock markets showing increased volatility.

Economists are divided on the timing and magnitude of potential rate cuts. Some argue that the Fed should act preemptively to support economic growth, while others caution that premature easing could reignite inflationary pressures.

The Fed's decision will depend on incoming economic data, including inflation readings, employment reports, and GDP growth figures. The central bank has emphasized its data-dependent approach to monetary policy, suggesting that future decisions will be based on the evolution of economic conditions.

International factors are also playing a role in the Fed's considerations. Global economic growth has been slowing, and trade tensions have created uncertainty for businesses and investors. The Fed may need to coordinate its policy with other central banks to address global economic challenges.

Looking ahead, market participants will be watching for further signals from Fed officials in speeches and interviews. The next FOMC meeting will provide additional clarity on the central bank's policy outlook and potential rate adjustments.`,
      category: 'economy',
      source: 'Bloomberg',
      author: 'Jennifer Martinez',
      timestamp: '5 hours ago',
      publishDate: 'March 15, 2024',
      sentiment: 'neutral',
      trending: false,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
      views: 8920,
      comments: 156,
      readTime: '10 min read',
      tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy', 'Economy']
    },
    3: {
      id: 3,
      title: "Tech Stocks Plunge as AI Bubble Concerns Grow",
      summary: "NASDAQ drops 3.2% as analysts warn of overvaluation in artificial intelligence sector.",
      fullContent: `Technology stocks experienced a significant selloff today, with the NASDAQ Composite Index dropping 3.2% as concerns about an artificial intelligence bubble continue to grow. The decline was led by major tech companies that have seen substantial gains this year on the back of AI-related optimism.

Analysts are warning that the current valuations in the AI sector may not be sustainable, pointing to similarities with previous technology bubbles. Many AI-related stocks have seen their prices double or triple over the past year, driven by excitement about the potential of artificial intelligence technology.

"The market is getting ahead of itself," said David Thompson, a technology analyst at Market Insights. "While AI has tremendous potential, current valuations assume perfect execution and immediate market adoption, which may not be realistic."

The selloff was broad-based, affecting companies across the technology spectrum. Semiconductor companies, which supply chips for AI applications, were particularly hard hit. Software companies focused on AI tools and services also saw significant declines.

Market participants are concerned about several factors, including the high cost of developing AI technology, regulatory uncertainty, and the potential for increased competition. Additionally, some investors are questioning whether AI companies can monetize their technology effectively in the near term.

Despite the selloff, many long-term investors remain optimistic about the AI sector's prospects. They point to real-world applications of AI technology and the potential for transformative change across multiple industries.

The volatility in tech stocks has also affected broader market sentiment, with the S&P 500 and Dow Jones Industrial Average also experiencing declines. The technology sector's significant weight in major indices means that tech stock movements have a substantial impact on overall market performance.

Looking ahead, market participants will be watching for earnings reports from major tech companies, which will provide insight into whether current valuations are justified by business fundamentals. The sector's performance will also depend on developments in AI technology and regulatory clarity.`,
      category: 'stocks',
      source: 'CNBC',
      author: 'Robert Williams',
      timestamp: '1 day ago',
      publishDate: 'March 14, 2024',
      sentiment: 'negative',
      trending: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      views: 15680,
      comments: 489,
      readTime: '9 min read',
      tags: ['Technology', 'AI', 'NASDAQ', 'Stock Market']
    }
  };

  const article = newsArticles[id] || newsArticles[1];

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${article.title}`;
    
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
              article.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
              article.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {article.category.toUpperCase()}
            </span>
            {article.trending && (
              <span className="ml-2 inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-semibold flex items-center gap-1">
                <FaFire className="text-xs" /> TRENDING
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
              <FiBookmark className={saved ? 'fill-current' : ''} />
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

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{article.author}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <FiClock className="text-xs" /> {article.readTime}
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <FiEye className="text-xs" /> {article.views.toLocaleString()} views
            </div>
            <span>·</span>
            <span>{article.publishDate}</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-700">Source:</span>
            <span className="text-sm text-blue-600 font-semibold">{article.source}</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=News+Image';
            }}
          />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 border border-white/50"
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-lg sm:text-xl text-gray-700 font-medium mb-6 leading-relaxed">
              {article.summary}
            </p>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {article.fullContent}
            </div>
          </div>
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Engagement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-white/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <FaRegComment className="text-lg" />
                <span className="text-sm sm:text-base font-medium">{article.comments} Comments</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <FiTrendingUp className="text-lg" />
                <span className="text-sm sm:text-base font-medium">Share</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Last updated {article.timestamp}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NewsDetail;

