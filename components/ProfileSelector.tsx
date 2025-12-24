
import React, { useState } from 'react';
import { Profile, AgeRating } from '../types';
import { AVATARS } from '../constants';

interface ProfileSelectorProps {
  onSelect: (profile: Profile) => void;
  profiles: Profile[];
  onAdd: (profile: Omit<Profile, 'id'>) => void;
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect, profiles, onAdd, onEdit, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{name: string, avatar: string, ageLimit: AgeRating, pin: string}>({
    name: '',
    avatar: AVATARS[0],
    ageLimit: 'TV-PG',
    pin: ''
  });

  const handleSave = () => {
    if (editingId) {
      onEdit({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', avatar: AVATARS[0], ageLimit: 'TV-PG', pin: '' });
  };

  const startEdit = (p: Profile) => {
    setFormData({ name: p.name, avatar: p.avatar, ageLimit: p.ageLimit, pin: p.pin || '' });
    setEditingId(p.id);
  };

  if (isAdding || editingId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="glass p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl border border-white/10">
          <h2 className="text-3xl font-black text-center tracking-tighter uppercase">{editingId ? 'Edit Profile' : 'Add Profile'}</h2>
          
          <div className="flex flex-wrap justify-center gap-4 py-4 max-h-[200px] overflow-y-auto no-scrollbar">
            {AVATARS.map((url) => (
              <button
                key={url}
                onClick={() => setFormData({...formData, avatar: url})}
                className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all ${formData.avatar === url ? 'border-white scale-110 shadow-lg shadow-white/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={url} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Profile Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/10 rounded-lg p-3 border border-white/20 focus:outline-none focus:border-white transition-all text-white font-bold"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">Age Limit</label>
              <select
                value={formData.ageLimit}
                onChange={(e) => setFormData({...formData, ageLimit: e.target.value as AgeRating})}
                className="w-full bg-white/10 rounded-lg p-3 border border-white/20 focus:outline-none focus:border-white transition-all text-white font-bold"
              >
                <option className="bg-black" value="G">G - General</option>
                <option className="bg-black" value="PG">PG - Parental Guidance</option>
                <option className="bg-black" value="PG-13">PG-13 - Teens</option>
                <option className="bg-black" value="TV-PG">TV-PG - Classic</option>
                <option className="bg-black" value="TV-14">TV-14 - Mature Teens</option>
                <option className="bg-black" value="TV-MA">TV-MA - Mature Audience</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-1 text-gray-400">4-Digit PIN (Optional)</label>
              <input
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData({...formData, pin: e.target.value})}
                className="w-full bg-white/10 rounded-lg p-3 border border-white/20 focus:outline-none focus:border-white transition-all text-white tracking-widest font-bold"
                placeholder="••••"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              className="flex-1 py-3 rounded-lg bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-500/20 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-lg bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all shadow-xl"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Initial Tease / Profile List
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Tease background items */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-red-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="z-10 text-center mb-16 space-y-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-2xl">
          SMAK<span className="text-red-600">SMAK</span>
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Streaming Pakistan's Finest Enterprises</p>
      </div>

      <h2 className="text-2xl md:text-3xl font-black mb-12 text-center tracking-tighter uppercase text-gray-100 z-10">Who's watching?</h2>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 z-10">
        {profiles.map((profile) => (
          <div key={profile.id} className="group flex flex-col items-center space-y-4">
            <div className="relative">
              <button
                onClick={() => onSelect(profile)}
                className="w-24 h-24 md:w-44 md:h-44 rounded-[2rem] overflow-hidden glass hover:border-white transition-all transform hover:scale-105 active:scale-95 duration-500 shadow-2xl"
              >
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover p-3" />
              </button>
              <button 
                onClick={() => startEdit(profile)}
                className="absolute -top-3 -right-3 p-2.5 glass rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>
            <span className="text-gray-500 group-hover:text-white transition-all text-lg font-black uppercase tracking-widest">{profile.name}</span>
          </div>
        ))}

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setIsAdding(true)}
            className="w-24 h-24 md:w-44 md:h-44 rounded-[2rem] glass flex items-center justify-center group hover:bg-white/10 transition-all transform hover:scale-105 border-2 border-dashed border-white/10 hover:border-white/30"
          >
            <svg className="w-16 h-16 text-gray-700 group-hover:text-white transition-all transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </button>
          <span className="text-gray-500 text-lg font-black uppercase tracking-widest">Add Profile</span>
        </div>
      </div>
      
      <button className="z-10 mt-24 px-10 py-3 glass text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] hover:border-white hover:text-white transition-all rounded-full">
        Manage Experiences
      </button>
    </div>
  );
};

export default ProfileSelector;
