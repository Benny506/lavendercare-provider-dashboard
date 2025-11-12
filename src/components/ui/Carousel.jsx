import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "./image";

const Carousel = ({ images = [], interval = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const total = images.length;

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % total);
    }, interval);

    return () => clearTimeout(timeoutRef.current);
  }, [index, paused, total, interval]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="flex w-full h-full">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-full h-full"
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover block"
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      {/* {total > 1 && (
        <>
          <button
            onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % total)}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
          >
            ›
          </button>
        </>
      )} */}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
