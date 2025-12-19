"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import axios from "axios";
import styles from "../styles";
import { TitleText, TypingText, AboutISS } from "../components";
import { staggerContainer, fadeIn } from "../utils/motion";

const ISSMap = dynamic(() => import("./ISSMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0b0d17]">
      <div className="w-8 h-8 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  ),
});

const WhereISS = () => {
  const [issData, setIssData] = useState(null);
  const [pathHistory, setPathHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoCenter, setAutoCenter] = useState(true);

  useEffect(() => {
    fetchISSData();
    const interval = setInterval(fetchISSData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchISSData = async () => {
    try {
      const response = await axios.get(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );
      const { latitude, longitude, altitude, velocity, visibility } =
        response.data;

      setIssData({
        lat: latitude,
        lng: longitude,
        alt: altitude.toFixed(2),
        vel: velocity.toFixed(0),
        vis: visibility,
      });

      setPathHistory((prev) => {
        // Keep history manageable (last 100 points)
        const newHistory = [...prev, [latitude, longitude]];
        return newHistory.slice(-100);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ISS position:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col gap-4`}
      >
        <div className="flex flex-col items-center">
          <TypingText title="| Track the ISS" textStyles="text-center" />
          <TitleText title={<>Where is the ISS?</>} textStyles="text-center" />
          <AboutISS />
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        >
          <StatCard label="Latitude" value={issData.lat.toFixed(4)} unit="°" />
          <StatCard label="Longitude" value={issData.lng.toFixed(4)} unit="°" />
          <StatCard label="Altitude" value={issData.alt} unit="km" />
          <StatCard label="Velocity" value={issData.vel} unit="km/h" />
        </motion.div>

        <motion.div
          variants={fadeIn("up", 'tween', 0.4, 1)}
          className="relative w-full h-[500px] rounded-[32px] overflow-hidden border-[2px] border-white/10 shadow-2xl z-0"
        >
          <ISSMap
            lat={issData.lat}
            lng={issData.lng}
            pathHistory={pathHistory}
            autoCenter={autoCenter}
            setAutoCenter={setAutoCenter}
            visibility={issData.vis}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const StatCard = ({ label, value, unit }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 transition-colors">
    <span className="text-secondary-white text-xs uppercase tracking-wider mb-1">
      {label}
    </span>
    <div className="flex items-baseline gap-1">
      <span className="text-white text-xl md:text-2xl font-bold">{value}</span>
      <span className="text-white/50 text-xs font-bold">{unit}</span>
    </div>
  </div>
);

export default WhereISS;
