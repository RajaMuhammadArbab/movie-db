import { searchMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from '@/lib/tmdb';
import PosterCard from '@/components/PosterCard';
import SearchBar from '@/components/SearchBar';
import styles from './page.module.css';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const q = params?.q || '';
  return {
    title: q ? `"${q.replace('-', ' ')}" — Movies | MovieDB` : 'Search Movies | MovieDB',
    description: `Browse ${q.replace('-', ' ')} movies on MovieDB.`,
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  const genre = params?.genre || '';
  const genreName = params?.genre_name || '';
  const page = parseInt(params?.page || '1', 10);

  let results = null;
  let totalPages = 1;
  let totalResults = 0;
  let displayTitle = '';

  if (query) {
    let data;
    if (query === 'top-rated') {
      data = await getTopRatedMovies(page);
      displayTitle = 'Top Rated Movies';
    } else if (query === 'trending') {
      data = await getTrendingMovies('week');
      displayTitle = 'Trending This Week';
    } else if (query === 'upcoming') {
      data = await getUpcomingMovies(page);
      displayTitle = 'Upcoming Movies';
    } else if (query === 'popular') {
      // popular can just route to trending or we can add getPopularMovies
      data = await getTrendingMovies('week');
      displayTitle = 'Most Popular Movies';
    } else {
      data = await searchMovies(query, page);
      displayTitle = `Results for "${query}"`;
    }
    
    results = data?.results || [];
    totalPages = data?.total_pages || 1;
    totalResults = data?.total_results || 0;
  } else if (genre) {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=popularity.desc&page=${page}&language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          accept: 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    results = data?.results || [];
    totalPages = data?.total_pages || 1;
    totalResults = data?.total_results || 0;
    displayTitle = `${genreName} Movies`;
  } else {
    displayTitle = 'Search Movies';
  }

  return (
    <div className={styles.page}>
      
      {/* Search Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.searchWrapper}>
            <SearchBar initialQuery={query && !['top-rated', 'trending', 'upcoming', 'popular'].includes(query) ? query : ''} />
          </div>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Title Bar */}
        <div className={styles.topBar}>
          <h1 className={styles.heading}>{displayTitle}</h1>
          {totalResults > 0 && (
            <span className={styles.count}>{totalResults.toLocaleString()} results</span>
          )}
        </div>

        {/* Mobile search */}
        <div className={styles.mobileSearch}>
          <SearchBar initialQuery={query && !['top-rated', 'trending', 'upcoming', 'popular'].includes(query) ? query : ''} />
        </div>

        {/* Results Grid */}
        {results && results.length > 0 ? (
          <>
            <div className={styles.grid}>
              {results.map(movie => (
                <PosterCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {page > 1 && (
                  <a
                    href={`/search?${query ? `q=${encodeURIComponent(query)}` : `genre=${genre}&genre_name=${encodeURIComponent(genreName)}`}&page=${page - 1}`}
                    className={styles.pageBtn}
                  >
                    ← Prev
                  </a>
                )}
                <span className={styles.pageInfo}>Page {page} of {Math.min(totalPages, 500)}</span>
                {page < totalPages && (
                  <a
                    href={`/search?${query ? `q=${encodeURIComponent(query)}` : `genre=${genre}&genre_name=${encodeURIComponent(genreName)}`}&page=${page + 1}`}
                    className={styles.pageBtn}
                  >
                    Next →
                  </a>
                )}
              </div>
            )}
          </>
        ) : results !== null ? (
          /* No results state */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width:'64px',height:'64px',opacity:0.3}}><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375zm0 4.5h-.375v11.25c0 1.035.84 1.875 1.875 1.875h15c1.035 0 1.875-.84 1.875-1.875V7.5h-.375A3.375 3.375 0 0112 4.5a3.375 3.375 0 01-3.375 3H3.375zM12 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/></svg>
            </div>
            <h2 className={styles.emptyTitle}>No movies found</h2>
            <p className={styles.emptyText}>
              We couldn&apos;t find any movies matching &quot;{query}&quot;. Try a different title or check the spelling.
            </p>
          </div>
        ) : (
          /* Prompt to search */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h2 className={styles.emptyTitle}>Find your next watch</h2>
            <p className={styles.emptyText}>
              Type a movie title in the search bar above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
