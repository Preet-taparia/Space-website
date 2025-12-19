import React from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from '../styles';
import { TitleText, TypingText } from '../components';
import { staggerContainer, fadeIn } from '../utils/motion';

const Facts = ({ bodies }) => {
  return (
    <section className={`${styles.paddings} relative z-10 min-h-screen`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Cosmic Encyclopedia" textStyles="text-center" />
        <TitleText title={<>Solar System Facts</>} textStyles="text-center mb-16" />

        {bodies.length === 0 ? (
          <div className="text-center text-white/60 text-xl py-20">
            Unable to retrieve solar system data. <br/>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodies.map((body, index) => (
              <motion.div
                  key={body.id}
                  variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 hover:border-white/30 transition-all duration-300 group overflow-hidden relative"
              >
                  {/* Decorative Background Gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#a509ff]/20 to-transparent blur-2xl rounded-full -mr-10 -mt-10 group-hover:from-[#a509ff]/40 transition-colors" />

                  <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                          <div>
                              <h3 className="text-3xl font-bold text-white mb-1">{body.englishName}</h3>
                              <span className="text-secondary-white uppercase tracking-wider text-xs font-bold bg-white/10 px-2 py-1 rounded">
                                  {body.isPlanet ? 'Planet' : 'Moon / Body'}
                              </span>
                          </div>
                          <div className="text-4xl opacity-80">
                              {body.isPlanet ? '🪐' : '🌑'}
                          </div>
                      </div>

                      <div className="space-y-4">
                          <FactRow label="Gravity" value={`${body.gravity} m/s²`} />
                          <FactRow label="Avg Temp" value={`${body.avgTemp - 273.15}°C`} />
                          <FactRow label="Density" value={`${body.density} g/cm³`} />
                          <FactRow label="Day Length" value={`${Math.abs(body.sideralRotation).toFixed(1)} hrs`} />
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/10">
                          <p className="text-sm text-gray-300 italic">
                               {body.gravity > 9.8 
                                  ? `You would feel heavier here than on Earth.` 
                                  : `You would weigh ${(body.gravity / 9.8 * 100).toFixed(0)}% of your Earth weight here.`}
                          </p>
                      </div>
                  </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

const FactRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
        <span className="text-secondary-white text-sm">{label}</span>
        <span className="text-white font-bold font-mono">{value}</span>
    </div>
);

export async function getServerSideProps() {
  try {
    // UPDATED: Now includes Authorization Header
    // If you don't add the key to .env.local, this request will fail 
    const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/', {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SOLAR_API_KEY}`
        }
    });
    
    // Filter for Planets and interesting major moons only to keep quality high
    const interestingBodies = response.data.bodies.filter(body => {
        return body.isPlanet || (body.radius > 1500); // Planets + Big Moons
    });

    // Sort: Planets first, then by size
    const sortedBodies = interestingBodies.sort((a, b) => {
        if (a.isPlanet && !b.isPlanet) return -1;
        if (!a.isPlanet && b.isPlanet) return 1;
        return b.meanRadius - a.meanRadius;
    });

    return {
      props: {
        bodies: sortedBodies.map(b => ({
            id: b.id,
            englishName: b.englishName,
            isPlanet: b.isPlanet,
            gravity: b.gravity,
            avgTemp: Math.round(b.avgTemp),
            density: b.density,
            sideralRotation: b.sideralRotation
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching solar system data:", error.message);
    // Returns empty array if API fails (NO FAKE DATA)
    return {
      props: {
        bodies: [],
      },
    };
  }
}

export default Facts;