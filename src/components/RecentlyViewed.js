'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MovieImage from './MovieImage';
import { getImageUrl } from '@/lib/tmdb';
import styles from './RecentlyViewed.module.css';

export default function RecentlyViewed() {
  const [history, setHistory] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem('imdb_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem('imdb_history');
    setHistory([]);
  };

  // Only render on client to avoid hydration mismatch, and only if there is history
  if (!isClient || history.length === 0) return null;

  return (
    <section className={styles.section}>
      
      <div className={styles.header}>
        <h2 className={styles.title}>Recently viewed</h2>
        <button onClick={clearAll} className={styles.clearBtn}>Clear all</button>
      </div>

      <div className={styles.sliderContainer}>
        {history.map((movie) => {
          const posterUrl = getImageUrl(movie.poster_path, 'w300');
          return (
            <div key={movie.id} className={styles.card}>
              <div className={styles.posterContainer}>
                <MovieImage
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="150px"
                  className={styles.posterImg}
                  movieId={movie.id}
                />
                <div className={styles.bookmarkWrapper}>
                  <svg width="24" height="34" viewBox="0 0 24 34" fill="rgba(0,0,0,0.6)" className={styles.bookmarkRibbon}>
                    <path d="M0 0H24V34L12 28L0 34V0Z" />
                  </svg>
                  <span className={styles.plusIcon}>+</span>
                </div>
              </div>
              <Link href={`/movie/${movie.id}`} className={styles.movieTitle}>
                {movie.title}
              </Link>
            </div>
          );
        })}
      </div>

    </section>
  );
}
