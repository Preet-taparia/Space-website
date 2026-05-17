'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import styles from '../styles';
import { slideIn, staggerContainer, textVariant, fadeIn } from '../utils/motion';
import { TypingText } from './CustomTexts';

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-center items-center flex-col relative z-10">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] h-[120%] z-0 pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#a509ff" strokeWidth="0.1" strokeDasharray="1 2" className="animate-spin-slow" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#34acc7" strokeWidth="0.1" strokeDasharray="2 1" className="animate-reverse-spin-slow" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.05" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.05" />
            </svg>
        </div>
        
        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
          STAR
        </motion.h1>
        <motion.h1 
            variants={textVariant(1.2)} 
            className={styles.heroHeading}
        >
          TITAN
        </motion.h1>
      </div>

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[24px] font-normal sm:text-[24px] text-[18px] text-center text-secondary-white max-w-[900px] mx-auto leading-relaxed"
      >
        <span className="font-extrabold text-white">Hi, I am Aaditya</span> from Jaipur. I believe <span className="font-extrabold text-[#a509ff]">Space is Love</span>. From my rooftop with a basic telescope to your screen, <span className="font-extrabold text-[#34acc7]">Star Titan</span> is our portal to the cosmos. Let&apos;s decode the universe together.
      </motion.p>

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="flex flex-wrap justify-center gap-4 mt-8 z-20"
      >
        <a 
          href="https://youtube.com/@StarTitan" 
          target="_blank"
          className="bg-[#a509ff] px-8 py-3 rounded-full text-white font-bold hover:shadow-[0_0_20px_rgba(165,9,255,0.6)] transition-all"
        >
          Subscribe on YouTube
        </a>
        <Link 
          href="/picture" 
          className="glassmorphism px-8 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-all"
        >
          View My Captures
        </Link>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

        <img
          src="/cover.png"
          alt="hero_cover"
          className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
        />
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
