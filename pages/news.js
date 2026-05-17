import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { TypingText } from "../components";
import Insights from "../components/Insights";
import styles from "../styles";
import { fadeIn } from "../utils/motion";

const PAGE_LIMIT = 6;

const News = ({ initialInsights }) => {
  const [insights, setInsights] = useState(initialInsights);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.spaceflightnewsapi.net/v4/articles/",
        {
          params: {
            limit: PAGE_LIMIT,
            offset: offset + PAGE_LIMIT,
          },
        }
      );

      const newInsights = response.data.results.map((article) => ({
        imgUrl: article.image_url,
        title: article.title,
        subtitle: article.summary,
        url: article.url,
        source: article.news_site,
      }));

      setInsights((prev) => [...prev, ...newInsights]);
      setOffset(offset + PAGE_LIMIT);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="star-bg min-h-screen pt-28">
      <div className={`${styles.innerWidth} mx-auto px-6`}>
        <TypingText title="| The Space Express" textStyles="text-center" />
        <h2 className="text-white text-center font-bold text-4xl sm:text-6xl mb-12">
          Star Titan <span className="text-[#a509ff]">Commentary</span>
        </h2>

        {/* Creator Context Banner */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          className="glassmorphism p-8 mb-16 rounded-[32px] border-[#a509ff]/20 flex md:flex-row flex-col items-center gap-8"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#a509ff] to-[#34acc7] flex items-center justify-center text-4xl shadow-lg shrink-0">
            🔭
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-2">Aaditya&apos;s Perspective</h3>
            <p className="text-secondary-white text-sm leading-relaxed">
              I follow these launches live from Jaipur. Here&apos;s my curated feed of the most important updates in aerospace. I often break these down in my &quot;Weekly Space Express&quot; videos on YouTube.
            </p>
            <a href="https://youtube.com/@StarTitan" target="_blank" className="inline-block mt-4 text-[#a509ff] text-sm font-bold uppercase tracking-widest">
              Watch News Breakdowns &rarr;
            </a>
          </div>
        </motion.div>
      </div>

      <Insights insights={insights} />
      <div className="flex justify-center mb-16">
        <button
          onClick={loadMore}
          disabled={loading}
          className="relative group overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More Universe</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://api.spaceflightnewsapi.net/v4/articles/",
      {
        params: {
          limit: PAGE_LIMIT,
          offset: 0,
        },
      }
    );

    const initialInsights = response.data.results.map((article) => ({
      imgUrl: article.image_url,
      title: article.title,
      subtitle: article.summary,
      url: article.url,
      source: article.news_site,
    }));

    return {
      props: {
        initialInsights,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialInsights: [],
      },
    };
  }
}

export default News;