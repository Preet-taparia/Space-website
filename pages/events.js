'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { TitleText, TypingText } from '../components';
import { staggerContainer, fadeIn } from '../utils/motion';
import { upcomingEvents } from '../constants';

const Events = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [currentMonthIdx, setCurrentMonthIdx] = React.useState(0); // Start on January 2026
    const year = 2026;

    const handlePrev = () => { if (currentMonthIdx > 0) setCurrentMonthIdx(currentMonthIdx - 1); }
    const handleNext = () => { if (currentMonthIdx < 11) setCurrentMonthIdx(currentMonthIdx + 1); }

    const daysInMonth = new Date(year, currentMonthIdx + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentMonthIdx, 1).getDay();

    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const currentMonthName = monthNames[currentMonthIdx];

    const filteredEvents = upcomingEvents.filter(event => event.month === currentMonthName);
    const highlightDays = filteredEvents.map(e => ({
        day: parseInt(e.date.split(' ')[1]),
        event: e
    }));

    const handleDayClick = (eventObj) => {
        if (!eventObj) return;
        setTimeout(() => {
            const el = document.getElementById(`event-${eventObj.id}`);
            if (el) {
                const yOffset = -100;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <section className={`${styles.paddings} relative z-10 min-h-screen star-bg pt-28`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className={`${styles.innerWidth} mx-auto flex flex-col`}
            >
                <TypingText title="| The Stargazer Guide" textStyles="text-center" />
                <TitleText title={<>Celestial Events <span className="text-[#34acc7]">2026</span></>} textStyles="text-center mb-10" />

                {/* Interactive Calendar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glassmorphism p-6 md:p-10 rounded-[40px] border-[#34acc7]/20 max-w-[800px] mx-auto w-full mb-16 shadow-2xl relative"
                >
                    <div className="absolute top-0 right-0 p-8 w-full h-full pointer-events-none opacity-20">
                        <div className="w-64 h-64 bg-[#34acc7] rounded-full blur-[100px] float-right" />
                    </div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={handlePrev} className="w-12 h-12 rounded-full flex items-center justify-center border border-[#34acc7]/20 hover:bg-[#34acc7]/20 text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent" disabled={currentMonthIdx === 0}>
                            &larr;
                        </button>
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-[#34acc7] tracking-wider uppercase">
                                {currentMonthName} <span className="text-white">{year}</span>
                            </h3>
                        </div>
                        <button onClick={handleNext} className="w-12 h-12 rounded-full flex items-center justify-center border border-[#34acc7]/20 hover:bg-[#34acc7]/20 text-white transition-all disabled:opacity-20 disabled:hover:bg-transparent" disabled={currentMonthIdx === 11}>
                            &rarr;
                        </button>
                    </div>

                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                        {shortDays.map(day => (
                            <div key={day} className="text-center text-xs md:text-sm font-bold text-secondary-white tracking-widest uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {blanks.map(b => <div key={`blank-${b}`} className="w-full aspect-square" />)}
                        {days.map(d => {
                            const eventMatch = highlightDays.find(h => h.day === d);
                            const isEvent = !!eventMatch;
                            return (
                                <div
                                    key={d}
                                    onClick={() => isEvent ? handleDayClick(eventMatch.event) : null}
                                    className={`relative group w-full aspect-[4/3] md:aspect-square rounded-xl md:rounded-2xl flex items-center justify-center text-sm md:text-lg font-bold transition-all ${isEvent
                                            ? 'bg-[#34acc7]/20 text-white shadow-[0_0_20px_rgba(52,172,199,0.5)] border-2 border-[#34acc7] cursor-pointer hover:bg-[#34acc7] hover:scale-105 z-10'
                                            : 'bg-white/5 text-secondary-white hover:bg-white/10 hover:text-white border border-transparent'
                                        }`}
                                >
                                    {d}
                                    {isEvent && (
                                        <div className="absolute bottom-full mb-2 hidden group-hover:block w-max max-w-[200px] bg-[#0f0e17] border border-[#a509ff]/50 text-white text-[10px] md:text-xs p-2 rounded-lg shadow-xl z-50 text-center">
                                            {eventMatch.event.title}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f0e17] border-b border-r border-[#a509ff]/50 rotate-45" />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-8 flex justify-center items-center gap-6 text-[10px] md:text-xs font-bold text-secondary-white uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#34acc7] shadow-[0_0_10px_rgba(52,172,199,0.5)]"></div>
                            Cosmic Event
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10"></div>
                            No Observation
                        </div>
                    </div>
                </motion.div>

                {/* Remove old text bloat as calendar serves as guide */}

                <div className="flex flex-col gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredEvents.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="text-center py-20 glassmorphism rounded-[40px] border-white/5"
                            >
                                <p className="text-secondary-white text-lg font-medium italic">Scanning coordinates... no major celestial events documented for this month.</p>
                                <button onClick={handleNext} className="mt-6 text-[#34acc7] font-bold text-sm hover:underline">Scan {currentMonthIdx < 11 ? monthNames[currentMonthIdx + 1] : 'next year'}</button>
                            </motion.div>
                        ) : (
                            filteredEvents.map((event, index) => (
                                <motion.div
                                    id={`event-${event.id}`}
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="glassmorphism p-8 md:p-12 rounded-[40px] border-white/10 flex md:flex-row flex-col items-center gap-10 group hover:border-[#34acc7]/40 transition-all shadow-xl"
                                >
                                    {/* Date Badge */}
                                    <div className="flex flex-col items-center justify-center min-w-[120px] h-[120px] rounded-3xl bg-white/5 border border-white/10 group-hover:bg-[#34acc7]/10 transition-colors">
                                        <span className="text-[#34acc7] font-bold text-lg uppercase">{event.date.split(',')[0].split(' ')[0]}</span>
                                        <span className="text-white font-extrabold text-3xl">{event.date.split(',')[0].split(' ')[1]}</span>
                                        <span className="text-secondary-white text-[12px] opacity-70">2026</span>
                                    </div>

                                    {/* Event Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-0.5 bg-[#34acc7]/20 text-[#34acc7] text-[10px] font-bold rounded uppercase tracking-widest border border-[#34acc7]/30">
                                                {event.visibility}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-extrabold text-2xl md:text-3xl mb-2 group-hover:text-[#34acc7] transition-colors">{event.title}</h3>
                                        <p className="text-secondary-white text-sm mb-4 line-clamp-2 italic">{event.description}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-start gap-3">
                                                <span className="text-xl">🛠️</span>
                                                <div>
                                                    <p className="text-xs text-secondary-white uppercase font-bold opacity-50">Recommended Gear</p>
                                                    <p className="text-white font-medium">{event.gear}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-full bg-[#34acc7]/5 -skew-x-12 translate-x-10" />
                                            <p className="text-[#34acc7] font-bold text-xs uppercase mb-1 flex items-center gap-2">
                                                <span>●</span> Star Titan Viewing Tip:
                                            </p>
                                            <p className="text-secondary-white text-sm italic leading-relaxed">
                                                I&apos;ll be doing a live stream from Jaipur for this. Set your alarms for local midnight and look toward the horizon.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={event.guide}
                                            target="_blank"
                                            className="bg-[#34acc7] px-6 py-3 rounded-full text-white font-bold text-sm text-center hover:shadow-[0_0_15px_rgba(52,172,199,0.5)] transition-all flex items-center gap-2"
                                        >
                                            <span>📺</span> Watch Guide
                                        </a>
                                        <button className="glassmorphism px-6 py-3 rounded-full text-white font-bold text-sm text-center border-white/10 hover:bg-white/5 transition-all">
                                            Set Reminder
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-20 text-center">
                    <h4 className="text-white font-bold text-xl mb-4">Want more observation tips?</h4>
                    <a href="https://youtube.com/@StarTitan" target="_blank" className="text-[#34acc7] underline underline-offset-4 font-bold">Join the Star Titan Community on YouTube</a>
                </div>
            </motion.div>
        </section >
    );
};

export default Events;
