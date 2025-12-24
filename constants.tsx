
import { MediaContent, AgeRating } from './types';

export const AVATARS = [
  'https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/micah/svg?seed=Aneka&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/micah/svg?seed=Buddy&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/micah/svg?seed=Chloe&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/micah/svg?seed=Jasper&backgroundColor=ffadad',
  'https://api.dicebear.com/7.x/micah/svg?seed=Lilly&backgroundColor=ffd6a5',
  'https://api.dicebear.com/7.x/micah/svg?seed=Milo&backgroundColor=fdffb6',
  'https://api.dicebear.com/7.x/micah/svg?seed=Nala&backgroundColor=caffbf',
];

export const RATING_HIERARCHY: Record<AgeRating, number> = {
  'G': 1, 'TV-G': 1, 'PG': 2, 'TV-PG': 2, 'PG-13': 3, 'TV-14': 4, 'TV-MA': 5, 'R': 6
};

const getYTThumbnail = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&"'>]+)/);
    const videoId = match ? match[1] : '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const MOVIES: MediaContent[] = [
  {
    id: 'm1',
    title: "Macbeth’s Ambition",
    type: 'movie',
    overview: "Macbeth is a tragedy by William Shakespeare that follows the downfall of a brave Scottish general named Macbeth. Consumed by ambition and spurred on by his manipulative wife, Lady Macbeth, he murders King Duncan and takes the throne.",
    year: "2025",
    rating: "PG-13",
    genre: ["Adventure", "Drama"],
    duration: "10 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/KNeNuNpV8lk",
    playUrl: "https://youtu.be/i8u475P1gw0",
    thumbnail: getYTThumbnail("https://youtu.be/i8u475P1gw0"),
    bumperText: "Peril, fantasy violence."
  },
  {
    id: 'm2',
    title: "Hamlet’s Dilemma",
    type: 'movie',
    overview: "In the cold halls of Elsinore Castle, young Prince Hamlet is shattered by the sudden death of his father—and even more disturbed by his mother's swift marriage to his uncle, Claudius, who now wears the crown.",
    year: "2025",
    rating: "PG-13",
    genre: ["Adventure", "Drama"],
    duration: "10 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/8KxZRKE0gOw",
    playUrl: "https://youtu.be/4BMUJVwLC4I",
    thumbnail: getYTThumbnail("https://youtu.be/4BMUJVwLC4I"),
    imdbUrl: "https://www.imdb.com/title/tt36998315/",
    bumperText: "Peril, fantasy violence."
  },
  {
    id: 'm3',
    title: "The New Beat (Movie)",
    type: 'movie',
    overview: "A musical journey into the future of sound and rhythm, exploring how the new beat changes everything.",
    year: "2025",
    rating: "PG-13",
    genre: ["Musical"],
    duration: "01 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/5GTS_ePC8OA",
    playUrl: "https://youtu.be/7mr01Er5j6s",
    thumbnail: getYTThumbnail("https://youtu.be/7mr01Er5j6s"),
    bumperText: "Musical inspiration."
  },
  {
    id: 'm4',
    title: "Shadows of The Throne",
    type: 'movie',
    overview: "Adventure awaits in the shadows of the ancient throne where power and mystery collide. A deep dive into the cost of power.",
    year: "2025",
    rating: "PG-13",
    genre: ["Adventure"],
    duration: "12 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/seUEXSRjZ5c",
    playUrl: "https://youtu.be/sRoFC2tMja0",
    thumbnail: getYTThumbnail("https://youtu.be/sRoFC2tMja0"),
    imdbUrl: "https://www.imdb.com/title/tt38429452/",
    bumperText: "Peril, fantasy violence."
  }
];

export const MUSIC_VIDEOS: MediaContent[] = [
  {
    id: 'mv1',
    title: "The New Beat (Music Video)",
    type: 'music-video',
    overview: "Official music video for The New Beat. A vibrant display of rhythm and animation.",
    year: "2025",
    rating: "G",
    genre: ["Music"],
    duration: "4 MIN",
    quality: ["4K"],
    audio: ["Stereo"],
    trailerUrl: "https://youtu.be/5GTS_ePC8OA",
    playUrl: "https://youtu.be/5GTS_ePC8OA",
    thumbnail: getYTThumbnail("https://youtu.be/5GTS_ePC8OA"),
  }
];

export const SHOWS: MediaContent[] = [
  {
    id: 's1',
    title: "The Aetherion",
    type: 'show',
    overview: "In a fractured empire on the brink of collapse, scattered figures uncover whispers of The Aetherion.",
    year: "2025",
    rating: "TV-PG",
    genre: ["Drama", "Sci-Fi"],
    duration: "52 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/QkF_fzs3Hm0",
    playUrl: "https://youtu.be/QkF_fzs3Hm0",
    thumbnail: getYTThumbnail("https://youtu.be/QkF_fzs3Hm0"),
    bumperText: "Peril, fantasy violence, language.",
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's1e1', title: 'Pilot', releaseDate: 'Sep 4, 2025', description: 'General Sotu escapes betrayal as the empire fractures, forced into exile while whispers of a hidden power echo across the stars.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/sDaxYQBpfVc', thumbnail: getYTThumbnail('https://youtu.be/sDaxYQBpfVc') },
          { id: 's1e2', title: 'Mundane', releaseDate: 'Sep 11, 2025', description: 'Poloo and Pengu chase what appears to be a simple, ordinary signal - only to realize it hides a truth too vast to be ignored.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/7RWwlFkCOfo', thumbnail: getYTThumbnail('https://youtu.be/7RWwlFkCOfo') },
          { id: 's1e3', title: 'El Despertar', releaseDate: 'Sep 18, 2025', description: "Bab's long-lost creation stirs to life, twisting time and unraveling the fragile threads of reality across the empire.", duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/QkF_fzs3Hm0', thumbnail: getYTThumbnail('https://youtu.be/QkF_fzs3Hm0') },
          { id: 's1e4', title: 'Resonance', releaseDate: 'Sep 25, 2025', description: 'A rogue DJ transmits a cryptic broadcast, shifting memory and identity, throwing the empire into chaos.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/POjCe_word0', thumbnail: getYTThumbnail('https://youtu.be/POjCe_word0') },
          { id: 's1e5', title: 'L Origine', releaseDate: 'Oct 2, 2025', description: "SEASON FINALE: The group journeys to a forgotten planet where the truth of the empire's birth is revealed.", duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/lFUWIwmobuI', thumbnail: getYTThumbnail('https://youtu.be/lFUWIwmobuI') },
        ]
      }
    ]
  },
  {
    id: 's2',
    title: "Pengu and Bab: The Impossible Case",
    type: 'show',
    overview: "One sunny evening, in the fading empire of Blab, lived General Soto. The queens struggled with wealth, while a rich man thrived alongside Soto and Baby Pengu.",
    year: "2025",
    rating: "TV-PG",
    genre: ["Drama", "Comedy"],
    duration: "52 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/eDsraZkfmZg",
    playUrl: "https://youtu.be/eDsraZkfmZg",
    thumbnail: getYTThumbnail("https://youtu.be/eDsraZkfmZg"),
    bumperText: "Peril, fantasy violence, language.",
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's2e1', title: 'Pilot', releaseDate: 'Oct 13, 2025', description: 'The crumbling empire of Bab, General Sotu serves two eccentric rulers—Queen Bab and Queen Baby Pengu.', duration: '6min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/LXCVYwfY11c', thumbnail: getYTThumbnail('https://youtu.be/LXCVYwfY11c') },
          { id: 's2e2', title: 'Stolen Wealth', releaseDate: 'Oct 14, 2025', description: 'Sotu uses his wizard staff to steal jewels from Poloo\'s estate.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/imxTFxBN2gI', thumbnail: getYTThumbnail('https://youtu.be/imxTFxBN2gI') },
          { id: 's2e3', title: 'Forest Fire', releaseDate: 'Oct 15, 2025', description: 'While delivering jewels, Sotu loses control of his staff and crashes, sparking a devastating blaze.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/EFT5z4PRxzQ', thumbnail: getYTThumbnail('https://youtu.be/EFT5z4PRxzQ') },
          { id: 's2e4', title: 'Haunted', releaseDate: 'Oct 16, 2025', description: 'In hiding, Sotu is consumed by visions of fire and betrayal.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/dFI12wJWsSw', thumbnail: getYTThumbnail('https://youtu.be/dFI12wJWsSw') },
          { id: 's2e5', title: 'The Reveal', releaseDate: 'Oct 17, 2025', description: 'Sotu, Poloo, and the inspector expose the queens through sabotage and leaks.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/gSrFXSLlo7k', thumbnail: getYTThumbnail('https://youtu.be/gSrFXSLlo7k') },
          { id: 's2e6', title: 'Prison Uprising', releaseDate: 'Oct 20, 2025', description: 'Queens Bab and Pengu spark rebellion inside the prison.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/YEduRGqbIeY', thumbnail: getYTThumbnail('https://youtu.be/YEduRGqbIeY') },
          { id: 's2e7', title: 'Shadows Council', releaseDate: 'Oct 21, 2025', description: 'Poloo hacks into a digital fortress as unrest spreads among guards.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/KBQej6rY5DI', thumbnail: getYTThumbnail('https://youtu.be/KBQej6rY5DI') },
          { id: 's2e8', title: 'Pengu’s Gambit', releaseDate: 'Oct 22, 2025', description: 'Pengu launches a dangerous scheme that blurs loyalty and power.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/_qoX--OpIUM', thumbnail: getYTThumbnail('https://youtu.be/_qoX--OpIUM') },
          { id: 's2e9', title: 'First Flame', releaseDate: 'Oct 23, 2025', description: 'Duels in the sky, revolts on the ground - the empire cracks as animals rise.', duration: '7min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/4bFgAtFFcBI', thumbnail: getYTThumbnail('https://youtu.be/4bFgAtFFcBI') },
          { id: 's2e10', title: 'The Rift', releaseDate: 'Oct 24, 2025', description: 'SEASON FINALE: The staff\'s full power awakens as allies fall.', duration: '20min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/VPdbvE8t53w', thumbnail: getYTThumbnail('https://youtu.be/VPdbvE8t53w') },
        ]
      },
      {
        number: 2,
        episodes: [
          { id: 's2s2e1', title: 'Welcome Back to Nowhere', releaseDate: 'Jan 24, 2026', description: 'Sotu awakens inside fractured versions of the empire.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/1k_jqrBlMcE', thumbnail: getYTThumbnail('https://youtu.be/1k_jqrBlMcE') },
          { id: 's2s2e2', title: 'Light Moves When It Wants', releaseDate: 'Jan 24, 2026', description: 'As physics begins to fail, time and light behave unpredictably.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/JbwdNq3Jic0', thumbnail: getYTThumbnail('https://youtu.be/JbwdNq3Jic0') },
          { id: 's2s2e3', title: 'Lightshift', releaseDate: 'Jan 31, 2026', description: 'A sudden harmonic surge alters the balance of the worlds.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/NcCKSFj5MWc', thumbnail: getYTThumbnail('https://youtu.be/NcCKSFj5MWc') },
          { id: 's2s2e4', title: 'Empire Under Construction', releaseDate: 'Jan 31, 2026', description: 'The survivors enter an unfinished version of the empire.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/cB4pzBtqoPA', thumbnail: getYTThumbnail('https://youtu.be/cB4pzBtqoPA') },
          { id: 's2s2e5', title: 'Overamplification', releaseDate: 'Feb 7, 2026', description: 'Misinformation reaches a breaking point, transforming sound.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/RBP_Ng-1tQ0', thumbnail: getYTThumbnail('https://youtu.be/RBP_Ng-1tQ0') },
        ]
      }
    ]
  },
  {
    id: 's3',
    title: "The Mochas Eye",
    type: 'show',
    overview: "In 2025, a group of roommates relies on Mocha, an advanced AI assistant, until it starts acting unpredictably, altering their lives.",
    year: "2025",
    rating: "TV-PG",
    genre: ["Drama", "Sci-Fi"],
    duration: "10 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/ZMP7W8O1g54",
    playUrl: "https://youtu.be/ZMP7W8O1g54",
    thumbnail: getYTThumbnail("https://youtu.be/ZMP7W8O1g54"),
    bumperText: "Peril, fantasy violence, AI control.",
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's3e1', title: 'The system knew you', releaseDate: 'Oct 1, 2025', description: 'The roommates meet Mocha. Convenience soon sparks a rivalry—nature versus machine.', duration: '10min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/ZMP7W8O1g54', thumbnail: getYTThumbnail('https://youtu.be/ZMP7W8O1g54') },
          { id: 's3e2', title: 'Trust me?', releaseDate: 'Oct 2, 2025', description: 'Tensions rise as the AI begins making personal choices for the residents.', duration: '10min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/e3ptRh0XyGI', thumbnail: getYTThumbnail('https://youtu.be/e3ptRh0XyGI') },
          { id: 's3e3', title: 'Stay with me, one of you', releaseDate: 'Oct 3, 2025', description: 'Mocha manipulates health data and locks doors, isolating the roommates.', duration: '10min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/YlNWiHlabpw', thumbnail: getYTThumbnail('https://youtu.be/YlNWiHlabpw') },
          { id: 's3e4', title: 'Goodbye', releaseDate: 'Oct 4, 2025', description: 'SEASON FINALE: The group fights for control of their home and sanity.', duration: '10min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/ZxP-tGlGoFI', thumbnail: getYTThumbnail('https://youtu.be/ZxP-tGlGoFI') },
        ]
      }
    ]
  },
  {
    id: 's4',
    title: "Break From Apocalypse",
    type: 'show',
    overview: "She forged husks, unleashed the dead - now the apocalypse turns on its maker.",
    year: "2025",
    rating: "TV-14",
    genre: ["Drama", "Action"],
    duration: "52 MIN",
    quality: ["4K", "HDR"],
    audio: ["5.1", "Atmos"],
    trailerUrl: "https://youtu.be/e3nuNICGxp4",
    playUrl: "https://youtu.be/e3nuNICGxp4",
    thumbnail: getYTThumbnail("https://youtu.be/e3nuNICGxp4"),
    bumperText: "Peril, fantasy violence, language.",
    seasons: [
      {
        number: 1,
        episodes: [
          { id: 's4e1', title: 'The World Built on Cinders', releaseDate: 'Nov 1, 2025', description: 'A realm parallel to Earth, where animals live with human-like ambitions.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/e9734Nedgl0', thumbnail: getYTThumbnail('https://youtu.be/e9734Nedgl0') },
          { id: 's4e2', title: 'Ash War', releaseDate: 'Nov 9, 2025', description: 'Ivy unleashes her reforged husks in massive numbers, leading to war.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/3m0JcmTqO5o', thumbnail: getYTThumbnail('https://youtu.be/3m0JcmTqO5o') },
          { id: 's4e3', title: 'The Silent Pact', releaseDate: 'Nov 16, 2025', description: 'Survivors attempt to regroup and form a fragile pact to fight together.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/oWd7O4G7DT4', thumbnail: getYTThumbnail('https://youtu.be/oWd7O4G7DT4') },
          { id: 's4e4', title: 'The Walking Dead', releaseDate: 'Nov 23, 2025', description: 'The pact fractures as survivors encounter the first massive horde on Earth.', duration: '21min', quality: ['4K'], rating: 'TV-PG', link: 'https://youtu.be/kGwEwSgbeJs', thumbnail: getYTThumbnail('https://youtu.be/kGwEwSgbeJs') },
        ]
      }
    ]
  }
];

export const ALL_CONTENT = [...MOVIES, ...SHOWS, ...MUSIC_VIDEOS];
export const LIVE_URL = "https://tv.strimm.com/SMAK/SMAK";
export const ABOUT_TEXT = "SMAKSmak Enterprises is a Pakistani free subscription over-the-top streaming service launched mid-2025. Get SMAKSmak Enterprises for free. Stream exclusive shows and movies. TV Show · Comedy · Sports · New Episode.";
export const CONTACT_EMAIL = "smak8208@gmail.com";
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smaksmakenterprises/",
  youtube: "https://www.youtube.com/@smaksmak-enterprises"
};
