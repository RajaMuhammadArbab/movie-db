'use client';

import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import styles from './ComingSoonTrailers.module.css';

function TrailerCard({ movie }) {
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780');
  const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
  const releaseLabel = releaseDate
    ? releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
    : 'COMING SOON';

  const popularity = movie.popularity ? Math.round(movie.popularity) : 0;
  const votes = movie.vote_count || 0;

  return (
    <div className={styles.card}>
      {/* Backdrop with play button */}
      <Link href={`/movie/${movie.id}`} className={styles.backdropWrapper}>
        {backdropUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={backdropUrl} alt={movie.title} className={styles.backdropImg} />
        ) : (
          <div className={styles.backdropPlaceholder} />
        )}
        {/* Play button overlay */}
        <div className={styles.playOverlay}>
          <div className={styles.playCircle}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className={styles.duration}>2:23</span>
        </div>
      </Link>

      {/* Card Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.footerLeft}>
          <button className={styles.plusBtn}>+</button>
          <div className={styles.movieMeta}>
            <span className={styles.releaseDate}>{releaseLabel}</span>
            <Link href={`/movie/${movie.id}`} className={styles.movieTitle}>{movie.title}</Link>
          </div>
        </div>
        <div className={styles.reactions}>
          <span className={styles.reaction}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.reactionIcon} style={{ color: '#60a5fa' }}>
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
            {popularity}
          </span>
          <span className={styles.reaction}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.reactionIcon} style={{ color: '#f87171' }}>
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {votes}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ComingSoonTrailers({ movies = [] }) {
  if (!movies || movies.length === 0) return null;

  const displayMovies = movies.slice(0, 8);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Coming soon to theaters <span className={styles.arrow}>&gt;</span>
        </h2>
        <p className={styles.subtitle}>Trailers for upcoming releases</p>
      </div>

      <div className={styles.sliderWrapper}>
        {/* Left arrow */}
        <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={e => {
          e.currentTarget.parentElement.querySelector(`.${styles.cardsScroll}`).scrollBy({ left: -900, behavior: 'smooth' });
        }}>&#10094;</button>

        <div className={styles.cardsScroll}>
          {displayMovies.map(movie => (
            <TrailerCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right arrow */}
        <button className={`${styles.navBtn} ${styles.navRight}`} onClick={e => {
          e.currentTarget.parentElement.querySelector(`.${styles.cardsScroll}`).scrollBy({ left: 900, behavior: 'smooth' });
        }}>&#10095;</button>
      </div>
    </section>
  );
}
