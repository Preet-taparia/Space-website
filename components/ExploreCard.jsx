"use client";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import Link from "next/link";

const ExploreCard = ({
  id,
  imgUrl,
  title,
  link,
  index,
  active,
  handleClick,
}) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className={`relative ${
      active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 w-full bg-[rgba(0,0,0,0.5)] rounded-b-[24px] ">
        <Link href={`/${link}`}>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white flex justify-end underline">
            {title}
          </h2>
          
        </Link>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
