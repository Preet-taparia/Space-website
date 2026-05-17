import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import styles from "../styles";
import { TypingText, TitleText, ShortsGallery } from "../components";
import { creatorGallery } from "../constants";
import { fadeIn } from "../utils/motion";

const ImageCard = memo(({ pic, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative mb-4 break-inside-avoid rounded-xl overflow-hidden group cursor-pointer bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300"
      onClick={() => onClick(pic)}
    >
      <img
        src={pic.url}
        alt={pic.title}
        loading="lazy"
        className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold text-white mb-2 uppercase tracking-wider border border-white/10">
            {pic.source}
          </span>
          <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md">
            {pic.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
});

ImageCard.displayName = "ImageCard";

const ImageModal = ({ selectedImage, onClose }) => {
  if (!selectedImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-5xl w-full max-h-[90vh] bg-[#111] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center">
          <img
            src={selectedImage.hdurl || selectedImage.imgUrl}
            className="max-h-[50vh] md:max-h-[90vh] w-full object-contain"
            alt={selectedImage.title}
          />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto bg-[#111]">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-indigo-600 text-white text-xs font-bold">
                {selectedImage.source || "Amateur Gear"}
              </span>
              <p className="text-xs text-gray-400">{selectedImage.date}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            {selectedImage.title}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {selectedImage.description || "No description available."}
          </p>

          <a
            href={selectedImage.hdurl || selectedImage.imgUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors"
          >
            Download HD
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Picture = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const loaderRef = useRef(null);
  const dataFetchedRef = useRef(false);

  const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

  const handleImageClick = useCallback((pic) => {
    setSelectedImage(pic);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const processData = (items, source) => {
    return items
      .filter((item) => {
        if (source === "Mars") return true;
        if (source === "APOD") return item.media_type === "image";
        return item.links?.[0]?.href;
      })
      .map((item) => {
        const uniqueId =
          source === "APOD"
            ? `apod-${item.date}`
            : source === "Mars"
              ? `mars-${item.id}`
              : `nasa-${item.data[0].nasa_id}`;

        return {
          id: uniqueId,
          url:
            source === "Mars"
              ? item.img_src
              : source === "APOD"
                ? item.url
                : item.links[0].href,
          hdurl:
            source === "Mars"
              ? item.img_src
              : source === "APOD"
                ? item.hdurl || item.url
                : item.links[0].href,
          title:
            source === "Mars"
              ? `Mars Rover (${item.camera.name})`
              : source === "APOD"
                ? item.title
                : item.data[0].title,
          description:
            source === "Mars"
              ? `Captured by ${item.rover.name}`
              : source === "APOD"
                ? item.explanation
                : item.data[0].description,
          date:
            source === "Mars"
              ? item.earth_date
              : source === "APOD"
                ? item.date
                : item.data[0].date_created?.split("T")[0],
          source: source,
        };
      });
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const initFetch = async () => {
      setLoading(true);
      try {
        const [apod, mars, library] = await Promise.allSettled([
          axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=6`
          ),
          axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
          ),
          axios.get(
            "https://images-api.nasa.gov/search?q=nebula&media_type=image&year_start=2022"
          ),
        ]);

        let newPics = [];
        if (apod.status === "fulfilled")
          newPics.push(...processData(apod.value.data, "APOD"));
        if (mars.status === "fulfilled")
          newPics.push(
            ...processData(mars.value.data.photos.slice(0, 6), "Mars")
          );
        if (library.status === "fulfilled")
          newPics.push(
            ...processData(
              library.value.data.collection.items.slice(0, 8),
              "NASA"
            )
          );

        setPictures(newPics.sort(() => Math.random() - 0.5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initFetch();
  }, [NASA_API_KEY]);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const queries = ["galaxy", "supernova", "black hole", "sun", "moon"];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];

      const res = await axios.get("https://images-api.nasa.gov/search", {
        params: {
          q: randomQuery,
          media_type: "image",
          year_start: "2010",
        },
      });

      const items = res.data.collection.items;
      const start = Math.floor(Math.random() * Math.max(0, items.length - 10));
      const newBatch = processData(items.slice(start, start + 8), "NASA");

      setPictures((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = newBatch.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Observer Setup ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && pictures.length > 0) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, pictures, loadMore]);

  const columns = [[], [], []];
  pictures.forEach((pic, index) => {
    columns[index % 3].push(pic);
  });

  return (
    <section className={`${styles.paddings} relative z-10 min-h-screen`}>
      <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <TypingText title="| The Gallery" textStyles="text-center" />
        <TitleText
          title={<>Cosmic Perspectives</>}
          textStyles="text-center mb-16"
        />

        {/* STAR TITAN CAPTURES SECTION */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-white font-bold text-3xl uppercase tracking-wider">
              Captured by <span className="text-[#a509ff]">Star Titan</span>
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#a509ff]/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorGallery.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                className="bg-white/5 backdrop-blur-md border border-[#a509ff]/30 rounded-[32px] overflow-hidden group cursor-pointer hover:border-[#a509ff] transition-all shadow-[0_0_20px_rgba(165,9,255,0.1)] hover:shadow-[0_0_30px_rgba(165,9,255,0.3)]"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#a509ff] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                    Amateur Gear
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary-white text-[12px] opacity-70 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FEED COMPARISON SECTION - Placeholder for Layered Evolution */}
        <div className="mb-20 text-center glassmorphism p-12 rounded-[40px] border-[#a509ff]/20">
          <h3 className="text-white text-2xl font-bold mb-4">NASA vs Star Titan</h3>
          <p className="text-secondary-white max-w-[600px] mx-auto">
            Comparing images taken from Earth with those from space observatories like Hubbble and JWST. Watch my full comparison video on YouTube to see how amateur gear stacks up.
          </p>
          <a href="https://youtube.com/@StarTitan" className="inline-block mt-6 text-[#a509ff] font-bold border-b border-[#a509ff] pb-1">Watch Comparison Engine &rarr;</a>
        </div>
        <ShortsGallery />

        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-white font-bold text-3xl uppercase tracking-wider">
            Real-time <span className="text-[#34acc7]">Space Flow</span>
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-[#34acc7]/50 to-transparent" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col">
            {columns[0].map((pic) => (
              <ImageCard
                key={pic.id}
                pic={pic}
                onClick={handleImageClick}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {columns[1].map((pic) => (
              <ImageCard
                key={pic.id}
                pic={pic}
                onClick={handleImageClick}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col">
            {columns[2].map((pic) => (
              <ImageCard
                key={pic.id}
                pic={pic}
                onClick={handleImageClick}
              />
            ))}
          </div>
        </div>

        <div
          ref={loaderRef}
          className="w-full flex justify-center items-center py-12 min-h-[100px]"
        >
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin"></div>
              </div>
              <span className="text-white/70 text-sm font-semibold tracking-wider animate-pulse">
                Expanding Universe...
              </span>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            selectedImage={selectedImage}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Picture;