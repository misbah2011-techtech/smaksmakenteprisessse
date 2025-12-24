
import React, { useState, useEffect } from 'react';
import { Profile, MediaContent, AgeRating } from './types';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import ContentBumper from './components/ContentBumper';
import MediaDetail from './components/MediaDetail';
import { ALL_CONTENT, MOVIES, SHOWS, ABOUT_TEXT, CONTACT_EMAIL, RATING_HIERARCHY, LIVE_URL } from './constants';
import { searchContent } from './services/geminiService';

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeBumper, setActiveBumper] = useState<{ rating: AgeRating, text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState<string[]>([]);
  const [continueWatching, setContinueWatching] = useState<string[]>([]);
  const [expandedItem, setExpandedItem] = useState<MediaContent | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('smak_profiles');
    if (savedProfiles) setProfiles(JSON.parse(savedProfiles));

    const savedList = localStorage.getItem('smak_mylist');
    if (savedList) setMyList(JSON.parse(savedList));

    const savedCW = localStorage.getItem('smak_continue');
    if (savedCW) setContinueWatching(JSON.parse(savedCW));

    const savedTheme = localStorage.getItem('smak_theme');
    if (savedTheme !== null) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    document.body.classList.toggle('dark', newVal);
    localStorage.setItem('smak_theme', newVal ? 'dark' : 'light');
  };

  const saveProfiles = (newProfiles: Profile[]) => {
    setProfiles(newProfiles);
    localStorage.setItem('smak_profiles', JSON.stringify(newProfiles));
  };

  const toggleMyList = (id: string) => {
    const newList = myList.includes(id) ? myList.filter(i => i !== id) : [...myList, id];
    setMyList(newList);
    localStorage.setItem('smak_mylist', JSON.stringify(newList));
  };

  const markAsWatched = (item: MediaContent) => {
    const newList = [item.id, ...continueWatching.filter(id => id !== item.id)].slice(0, 10);
    setContinueWatching(newList);
    localStorage.setItem('smak_continue', JSON.stringify(newList));
  };

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length > 2) {
      const titles = ALL_CONTENT.map(c => c.title);
      await searchContent(q, titles); 
    }
  };

  const canWatch = (contentRating: AgeRating) => {
    if (!selectedProfile) return false;
    const profileLevel = RATING_HIERARCHY[selectedProfile.ageLimit] || 1;
    const contentLevel = RATING_HIERARCHY[contentRating] || 1;
    return contentLevel <= profileLevel;
  };

  // Content Filtering Logic
  const featuredItem = SHOWS.find(s => s.id === 's4'); // Break From Apocalypse
  const filteredMovies = MOVIES.filter(m => canWatch(m.rating));
  const filteredShows = SHOWS.filter(s => canWatch(s.rating) && s.id !== 's4');
  const myListContent = ALL_CONTENT.filter(c => myList.includes(c.id) && canWatch(c.rating));
  const cwContent = ALL_CONTENT
    .filter(c => continueWatching.includes(c.id) && canWatch(c.rating))
    .sort((a, b) => continueWatching.indexOf(a.id) - continueWatching.indexOf(b.id));

  if (!selectedProfile) {
    return (
      <ProfileSelector
        profiles={profiles}
        onSelect={setSelectedProfile}
        onAdd={(p) => saveProfiles([...profiles, { ...p, id: Date.now().toString() }])}
        onEdit={(p) => saveProfiles(profiles.map(old => old.id === p.id ? p : old))}
        onDelete={(id) => saveProfiles(profiles.filter(p => p.id !== id))}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <Navbar
        profile={selectedProfile}
        onLogout={() => setSelectedProfile(null)}
        onSearch={handleSearch}
        onNavigate={(s) => {
          const el = document.getElementById(s);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {searchQuery && (
        <div className="pt-24 px-6 md:px-12 min-h-[50vh]">
          <h2 className="text-xl font-black mb-4 uppercase tracking-widest opacity-60">Results for "{searchQuery}"</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {ALL_CONTENT.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) && canWatch(c.rating)).map(c => (
                 <div key={c.id} onClick={() => setExpandedItem(c)} className="aspect-video relative rounded-xl overflow-hidden glass group cursor-pointer border border-white/5 transform transition-transform hover:scale-105 active:scale-95 duration-300">
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="font-black text-xs uppercase tracking-widest text-white">Preview</span>
                    </div>
                 </div>
             ))}
          </div>
        </div>
      )}

      {!searchQuery && (
        <>
          <Hero 
            content={ALL_CONTENT.filter(c => canWatch(c.rating)).slice(0, 5)} 
            onPlay={markAsWatched}
          />

          <div className="relative -mt-16 md:-mt-32 z-40 space-y-6 pb-20">
            {/* Featured Tab - Exclusive to Break From Apocalypse (s4) */}
            {featuredItem && canWatch(featuredItem.rating) && (
              <div id="home" className="animate-fade-in">
                <ContentRow 
                    title="Featured Tab" 
                    items={[featuredItem]} 
                    onShowBumper={(i) => setActiveBumper({ rating: i.rating, text: i.bumperText || '' })} 
                    onExpand={setExpandedItem}
                    onToggleMyList={toggleMyList}
                    isInMyList={(id) => myList.includes(id)}
                  />
              </div>
            )}

            {/* Continue Watching - Dynamically appears on interaction */}
            {cwContent.length > 0 && (
              <div id="continue">
                <ContentRow 
                  title="Continue Watching" 
                  items={cwContent} 
                  onShowBumper={(i) => setActiveBumper({ rating: i.rating, text: i.bumperText || '' })} 
                  onExpand={setExpandedItem}
                  onToggleMyList={toggleMyList}
                  isInMyList={(id) => myList.includes(id)}
                />
              </div>
            )}

            {myListContent.length > 0 && (
              <div id="mylist">
                <ContentRow 
                  title="My List" 
                  items={myListContent} 
                  onShowBumper={(i) => setActiveBumper({ rating: i.rating, text: i.bumperText || '' })} 
                  onExpand={setExpandedItem}
                  onToggleMyList={toggleMyList}
                  isInMyList={(id) => myList.includes(id)}
                />
              </div>
            )}
            
            <div id="movies">
              <ContentRow 
                title="Cinema" 
                items={filteredMovies} 
                onShowBumper={(i) => setActiveBumper({ rating: i.rating, text: i.bumperText || '' })} 
                onExpand={setExpandedItem}
                onToggleMyList={toggleMyList}
                isInMyList={(id) => myList.includes(id)}
              />
            </div>

            <div id="shows">
              <ContentRow 
                title="Original Series" 
                items={filteredShows} 
                onShowBumper={(i) => setActiveBumper({ rating: i.rating, text: i.bumperText || '' })} 
                onExpand={setExpandedItem}
                onToggleMyList={toggleMyList}
                isInMyList={(id) => myList.includes(id)}
              />
            </div>

            {/* Live Section */}
            <div id="live" className="px-6 md:px-12 py-4">
              <h2 className="text-xl font-black mb-4 tracking-tight flex items-center space-x-3 opacity-90 uppercase">
                <span>Live Broadcast</span>
                <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
              </h2>
              <a 
                href={LIVE_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative group aspect-[21/9] md:aspect-[32/9] rounded-3xl overflow-hidden glass border border-white/5 hover:border-red-500/50 transition-all shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/60 via-black/40 to-black z-10" />
                <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 z-20">
                  <div className="space-y-4">
                    <span className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">Live Experience</span>
                    <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">SMAK LIVE TV</h3>
                    <p className="text-gray-300 text-sm md:text-lg max-w-lg font-medium opacity-80">Experience exclusive broadcasts, news, and premium live entertainment streaming now directly from SMAK Enterprises.</p>
                  </div>
                  <div className="hidden md:flex p-10 glass rounded-full group-hover:bg-red-600 transition-all duration-500 text-white transform group-hover:scale-110 shadow-2xl">
                    <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </a>
            </div>

            <div id="about" className={`px-6 md:px-12 py-16 mt-12 rounded-[2.5rem] mx-6 md:mx-12 glass border border-white/5 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px]" />
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter uppercase text-red-600">SMAK<span className={isDarkMode ? 'text-white' : 'text-black'}>SMAK</span></h2>
                  <p className="opacity-70 text-sm md:text-base leading-relaxed max-w-xl font-medium">{ABOUT_TEXT}</p>
                </div>
                <div className="flex flex-col justify-end items-end text-[10px] opacity-40 font-black uppercase tracking-[0.3em] gap-3">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-red-600 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">{CONTACT_EMAIL}</a>
                  <div className="flex space-x-6">
                    <a href="https://www.instagram.com/smaksmakenterprises/" className="hover:text-red-600 transition-all">Instagram</a>
                    <a href="https://www.youtube.com/@smaksmak-enterprises" className="hover:text-red-600 transition-all">YouTube</a>
                  </div>
                  <span>© 2025 SMAKSmak Enterprises</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {expandedItem && (
        <MediaDetail 
          item={expandedItem} 
          onClose={() => setExpandedItem(null)} 
          onToggleMyList={toggleMyList}
          isInMyList={(id) => myList.includes(id)}
          onPlay={markAsWatched}
        />
      )}

      {activeBumper && activeBumper.text && (
        <ContentBumper
          rating={activeBumper.rating}
          description={activeBumper.text}
          isVisible={!!activeBumper}
        />
      )}
    </div>
  );
};

export default App;
