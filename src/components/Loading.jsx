import React from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

function Loading({ message = "Loading...", fullScreen = false }) {
  const containerClass = fullScreen
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <FiLoader className="text-4xl text-blue-600" />
        </motion.div>
        <p className="text-gray-600 font-medium">{message}</p>
      </motion.div>
    </div>
  );
}

export default Loading;
