'use client';

import { motion } from 'framer-motion';
import { starTitanShorts } from '../constants';
import { fadeIn, staggerContainer } from '../utils/motion';
import styles from '../styles';

const ShortsGallery = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white font-bold text-3xl uppercase tracking-wider">
          Titan <span className="text-[#FF0000]">Shorts</span>
        </h2>
        <a href="https://youtube.com/@StarTitan/shorts" target="_blank" className="text-secondary-white text-sm hover:text-white transition-colors">View All &rarr;</a>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar">
        {starTitanShorts.map((short, index) => (
          <motion.div
            key={short.id}
            variants={fadeIn('right', 'spring', index * 0.2, 0.75)}
            className="min-w-[200px] md:min-w-[250px] aspect-[9/16] relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-[#FF0000]/50 transition-all shadow-lg"
          >
            <img 
              src={short.thumbnail} 
              alt={short.title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4">
               <h3 className="text-white font-bold text-sm leading-tight mb-2">{short.title}</h3>
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center">
                    <span className="text-[10px]">▶</span>
                  </div>
                  <span className="text-[10px] text-white uppercase tracking-tighter">Play Reel</span>
               </div>
            </div>
            <a 
              href={`https://youtube.com/shorts/${short.videoId}`} 
              target="_blank" 
              className="absolute inset-0 z-10"
              aria-label={short.title}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default ShortsGallery;
