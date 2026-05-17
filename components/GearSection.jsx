'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { TypingText, TitleText } from './CustomTexts';

const gearItems = [
  {
    id: 'g1',
    title: 'Celestron Astromaster 114EQ',
    subtitle: 'My main telescope for planetary and lunar photography. 1000mm focal length.',
    imgUrl: '/planet-01.png', // Reusing existing assets to preserve system
  },
  {
    id: 'g2',
    title: 'iOptron SkyGuider Pro',
    subtitle: 'The tracking mount that enables my long-exposure deep space captures.',
    imgUrl: '/planet-05.png',
  },
  {
    id: 'g3',
    title: 'Smartphone Adapter',
    subtitle: 'Essential tool for capturing eyepiece views on a budget.',
    imgUrl: '/planet-09.png',
  },
];

const GearCard = ({ imgUrl, title, subtitle, index }) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 flex flex-col gap-4 hover:border-[#a509ff]/50 transition-all group"
  >
    <div className="w-full h-[200px] rounded-[24px] overflow-hidden">
      <img src={imgUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <h4 className="font-bold text-[24px] text-white mt-4">{title}</h4>
    <p className="text-secondary-white text-[16px] leading-relaxed">{subtitle}</p>
    <div className="mt-auto pt-4 flex items-center text-[#a509ff] font-bold text-[14px] uppercase tracking-wider">
      View Gear Stats <img src="/arrow.svg" className="ml-2 w-4 h-4 invert-[40%] sepia-[100%] saturate-[500%] hue-rotate-[250deg]" />
    </div>
  </motion.div>
);

const GearSection = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| My Equipment" textStyles="text-center" />
      <TitleText title={<>The Star Titan Arsenal</>} textStyles="text-center" />
      
      <div className="mt-[50px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {gearItems.map((item, index) => (
          <GearCard key={item.id} {...item} index={index} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default GearSection;
