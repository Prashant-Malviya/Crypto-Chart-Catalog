import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 text-center relative top-36"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Blockchain R&D Studio</h1>
      <p className="text-lg text-gray-300">
        Bridging the gap between foundational blockchains and the thriving DeFi ecosystem.
      </p>
      <p className="text-lg text-gray-300 mt-2">
        We solve complex blockchain challenges through research in cryptography, game theory, and protocol design.
      </p>
    </motion.div>
  );
}
