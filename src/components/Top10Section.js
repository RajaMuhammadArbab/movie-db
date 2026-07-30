import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import MovieImage from './MovieImage';
import styles from './Top10Section.module.css';

export default function Top10Section({ movies, genreMap }) {
  if (!movies || movies.length === 0) return null;

  const top3 = movies.slice(0, 3);
  const rest = movies.slice(3, 10);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top 10 This Week <span className={styles.arrow}>&gt;</span></h2>
      </div>

      {/* Top 3 — large cards */}
      <div className={styles.top3Grid}>
        {top3.map((movie, i) => {
          const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');
          const genres = movie.genre_ids?.slice(0, 2).map(id => genreMap[id]).filter(Boolean).join(', ');
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.bigCard}>
              <div className={styles.bigCardImage}>
                <MovieImage
                  src={backdropUrl}
                  alt={movie.title}
                  fill
                  sizes="400px"
                  className={styles.img}
                  movieId={movie.id}
                  aspectRatio="16/10"
                />
                <div className={styles.bigCardOverlay} />
                <span className={styles.bigRank}>#{i + 1}</span>
                <div className={styles.bigCardContent}>
                  <h3 className={styles.bigTitle}>{movie.title}</h3>
                  <p className={styles.bigGenre}>{genres}</p>
                  <p className={styles.bigSynopsis}>
                    {movie.overview?.substring(0, 100)}{movie.overview?.length > 100 ? '...' : ''}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* #4–10 — small poster row */}
      <div className={styles.restRow}>
        {rest.map((movie, i) => {
          const posterUrl = getImageUrl(movie.poster_path, 'w185');
          return (
            <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.smallCard}>
              <span className={styles.smallRank}>#{i + 4}</span>
              <div className={styles.smallPoster}>
                <MovieImage
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="80px"
                  className={styles.img}
                  movieId={movie.id}
                />
              </div>
              <p className={styles.smallTitle}>{movie.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
