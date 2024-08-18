"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { navVariants } from "../utils/motion";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} pt-8 relative`}
  >
    <div className={`${styles.innerWidth} mx-auto flex justify-center`}>
      <h2 className="font-extrabold text-[64px] text-white">
        SPACE ODYSSEY
      </h2>
    </div>
    <div className="absolute w-[100%] top-[10px] inset-10 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-center`}>
      <h2 className="font-extrabold text-[34px] text-white">
        Presents
      </h2>
    </div>
  </motion.nav>
);

export default Navbar;
