'use client';

import { motion } from 'framer-motion';
import { communityEngagement } from '../constants';
import { fadeIn, staggerContainer } from '../utils/motion';
import styles from '../styles';

const CommunityHub = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      {/* Subscriber Spotlight */}
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 1)}
        className="flex-1 glassmorphism p-10 rounded-[40px] border-[#a509ff]/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <img src="/planet-09.png" className="w-24 h-24 rotate-12" alt="decor" />
        </div>
        <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
          <span className="text-[#a509ff]">★</span> Subscriber Spotlight
        </h3>
        <div className="flex flex-col gap-4">
            <p className="text-white text-lg italic leading-relaxed">
              &quot;{communityEngagement.subscriberSpotlight.message}&quot;
            </p>
            <div>
                <p className="text-[#a509ff] font-bold text-lg">{communityEngagement.subscriberSpotlight.name}</p>
                <p className="text-secondary-white text-sm">{communityEngagement.subscriberSpotlight.date}</p>
            </div>
        </div>
        <button className="mt-8 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-all border border-white/10">
          Share Your Discovery
        </button>
      </motion.div>

      {/* Titan Academy */}
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-1 flex flex-col gap-6"
      >
        <h3 className="text-white font-bold text-2xl mb-2 px-4 uppercase tracking-widest">Titan Academy</h3>
        {communityEngagement.academyLinks.map((academy, index) => (
          <a 
            key={index}
            href={academy.link}
            target="_blank"
            className="glassmorphism p-6 rounded-[24px] border-[#34acc7]/20 flex items-center justify-between group hover:border-[#34acc7] transition-all"
          >
            <div>
                <h4 className="text-white font-bold text-xl group-hover:text-[#34acc7] transition-colors">{academy.title}</h4>
                <p className="text-secondary-white text-sm mt-1">Educational Video Guide</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#34acc7]/20 flex items-center justify-center text-[#34acc7] group-hover:bg-[#34acc7] group-hover:text-white transition-all">
              →
            </div>
          </a>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default CommunityHub;
