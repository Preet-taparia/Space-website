import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from '../styles';
import { TitleText, TypingText } from '../components';
import { staggerContainer, fadeIn } from '../utils/motion';

const WhoInSpace = ({ people, count }) => {
  // Group astronauts by Craft (ISS, Tiangong, etc.)
  const groupedPeople = people.reduce((acc, person) => {
    const craft = person.craft || 'Unknown Spacecraft';
    if (!acc[craft]) acc[craft] = [];
    acc[craft].push(person);
    return acc;
  }, {});

  return (
    <section className={`${styles.paddings} relative z-10 min-h-screen`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Live Crew Manifest" textStyles="text-center" />
        <TitleText 
            title={<>Humans in Orbit: <span className="text-[#a509ff]">{count}</span></>} 
            textStyles="text-center mb-16" 
        />

        <div className="flex flex-col gap-12">
          {Object.entries(groupedPeople).map(([craft, crew], groupIndex) => (
            <motion.div 
                key={craft}
                variants={fadeIn('up', 'tween', groupIndex * 0.2, 1)}
                className="relative"
            >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-[2px] w-12 bg-white/30" />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest">{craft} Station</h2>
                    <div className="h-[2px] flex-1 bg-white/30" />
                </div>

                {/* Crew Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crew.map((person, index) => (
                        <div 
                            key={person.name}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[24px] flex items-center gap-6 hover:bg-white/10 transition-colors duration-300 group"
                        >
                            {/* Avatar Placeholder */}
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                                👨‍🚀
                            </div>
                            
                            <div>
                                <h3 className="text-white font-bold text-xl">{person.name}</h3>
                                <p className="text-secondary-white text-sm mt-1">Flight Engineer</p>
                                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                                    IN ORBIT
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch from Open Notify (Standard API for this data)
    const response = await axios.get('http://api.open-notify.org/astros.json');
    
    return {
      props: {
        people: response.data.people,
        count: response.data.number,
      },
    };
  } catch (error) {
    console.error("Error fetching astronauts:", error);
    return {
      props: {
        people: [],
        count: 0,
      },
    };
  }
}

export default WhoInSpace;