// pages/news.jsx

import { useState } from 'react';
import axios from 'axios';
import Insights from "../components/Insights";

const PAGE_LIMIT = 10; // Number of items per page

const News = ({ initialInsights }) => {
  const [insights, setInsights] = useState(initialInsights);
  const [offset, setOffset] = useState(0);

  const loadMore = async () => {
    try {
      const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/', {
        params: {
          limit: PAGE_LIMIT,
          offset: offset + PAGE_LIMIT,
        }
      });
      const newInsights = response.data.results.map((article) => ({
        imgUrl: article.image_url,
        title: article.title,
        subtitle: article.summary,
      }));
      setInsights([...insights, ...newInsights]);
      setOffset(offset + PAGE_LIMIT);
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  return (
    <div>
      <Insights insights={insights} />
      <div className="flex justify-center">
        <button
          onClick={loadMore}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/', {
      params: {
        limit: PAGE_LIMIT,
        offset: 0,
      }
    });
    const initialInsights = response.data.results.map((article) => ({
      imgUrl: article.image_url,
      title: article.title,
      subtitle: article.summary,
    }));
    return {
      props: {
        initialInsights,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialInsights: [],
      },
    };
  }
}

export default News;
