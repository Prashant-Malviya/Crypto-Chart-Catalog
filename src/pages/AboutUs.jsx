import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 text-center relative top-14"
    >
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-300">
        We are a blockchain R&D studio, driven by our commitment to bridging the divide between foundational blockchains
        like Bitcoin and the thriving DeFi ecosystem.
      </p>
      <p className="text-lg text-gray-300 mt-4">
        Our mission is to make web3 simple and hassle-free for everyone. No intimidating complexities, just pure potential.
        We began our journey in 2022, with previous experience building two billion-dollar web3 projects: Ren and Rook.
      </p>
      <p className="text-lg text-gray-300 mt-4">
        Our flagship product is the Catalog wallet, a multichain wallet enabling seamless native Bitcoin usage. We also
        support projects like WBTC Garden to seamlessly become cross-chain.
      </p>
    </motion.div>
  );
}
