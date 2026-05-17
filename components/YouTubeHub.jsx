'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TypingText, TitleText } from './CustomTexts';
import { starTitanVideos } from '../constants';

const VideoCard = ({ id, title, videoId, thumbnail, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    className="flex md:flex-row flex-col gap-4 group"
  >
    <a 
      href={`https://www.youtube.com/watch?v=${videoId}`} 
      target="_blank" 
      className="relative md:w-[270px] w-full h-[250px] shrink-0"
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full rounded-[32px] object-cover border border-white/10 group-hover:border-[#a509ff]/50 transition-all"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-[#a509ff] rounded-full flex items-center justify-center shadow-lg">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </div>
      </div>
    </a>
    
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <h4 className="font-normal lg:text-[42px] text-[26px] text-white group-hover:text-[#a509ff] transition-colors">
          {title}
        </h4>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-secondary-white">
          Watch the full observation and breakdown on Star Titan.
        </p>
      </div>

      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-white group-hover:border-[#a509ff] transition-all"
      >
        <img
          src="/arrow.svg"
          alt="arrow"
          className="w-[40%] h-[40%] object-contain group-hover:rotate-[-45deg] transition-all"
        />
      </a>
    </div>
  </motion.div>
);

const YouTubeHub = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| YouTube Content" textStyles="text-center" />
      <TitleText title={<>Latest from Star Titan</>} textStyles="text-center" />
      
      <div className="mt-[50px] flex flex-col gap-[30px]">
        {starTitanVideos.map((video, index) => (
          <VideoCard key={video.id} {...video} index={index} />
        ))}
      </div>

      <motion.div
        variants={fadeIn('up', 'tween', 0.5, 1)}
        className="flex justify-center mt-12"
      >
        <a 
          href="https://youtube.com/@StarTitan" 
          target="_blank"
          className="glassmorphism px-10 py-4 rounded-full text-white font-bold hover:shadow-[0_0_20px_rgba(165,9,255,0.4)] transition-all"
        >
          Explore All Videos
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default YouTubeHub;
