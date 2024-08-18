import React from "react";
import styles from "../styles";

const AboutISS = () => {
  return (
    <section className={`${styles.paddings}`}>
      <div className="font-normal lg:text-[42px] text-[26px] text-white">
        The International Space Station is moving at close to 28,000 km/h so its
        location changes really fast! Where is it right now?
      </div>
    </section>
  );
};

export default AboutISS;
