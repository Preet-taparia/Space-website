'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TitleText } from './CustomTexts';
import { socials } from '../constants';

const CommunityBanner = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto`}
    >
      <div className="glassmorphism p-8 sm:p-16 rounded-[40px] flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#a509ff]/10 blur-[80px] -z-10" />
        
        <TitleText title={<>Join the Star Titan Community</>} textStyles="text-center" />
        <p className="mt-[16px] font-normal lg:text-[24px] text-[18px] text-secondary-white max-w-[700px]">
          Subscribe for weekly telescope observations, space gear reviews, and live cosmic events. Space is Love.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
              className="flex items-center gap-4 bg-white/5 border border-white/20 px-8 py-4 rounded-3xl hover:bg-[#a509ff]/20 hover:border-[#a509ff]/50 transition-all group"
            >
              <img
                src={social.url}
                alt={social.name}
                className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-white font-bold capitalize">{social.name}</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          variants={fadeIn('up', 'tween', 0.8, 1)}
          className="mt-16 text-white/30 text-[14px] uppercase tracking-[5px]"
        >
          Jai Hind
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default CommunityBanner;
