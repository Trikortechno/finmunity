/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import {
  FaNewspaper,
  FaRegCommentDots,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNewsContext } from "../contexts/NewsContext";

function Navbar() {
  const { isCrypto, setIsCrypto } = useNewsContext();
  const [isHovering, setIsHovering] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const categoriesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === "/ask") return "ASK";
    return "NEWZ"; // Default to NEWZ for home and other routes
  };
  const activeTab = getActiveTab();

  const tabs = [
    { label: "NEWZ", icon: <FaNewspaper size={25} />, path: "/" },
    { label: "ASK", icon: <FaRegCommentDots size={25} />, path: "/ask" },
  ];

  const categories = [
    "All Categories",
    "Market News",
    "Company Updates",
    "Economic Reports",
    "Crypto News",
    "Investment Tips",
  ];

  // Close categories when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  // Get breadcrumb based on active tab
  const getBreadcrumb = () => {
    switch (activeTab) {
      case "NEWZ":
        return "News Feed";
      case "ASK":
        return "Ask Community";
      default:
        return "Home";
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md relative z-30 shadow-sm">
        <div className="flex justify-between items-center px-3 sm:px-4 lg:px-6 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl sm:text-2xl lg:text-3xl pr-1 font-extrabold italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            FINMUNITY
          </motion.div>

          {/* Desktop Search Bar */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="hidden md:flex items-center w-full max-w-2xl border border-gray-300 rounded-full px-4 py-2 mx-6 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 relative"
            ref={categoriesRef}
          >
            <div className="relative">
              <button
                className="flex items-center outline-none text-gray-500 mr-4 pr-6 bg-transparent cursor-pointer text-sm"
                onClick={() => setShowCategories(!showCategories)}
              >
                Categories
                <FaChevronDown
                  className={`ml-1 text-gray-400 text-xs transition-transform ${
                    showCategories ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {showCategories && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => setShowCategories(false)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="h-5 mr-4"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(
                    `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  );
                  setSearchQuery("");
                }
              }}
              className="flex-grow flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news..."
                className="flex-grow outline-none placeholder-gray-400 text-sm"
              />
              <button type="submit" className="ml-2">
                <FaSearch className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />
              </button>
            </form>
          </motion.div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm lg:text-md font-medium text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => navigate("/login")}
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 lg:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm lg:text-md font-medium rounded-full shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaSearch className="text-lg" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden px-3 py-3"
            >
              <div className="relative" ref={categoriesRef}>
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
                  <button
                    className="flex items-center outline-none text-gray-500 mr-3 text-sm"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    Categories
                    <FaChevronDown
                      className={`ml-1 text-gray-400 text-xs transition-transform ${
                        showCategories ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div className="h-4 mr-3"></div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (mobileSearchQuery.trim()) {
                        navigate(
                          `/search?q=${encodeURIComponent(
                            mobileSearchQuery.trim()
                          )}`
                        );
                        setMobileSearchQuery("");
                        setMobileSearchOpen(false);
                      }
                    }}
                    className="flex-grow flex items-center"
                  >
                    <input
                      type="text"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-grow outline-none placeholder-gray-400 text-sm"
                    />
                    <button type="submit" className="ml-2">
                      <FaSearch className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />
                    </button>
                  </form>
                </div>
                {showCategories && (
                  <div className="absolute z-50 mt-2 w-full bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          setShowCategories(false);
                          setMobileSearchOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-extrabold italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      FINMUNITY
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-gray-600 hover:text-gray-900"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.label}
                        onClick={() => {
                          navigate(tab.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.label
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Secondary Navigation - Sticky at top */}
      <div className="sticky z-20 top-0 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {/* Top Row (Breadcrumb + Toggle) */}
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Dynamic Breadcrumb */}
            <motion.div
              className="text-xs sm:text-sm text-gray-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="hover:text-blue-600 cursor-pointer transition-colors font-medium"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <span className="mx-2">/</span>
              <span className="font-semibold text-blue-600">
                {getBreadcrumb()}
              </span>
            </motion.div>

            {/* Toggle Switch - Only visible for NEWZ tab */}
            {activeTab === "NEWZ" && (
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isCrypto}
                  onChange={setIsCrypto}
                  className={`${
                    isCrypto ? "bg-purple-600" : "bg-blue-600"
                  } relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors duration-200`}
                >
                  <span
                    className={`${
                      isCrypto
                        ? "translate-x-5 sm:translate-x-6"
                        : "translate-x-1"
                    } inline-block h-3 w-3 sm:h-4 sm:w-4 transform bg-white rounded-full transition-transform duration-200`}
                  />
                </Switch>
                <span className="text-sm sm:text-lg italic font-semibold text-gray-700 hidden sm:inline">
                  {isCrypto ? "CRYPTO" : "STOCKS"}
                </span>
                <span className="text-xs italic font-semibold text-gray-700 sm:hidden">
                  {isCrypto ? "C" : "S"}
                </span>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-8 sm:space-x-12 lg:space-x-14 py-3">
            {tabs.map((tab, index) => (
              <motion.div
                key={tab.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(tab.path)}
                onHoverStart={() => setIsHovering(tab.label)}
                onHoverEnd={() => setIsHovering(null)}
                className={`flex flex-col items-center cursor-pointer relative group ${
                  activeTab === tab.label
                    ? "text-blue-600 font-bold"
                    : "text-gray-500 hover:text-gray-700"
                } transition-all duration-200`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2 text-base sm:text-xl">
                  <motion.span
                    animate={{
                      rotate: isHovering === tab.label ? [0, 10, -10, 0] : 0,
                      scale: activeTab === tab.label ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className={activeTab === tab.label ? "text-blue-600" : ""}
                  >
                    {tab.icon}
                  </motion.span>
                  <span className="text-sm sm:text-base lg:text-lg font-semibold">
                    {tab.label}
                  </span>
                </div>
                <motion.div
                  className={`h-1 mt-2 rounded-full ${
                    activeTab === tab.label
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : "bg-transparent"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === tab.label ? 40 : 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
