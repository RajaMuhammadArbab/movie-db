'use client';

import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import MovieImage from './MovieImage';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ movies }) {
  if (!movies || movies.length < 3) return null;

  // Take top 3 movies for the bento grid
  const mainMovie = movies[0];
  const sideMovie1 = movies[1];
  const sideMovie2 = movies[2];

  const renderPlayIcon = (className) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.015c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={styles.heroSection}>
      <div className={styles.bentoGrid}>
        
        {/* Main Large Feature */}
        <Link href={`/movie/${mainMovie.id}`} className={`${styles.bentoItem} ${styles.mainFeature}`}>
          <MovieImage
            src={getImageUrl(mainMovie.backdrop_path, 'w1280')}
            alt={mainMovie.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 65vw"
            className={styles.bentoImage}
            movieId={mainMovie.id}
          />
          <div className={styles.gradientOverlay} />
          
          <div className={styles.contentOverlay}>
            <div className={styles.playIconWrapperLarge}>
              {renderPlayIcon(styles.playIconLarge)}
            </div>
            <div className={styles.textGroup}>
              <h1 className={styles.titleLarge}>{mainMovie.title}</h1>
              <p className={styles.subtitle}>Watch the Trailer</p>
            </div>
          </div>
        </Link>

        {/* Side Stack */}
        <div className={styles.sideStack}>
          
          {/* Top Right Feature */}
          <Link href={`/movie/${sideMovie1.id}`} className={`${styles.bentoItem} ${styles.sideFeature}`}>
            <MovieImage
              src={getImageUrl(sideMovie1.backdrop_path, 'w780')}
              alt={sideMovie1.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 35vw"
              className={styles.bentoImage}
              movieId={sideMovie1.id}
            />
            <div className={styles.gradientOverlay} />
            <div className={styles.contentOverlay}>
              <div className={styles.playIconWrapperSmall}>
                {renderPlayIcon(styles.playIconSmall)}
              </div>
              <div className={styles.textGroup}>
                <h2 className={styles.titleSmall}>{sideMovie1.title}</h2>
              </div>
            </div>
          </Link>

          {/* Bottom Right Feature */}
          <Link href={`/movie/${sideMovie2.id}`} className={`${styles.bentoItem} ${styles.sideFeature}`}>
            <MovieImage
              src={getImageUrl(sideMovie2.backdrop_path, 'w780')}
              alt={sideMovie2.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 35vw"
              className={styles.bentoImage}
              movieId={sideMovie2.id}
            />
            <div className={styles.gradientOverlay} />
            <div className={styles.contentOverlay}>
              <div className={styles.playIconWrapperSmall}>
                {renderPlayIcon(styles.playIconSmall)}
              </div>
              <div className={styles.textGroup}>
                <h2 className={styles.titleSmall}>{sideMovie2.title}</h2>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
