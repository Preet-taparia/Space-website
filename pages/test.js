import axios from 'axios';

export async function getStaticProps() {
    const res = await axios.get('https://api.github.com/repos/vercel/next.js');
    return { props: { repo: res.data } };
}
   
export default function Test({ repo }) {
    return <div>{repo.stargazers_count}</div>;
}



//   import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// import styles from '../styles';
// import { staggerContainer } from '../utils/motion';
// import { InsightCard, TitleText, TypingText } from '../components';

// const Insights = () => {
//   const [insights, setInsights] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/');
//         const articles = response.data.results.map((article) => ({
//           imgUrl: article.image_url,
//           title: article.title,
//           subtitle: article.summary,
//         }));
//         setInsights(articles);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className={`${styles.paddings} relative z-10`}>
//       <motion.div
//         variants={staggerContainer}
//         initial="hidden"
//         animate={insights.length > 0 ? "show" : "hidden"}
//         whileInView="show"
//         viewport={{ once: false, amount: 0.25 }}
//         className={`${styles.innerWidth} mx-auto flex flex-col`}
//       >
//         <TypingText title="| Space Insights" textStyles="text-center" />
//         <TitleText title={<>Insights about Astronomy</>} textStyles="text-center" />
//         <div className="mt-[50px] flex flex-col gap-[30px]">
//           {insights.map((item, index) => (
//             <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Insights;
