
import React, { useState, useEffect } from 'react';
import { AgeRating } from '../types';

interface ContentBumperProps {
  rating: AgeRating;
  description: string;
  isVisible: boolean;
}

const ContentBumper: React.FC<ContentBumperProps> = ({ rating, description, isVisible }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-10 z-[100] transition-opacity duration-1000">
      <div className="glass p-4 rounded-lg flex flex-col gap-1 max-w-xs border-l-4 border-yellow-500 shadow-2xl animate-pulse">
        <span className="text-2xl font-black text-white bg-black/40 px-2 py-1 inline-block rounded">
          RATED {rating}
        </span>
        <p className="text-sm text-gray-200 uppercase tracking-widest font-semibold">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ContentBumper;
