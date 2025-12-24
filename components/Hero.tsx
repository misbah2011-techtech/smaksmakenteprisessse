import React, { useState, useEffect } from 'react';
import { MediaContent } from '../types';

interface HeroProps {
  content: MediaContent[];
  onPlay: (item: MediaContent) => void;
}

const Hero: React.FC<HeroProps> = ({ content, onPlay }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % content.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [content.length]);

  if (!content.length) return null;
  const active = content[activeIndex];

  return (
    <div className="relative h-[85vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Background Slides */}
      {content.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10" />
          <div className="absolute inset-0 hero-gradient z-10" />
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-24 max-w-4xl space-y-6">
        <div className="flex items-center space-x-4 text-xs font-black tracking-widest uppercase">
          <span className="px-2 py-1 bg-white/20 glass rounded text-white">Featured</span>
          <span className="text-red-500">{active.genre.join(' • ')}</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight animate-float text-white drop-shadow-2xl">
          {active.title}
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl line-clamp-3 leading-relaxed max-w-2xl drop-shadow-lg">
          {active.overview}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => {
              onPlay(active);
              window.open(active.playUrl, '_blank');
            }}
            className="px-8 py-3 bg-white text-black rounded-lg font-bold flex items-center space-x-3 hover:bg-gray-200 transition-colors transform hover:scale-105"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <span>Play Now</span>
          </button>
          <a
             href={active.trailerUrl}
             target="_blank"
             rel="noopener noreferrer"
            className="px-8 py-3 glass rounded-lg font-bold text-white flex items-center space-x-3 hover:bg-white/10 transition-colors transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Watch Trailer</span>
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 right-12 z-20 flex space-x-3">
        {content.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-white w-8' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;