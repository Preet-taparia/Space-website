import { useState } from "react";
import axios from "axios";
import Insights from "../components/Insights";

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
    <div>
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