import React from "react";
import { WhereISS, AboutISS } from "../components";

const ISS = () => {
  return (
    <div>
      <AboutISS />
      <div className="relative">
        <div className="gradient-04 z-0" />
        <WhereISS />
      </div>
    </div>
  );
};

export default ISS;
