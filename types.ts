
export type AgeRating = 'G' | 'PG' | 'PG-13' | 'TV-G' | 'TV-PG' | 'TV-14' | 'TV-MA' | 'R';

export interface Profile {
  id: string;
  name: string;
  avatar: string; // URL or ID for SVG
  ageLimit: AgeRating;
  pin?: string;
}

export interface Episode {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  duration: string;
  quality: string[];
  rating: AgeRating;
  link: string;
  thumbnail: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface MediaContent {
  id: string;
  title: string;
  type: 'movie' | 'show' | 'music-video';
  overview: string;
  year: string;
  rating: AgeRating;
  genre: string[];
  duration: string;
  quality: string[];
  audio: string[];
  trailerUrl: string;
  playUrl: string;
  thumbnail: string;
  seasons?: Season[];
  bumperText?: string;
  imdbUrl?: string;
  tmdbUrl?: string;
  plexUrl?: string;
}

export interface UserMetric {
  profileId: string;
  contentId: string;
  lastWatchedAt: string;
  progress: number; // percentage
}
