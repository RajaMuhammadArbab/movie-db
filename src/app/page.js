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
import FeaturedToday from '@/components/FeaturedToday';
import ScrollRow from '@/components/ScrollRow';
import PosterCard from '@/components/PosterCard';
import PersonCard from '@/components/PersonCard';
import Top10Section from '@/components/Top10Section';
import GenreGrid from '@/components/GenreGrid';
import BoxOfficeList from '@/components/BoxOfficeList';
import TopNews from '@/components/TopNews';
import RecentlyViewed from '@/components/RecentlyViewed';
import ComingSoonTrailers from '@/components/ComingSoonTrailers';
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
  const peopleList    = withFallback(trendingPeople?.results, MOCK_PEOPLE);
  const nowPlayingList= withFallback(nowPlaying?.results, MOCK_MOVIES.slice(2));
  const upcomingList  = withFallback(upcoming?.results, MOCK_MOVIES.slice(4));
  const topRatedList  = withFallback(topRated?.results, [...MOCK_MOVIES].reverse());
  const genreList     = withFallback(genres?.genres, MOCK_GENRES);

  const heroMovies    = trendingList.slice(0, 8);
  const top10         = trendingList.slice(0, 10);
  const fanFavorites  = topRatedList.slice(0, 12);
  const boxOffice     = [...nowPlayingList].sort((a, b) => b.popularity - a.popularity).slice(0, 6);

  const genreMap = {};
  genreList.forEach(g => { genreMap[g.id] = g.name; });

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <HeroCarousel movies={heroMovies} />

      {/* Featured Today */}
      <FeaturedToday movies={trendingList} />

      {/* Main Content Area */}
      <div className={styles.sections}>
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

        <ScrollRow title="Now in Theaters" linkLabel="See all" linkHref="/search?q=now-playing">
          {nowPlayingList.map(movie => (
            <PosterCard key={movie.id} movie={movie} actionLabel="Watch options" />
          ))}
        </ScrollRow>

        <Top10Section movies={top10} genreMap={genreMap} />

        <ScrollRow title="Fan Favorites" linkLabel="See all" linkHref="/search?q=top-rated">
          {fanFavorites.map(movie => (
            <PosterCard key={movie.id} movie={movie} actionLabel="+ Watchlist" />
          ))}
        </ScrollRow>

        <section className={styles.genreSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Popular Interests</h2>
          </div>
          <GenreGrid genres={genreList.slice(0, 8)} />
        </section>

        <BoxOfficeList movies={boxOffice} />

        <ComingSoonTrailers movies={upcomingList} />

        <TopNews movies={trendingList} />
        <RecentlyViewed />
      </div>
    </div>
  );
}
