import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { InsightCard, TitleText, TypingText } from '../components';
import styles from '../styles';

const Insights = ({ insights }) => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| The Space Express" textStyles="text-center" />
      <TitleText title={<>Read News about Space</>} textStyles="text-center" />
      
      <div className="mt-[50px] flex flex-col gap-[30px]">
        {insights.map((item, index) => (
          <a 
            key={`insight-${index}`} 
            href={item.url} 
            target="_blank" 
            rel="noreferrer"
            className="block hover:opacity-90 transition-opacity"
          >
            <InsightCard 
              {...item} 
              index={index + 1} 
              subtitle={`${item.source}: ${item.subtitle}`}
            />
          </a>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Insights;