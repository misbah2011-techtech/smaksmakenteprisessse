
import React, { useRef, useState } from 'react';
import { MediaContent } from '../types';

interface ContentRowProps {
  title: string;
  items: MediaContent[];
  onShowBumper: (item: MediaContent) => void;
  onExpand: (item: MediaContent) => void;
  onToggleMyList: (id: string) => void;
  isInMyList: (id: string) => boolean;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onShowBumper, onExpand, onToggleMyList, isInMyList }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="py-4 group relative" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
      <h2 className="text-xl font-bold px-6 md:px-12 mb-3 tracking-tight flex items-center space-x-2 text-gray-200">
        <span>{title}</span>
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </h2>

      <div className="relative">
        {showControls && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-40 bg-gradient-to-r from-black/80 to-transparent px-6 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-40 bg-gradient-to-l from-black/80 to-transparent px-6 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        <div
          ref={rowRef}
          className="flex overflow-x-auto space-x-3 px-6 md:px-12 scrollbar-hide no-scrollbar pb-2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onExpand(item)}
              className="flex-none w-[240px] md:w-[320px] aspect-video relative group/card cursor-pointer rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:z-30 shadow-md hover:shadow-2xl border border-white/5"
              onMouseEnter={() => onShowBumper(item)}
            >
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-md">{item.rating}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleMyList(item.id); }} 
                    className={`p-2 glass rounded-full hover:bg-white/20 transition-colors ${isInMyList(item.id) ? 'bg-white text-black' : ''}`}
                  >
                    {isInMyList(item.id) ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm truncate">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                    <span className="text-green-500 font-bold">98% Match</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
