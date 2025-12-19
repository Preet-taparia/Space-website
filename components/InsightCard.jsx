'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const InsightCard = ({ imgUrl, title, subtitle, source, url, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    initial="hidden"
    whileInView="show"
    className="flex md:flex-row flex-col gap-4"
  >
    <img
      src={imgUrl}
      alt={title}
      className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover"
    />
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <div className="font-normal text-[14px] text-secondary-white uppercase tracking-wider mb-2">
          {source || 'Space Express'}
        </div>
        
        <h4 className="font-normal lg:text-[42px] text-[26px] text-white">
          {title}
        </h4>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-secondary-white">
          {subtitle}
        </p>
      </div>

      <div
        onClick={() => window.open(url, '_blank')}
        className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
      >
        <img
          src="/arrow.svg"
          alt="arrow"
          className="w-[40%] h-[40%] object-contain filter hover:invert"
        />
      </div>
    </div>
  </motion.div>
);

export default InsightCard;