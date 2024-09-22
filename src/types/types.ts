export interface Movie {
  _id: string;
  title: string;
  description?: string;  // Optional description
  posterImg?: string;    // Optional poster image
  backdropImg?: string;  // Optional backdrop image
  rating?: number;       // Optional rating
  genre?: string[];      // Optional genre array
  duration?: number;     // Optional duration
  createdAt?: string;    // Optional createdAt field
  updatedAt?: string;    // Optional updatedAt field
}

export interface Theatre {
  _id: string;
  name: string;
  location?: string;     // Optional location
  capacity?: number;     // Optional capacity
  createdAt?: string;    // Optional createdAt field
  updatedAt?: string;    // Optional updatedAt field
}

export interface Showtime {
  _id: string;
  time: string;
  createdAt?: string;    // Optional createdAt field
  updatedAt?: string;    // Optional updatedAt field
}

export interface Show {
  _id: string;
  movie: Movie;
  theatres: Theatre[];   // Updated to be an array of theatres
  showtimes: Showtime[]; // Updated to be an array of showtimes
  dates: string[];       // Store multiple dates as an array of ISO strings
}

export interface ShowWithDetails {
  _id: string;
  movie: Movie;
  theatres: Theatre[];   // Updated to be an array of theatres
  showtimes: Showtime[]; // Updated to be an array of showtimes
  dates: string[];       // Multiple dates as ISO strings
}

export interface MovieItem {
  _id: string;
  title: string;
  description: string;
  posterImg: string;
  backdropImg: string;
  rating: number;
  genre: string;
  duration: number;
}
