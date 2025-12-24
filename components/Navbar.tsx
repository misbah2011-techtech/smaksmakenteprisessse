import React, { useState, useEffect } from 'react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  onLogout: () => void;
  onSearch: (q: string) => void;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ profile, onLogout, onSearch, onNavigate, isDarkMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'glass py-2' : 'bg-transparent py-6'}`}>
      <div className="flex items-center space-x-12">
        <h1 
            onClick={() => onNavigate('home')} 
            className={`text-2xl md:text-3xl font-black tracking-tighter cursor-pointer select-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          SMAK<span className="text-red-600">SMAK</span>
        </h1>
        
        <div className={`hidden md:flex items-center space-x-6 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <button onClick={() => onNavigate('home')} className="hover:text-red-600 transition-colors">Home</button>
          <button onClick={() => onNavigate('movies')} className="hover:text-red-600 transition-colors">Movies</button>
          <button onClick={() => onNavigate('shows')} className="hover:text-red-600 transition-colors">TV Shows</button>
          <button onClick={() => onNavigate('mylist')} className="hover:text-red-600 transition-colors">My List</button>
          <button onClick={() => onNavigate('live')} className="hover:text-red-600 transition-colors flex items-center space-x-1">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span>Live</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleTheme}
            className={`p-2 rounded-full glass hover:bg-white/10 transition-all ${isDarkMode ? 'text-yellow-400' : 'text-indigo-600'}`}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
              }}
              className={`bg-white/10 border border-white/20 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 w-32 md:w-64 transition-all ${isDarkMode ? 'text-white' : 'text-gray-900 placeholder:text-gray-500'}`}
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <button onClick={onLogout} className="group flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg glass overflow-hidden border border-white/20 group-hover:border-white transition-colors`}>
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>{profile.name}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;