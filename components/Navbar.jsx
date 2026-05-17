"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import styles from "../styles";
import { navVariants } from "../utils/motion";
import { communityEngagement } from "../constants";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} pt-8 relative`}
  >
    <div className={`${styles.innerWidth} mx-auto flex items-center justify-between flex-wrap gap-4`}>
      <div className="flex items-center gap-4">
        <Link href="/">
          <h4 className="font-extrabold text-[24px] text-white uppercase">
            STAR <span className="text-[#a509ff]">TITAN</span>
          </h4>
        </Link>
        {communityEngagement.isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Live</span>
          </div>
        )}
      </div>
      <p className="font-normal text-[14px] text-white opacity-50">
        Created by Aaditya | Jaipur, Rajasthan
      </p>
      <a 
        href="https://youtube.com/@StarTitan" 
        target="_blank" 
        className="glassmorphism px-6 py-2 rounded-full text-white font-semibold text-[14px] hover:bg-white/10 transition-all"
      >
        Subscribe
      </a>
    </div>
  </motion.nav>
);

export default Navbar;
