import styles from './BoxOfficeList.module.css';
import Link from 'next/link';

function formatNum(n) {
  if (!n) return 'N/A';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

export default function BoxOfficeList({ movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Box Office <span className={styles.arrow}>&gt;</span></h2>
        <span className={styles.sub}>By popularity this week</span>
      </div>
      <div className={styles.grid}>
        {movies.map((movie, i) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className={styles.item}>
            <span className={styles.rank}>{i + 1}</span>
            <div className={styles.info}>
              <p className={styles.movieTitle}>{movie.title}</p>
              <p className={styles.meta}>
                <span className={styles.star}>★</span> {movie.vote_average?.toFixed(1)} &nbsp;·&nbsp;
                {movie.release_date?.substring(0, 4)}
              </p>
            </div>
            <div className={styles.numbers}>
              <p className={styles.pop}>Popularity</p>
              <p className={styles.popNum}>{Math.round(movie.popularity).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
