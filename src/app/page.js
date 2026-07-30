import {
  getTrendingMovies,
  getTrendingPeople,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieGenres,
} from '@/lib/tmdb';
import {
  MOCK_MOVIES,
  MOCK_PEOPLE,
  MOCK_GENRES,
} from '@/lib/mockData';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollRow from '@/components/ScrollRow';
import PosterCard from '@/components/PosterCard';
import PersonCard from '@/components/PersonCard';
import GenreGrid from '@/components/GenreGrid';
import TopNews from '@/components/TopNews';
import RecentlyViewed from '@/components/RecentlyViewed';
import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import styles from './page.module.css';

// Helper: use real data or fall back to mock
function withFallback(data, mockData) {
  return (data && data.length > 0) ? data : mockData;
}

export default async function HomePage() {
  const [
    trendingMovies,
    trendingPeople,
    nowPlaying,
    upcoming,
    topRated,
    genres,
  ] = await Promise.all([
    getTrendingMovies('week'),
    getTrendingPeople('week'),
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getTopRatedMovies(),
    getMovieGenres(),
  ]);

  // Use real data if available, otherwise fall back to mock demo data
  const trendingList  = withFallback(trendingMovies?.results, MOCK_MOVIES);
  const peopleList    = withFallback(
    trendingPeople?.results?.filter(p => p.profile_path && p.known_for_department), 
    MOCK_PEOPLE
  );
  const nowPlayingList= withFallback(nowPlaying?.results, MOCK_MOVIES.slice(2));
  const upcomingList  = withFallback(upcoming?.results, MOCK_MOVIES.slice(4));
  const topRatedList  = withFallback(topRated?.results, [...MOCK_MOVIES].reverse());
  const genreList     = withFallback(genres?.genres, MOCK_GENRES);

  const heroMovies    = trendingList.slice(0, 8);
  const fanFavorites  = topRatedList.slice(0, 12);
  const boxOffice     = [...nowPlayingList].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  const featuredMovie = trendingList[Math.floor(Math.random() * 5)]; // Pick a top movie for spotlight
  const featuredBackdrop = getImageUrl(featuredMovie?.backdrop_path, 'w1280');

  return (
    <div className={styles.page}>
      {/* Hero Banner (Bento Grid) */}
      <HeroCarousel movies={heroMovies} />

      {/* Main Content Area */}
      <div className={styles.sections}>
        
        {/* 1. Spotlight Feature (Cinematic editorial block) */}
        {featuredMovie && (
          <section className={styles.spotlightSection}>
            <div className={styles.spotlightBg}>
              <img src={featuredBackdrop} alt={featuredMovie.title} className={styles.spotlightImg} />
              <div className={styles.spotlightOverlay}></div>
            </div>
            <div className={styles.spotlightContent}>
              <span className={styles.spotlightLabel}>EDITOR'S PICK</span>
              <h2 className={styles.spotlightTitle}>{featuredMovie.title}</h2>
              <p className={styles.spotlightDesc}>{featuredMovie.overview?.substring(0, 150)}...</p>
              <Link href={`/movie/${featuredMovie.id}`} className={styles.spotlightBtn}>
                View Details
              </Link>
            </div>
          </section>
        )}

        {/* 2. The Database Lists: Fan Favorites & Box Office side-by-side */}
        <div className={styles.databaseRow}>
           {/* Column 1: Fan Favorites */}
           <div className={styles.listColumn}>
             <div className={styles.sectionHeader}>
               <span className={styles.yellowBar}></span>
               <h2 className={styles.sectionTitle}>Fan Favorites</h2>
               <Link href="/search?q=top-rated" className={styles.seeAllLink}>See all</Link>
             </div>
             <div className={styles.verticalList}>
               {fanFavorites.slice(0, 5).map((movie, index) => (
                  <div key={movie.id} className={styles.verticalItem}>
                     <div className={styles.rankNum}>{index + 1}</div>
                     <div className={styles.verticalPoster}>
                        <img src={getImageUrl(movie.poster_path, 'w185')} alt={movie.title} />
                     </div>
                     <div className={styles.verticalInfo}>
                        <Link href={`/movie/${movie.id}`} className={styles.verticalTitle}>{movie.title}</Link>
                        <div className={styles.verticalMeta}>
                          <span className={styles.star}>★</span> {movie.vote_average?.toFixed(1)} 
                          <span className={styles.metaDot}>·</span> 
                          {movie.release_date?.substring(0, 4)}
                        </div>
                     </div>
                  </div>
               ))}
             </div>
           </div>

           {/* Column 2: Top Box Office */}
           <div className={styles.listColumn}>
             <div className={styles.sectionHeader}>
               <span className={styles.yellowBar}></span>
               <h2 className={styles.sectionTitle}>Top Box Office</h2>
               <span className={styles.subtitle}>By Popularity</span>
             </div>
             <div className={styles.verticalList}>
               {boxOffice.slice(0, 5).map((movie, index) => (
                  <div key={movie.id} className={styles.verticalItem}>
                     <div className={styles.rankNum}>{index + 1}</div>
                     <div className={styles.verticalPoster}>
                        <img src={getImageUrl(movie.poster_path, 'w185')} alt={movie.title} />
                     </div>
                     <div className={styles.verticalInfo}>
                        <Link href={`/movie/${movie.id}`} className={styles.verticalTitle}>{movie.title}</Link>
                        <div className={styles.verticalMeta}>
                           Pop: {movie.popularity?.toFixed(0)} 
                           <span className={styles.metaDot}>·</span> 
                           {movie.release_date?.substring(0, 4)}
                        </div>
                     </div>
                  </div>
               ))}
             </div>
           </div>
        </div>

        {/* 3. Media Grid for "Now In Theaters" (16:9 Backdrops) */}
        <section className={styles.mediaGridSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.yellowBar}></span>
            <h2 className={styles.sectionTitle}>Now In Theaters</h2>
          </div>
          <div className={styles.mediaGrid}>
            {nowPlayingList.slice(0, 4).map(movie => (
               <Link href={`/movie/${movie.id}`} key={movie.id} className={styles.mediaCard}>
                 <div className={styles.mediaBackdrop}>
                   <img src={getImageUrl(movie.backdrop_path, 'w500')} alt={movie.title} />
                   <div className={styles.playIcon}>
                     <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"></path></svg>
                   </div>
                 </div>
                 <h3 className={styles.mediaTitle}>{movie.title}</h3>
               </Link>
            ))}
          </div>
        </section>

        {/* 4. A few horizontal rows for discovery to balance the layout */}
        <ScrollRow title="Trending This Week" linkLabel="See all" linkHref="/search?q=trending">
          {trendingList.map(movie => (
            <PosterCard key={movie.id} movie={movie} />
          ))}
        </ScrollRow>

        <ScrollRow title="Trending People" linkLabel="See all" linkHref="#">
          {peopleList.map((person, i) => (
            <PersonCard key={person.id} person={person} rank={i + 1} />
          ))}
        </ScrollRow>

        {/* 5. Genres and News */}
        <section className={styles.genreSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.yellowBar}></span>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
          </div>
          <GenreGrid genres={genreList.slice(0, 8)} />
        </section>

        <TopNews movies={trendingList} />
        
        <RecentlyViewed />
      </div>
    </div>
  );
}
