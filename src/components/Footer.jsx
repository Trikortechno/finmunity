import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiGithub, FiFacebook } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'News Feed', path: '/news' },
      { name: 'Ask Community', path: '/ask' },
      { name: 'Market Analysis', path: '/stock/S&P 500' },
      { name: 'Trending Topics', path: '/news' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
      { name: 'Press', path: '/press' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Disclaimer', path: '/disclaimer' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/faq' },
      { name: 'Community Guidelines', path: '/guidelines' }
    ]
  };

  const socialLinks = [
    { icon: <FiTwitter />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <FiLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <FiGithub />, name: 'GitHub', url: 'https://github.com' },
    { icon: <FiFacebook />, name: 'Facebook', url: 'https://facebook.com' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold italic bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              FINMUNITY
            </h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
              Your trusted source for financial news, market insights, and community-driven investment discussions. 
              Stay informed, make smarter decisions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <FiMail className="text-lg" />
                <span className="text-sm sm:text-base">contact@finmmunity.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <FiPhone className="text-lg" />
                <span className="text-sm sm:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <FiMapPin className="text-lg" />
                <span className="text-sm sm:text-base">New York, NY, USA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8"
        >
          <div className="max-w-md">
            <h3 className="text-lg font-bold mb-3 text-white">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest financial news and market insights delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm sm:text-base">
                © {currentYear} <span className="font-semibold text-white">TRIKOR TECHNOLOGIA</span>. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Finmmunity is a product of TRIKOR TECHNOLOGIA
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;

