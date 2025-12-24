import React, { useState } from 'react';
import { MediaContent } from '../types';

interface MediaDetailProps {
  item: MediaContent;
  onClose: () => void;
  onToggleMyList: (id: string) => void;
  isInMyList: (id: string) => boolean;
  onPlay: (item: MediaContent) => void;
}

const MediaDetail: React.FC<MediaDetailProps> = ({ item, onClose, onToggleMyList, isInMyList, onPlay }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col">
        {/* Banner */}
        <div className="relative h-[35vh] md:h-[45vh] w-full shrink-0">
          <img src={item.thumbnail} className="w-full h-full object-cover" alt={item.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/20 transition-all z-50 text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">{item.title}</h1>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-300">
                <span className="text-green-500">Must Watch</span>
                <span>{item.year}</span>
                <span className="px-1.5 py-0.5 border border-white/20 rounded text-[9px] text-white">{item.rating}</span>
                <span>{item.quality.join(' ')}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  onPlay(item);
                  window.open(item.playUrl, '_blank');
                }}
                className="px-6 py-2 bg-white text-black rounded font-bold text-sm flex items-center space-x-2 hover:bg-gray-200 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <span>Play Now</span>
              </button>
              <button onClick={() => onToggleMyList(item.id)} className="p-2 glass rounded hover:bg-white/10 text-white">
                {isInMyList(item.id) ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info & Episodes */}
        <div className="flex-1 overflow-y-auto p-8 bg-transparent no-scrollbar">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <p className="text-base md:text-lg opacity-80 leading-relaxed max-w-3xl">{item.overview}</p>
              
              {item.seasons && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
                    <h3 className="text-xl font-bold">Episodes</h3>
                    <div className="flex gap-4">
                      {item.seasons.map(s => (
                        <button 
                          key={s.number} 
                          onClick={() => setSelectedSeason(s.number)}
                          className={`text-sm font-bold pb-2 transition-colors ${selectedSeason === s.number ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-600'}`}
                        >
                          Season {s.number}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {item.seasons.find(s => s.number === selectedSeason)?.episodes.map((ep, idx) => (
                      <div key={ep.id} className="group/ep flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all border border-transparent hover:border-black/5 dark:hover:border-white/5">
                        <span className="text-gray-400 font-bold w-4">{idx + 1}</span>
                        <div className="w-32 md:w-40 aspect-video rounded overflow-hidden shrink-0 relative">
                          <img src={ep.thumbnail} className="w-full h-full object-cover" alt={ep.title} />
                          <button 
                            onClick={() => {
                              onPlay(item);
                              window.open(ep.link, '_blank');
                            }}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/ep:opacity-100 flex items-center justify-center transition-opacity"
                          >
                            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-sm truncate">{ep.title}</h4>
                            <span className="text-[10px] text-gray-500 shrink-0">{ep.duration}</span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{ep.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6 text-xs text-gray-500">
              <div>
                <p className="font-bold opacity-100 mb-1 uppercase tracking-tighter">Genres</p>
                <p>{item.genre.join(', ')}</p>
              </div>
              <div>
                <p className="font-bold opacity-100 mb-1 uppercase tracking-tighter">Audio</p>
                <p>{item.audio.join(', ')}</p>
              </div>
              <div>
                <p className="font-bold opacity-100 mb-1 uppercase tracking-tighter">This series is</p>
                <p className="italic">Cinematic, Engaging, Pakistan's Finest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;