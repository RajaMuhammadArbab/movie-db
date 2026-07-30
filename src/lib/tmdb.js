const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_TOKEN = process.env.TMDB_ACCESS_TOKEN;

async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Append language if not specified
  if (!params.language) {
    url.searchParams.append('language', 'en-US');
  }

  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    // We can utilize Next.js cache for some endpoints like configuration or genres
    // but for most data, let's revalidate every hour
    next: { revalidate: 3600 } 
  };

  try {
    const res = await fetch(url.toString(), options);
    if (!res.ok) {
      throw new Error(`Failed to fetch from TMDB: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('TMDB API Error:', error);
    return null;
  }
}

// Get Image Configuration (Base URLs, Sizes)
export async function getConfiguration() {
  return await fetchFromTMDB('/configuration');
}

// Get Genres mapping
export async function getMovieGenres() {
  return await fetchFromTMDB('/genre/movie/list');
}

// Get Trending Movies (Day or Week)
export async function getTrendingMovies(timeWindow = 'week') {
  return await fetchFromTMDB(`/trending/movie/${timeWindow}`);
}

// Get Trending People
export async function getTrendingPeople(timeWindow = 'week') {
  return await fetchFromTMDB(`/trending/person/${timeWindow}`);
}

// Get Now Playing Movies (Current)
export async function getNowPlayingMovies(page = 1) {
  return await fetchFromTMDB('/movie/now_playing', { page });
}

// Get Upcoming Movies
export async function getUpcomingMovies(page = 1) {
  return await fetchFromTMDB('/movie/upcoming', { page });
}

// Get Top Rated Movies (Fan Favorites)
export async function getTopRatedMovies(page = 1) {
  return await fetchFromTMDB('/movie/top_rated', { page });
}

// Search Movies by Title
export async function searchMovies(query, page = 1) {
  if (!query) return null;
  return await fetchFromTMDB('/search/movie', { query, page });
}

// Get Movie Details with Credits, Videos, and Recommendations
export async function getMovieDetails(id) {
  return await fetchFromTMDB(`/movie/${id}`, { append_to_response: 'credits,videos,recommendations' });
}

// Get Movie Images (Posters, Backdrops)
export async function getMovieImages(id) {
  return await fetchFromTMDB(`/movie/${id}/images`, {
    // Images endpoint sometimes requires omitting the language parameter 
    // to get textless posters or international posters.
    language: 'null' 
  });
}

// Helper function to build full image URL
export function getImageUrl(path, size = 'original') {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  // Usually the base url is "https://image.tmdb.org/t/p/"
  // The 'size' can be 'w500', 'w780', 'w1280', 'original', etc.
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
