'use client';

import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import MovieImage from './MovieImage';
import styles from './PosterCard.module.css';

export default function PosterCard({ movie, showYear = true, actionLabel = 'Details' }) {
  if (!movie) return null;

  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movie.id}`} className={styles.imageLink}>
        <MovieImage
          src={posterUrl}
          alt={`${movie.title} poster`}
          fill
          sizes="(max-width: 768px) 150px, 200px"
          className={styles.poster}
          movieId={movie.id}
        />
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span>{rating}</span>
          </div>
          {showYear && <span className={styles.year}>{year}</span>}
        </div>

        <h3 className={styles.title} title={movie.title}>
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>

        <Link href={`/movie/${movie.id}`} className={styles.actionBtn}>
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
