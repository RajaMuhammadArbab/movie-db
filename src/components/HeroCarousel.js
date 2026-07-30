'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/tmdb';
import MovieImage from './MovieImage';
import TrailerButton from './TrailerButton'; // we can reuse this if we want, or make a custom play button
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ movies }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const interval = setInterval(goNext, 8000);
    return () => clearInterval(interval);
  }, [goNext]);

  if (!movies || movies.length === 0) return null;

  const activeMovie = movies[activeIndex];
  const backdropUrl = getImageUrl(activeMovie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(activeMovie.poster_path, 'w500');

  // Next 3 movies for "Up next"
  const upNextMovies = [];
  for (let i = 1; i <= 3; i++) {
    upNextMovies.push(movies[(activeIndex + i) % movies.length]);
  }

  return (
    <div className={styles.heroSection}>
      <div className={styles.carouselContainer}>
        
        {/* Left Side: Main Slider */}
        <div className={styles.mainSlider}>
          <div 
            className={styles.sliderTrack} 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {movies.map((movie) => {
              const bgUrl = getImageUrl(movie.backdrop_path, 'w1280');
              const posUrl = getImageUrl(movie.poster_path, 'w500');
              
              return (
                <div key={movie.id} className={styles.slideItem}>
                  <div className={styles.backdrop}>
                    <MovieImage
                      key={`bg-${movie.id}`}
                      src={bgUrl}
                      alt={movie.title}
                      fill
                      priority
                      sizes="100vw"
                      className={styles.backdropImage}
                      movieId={movie.id}
                    />
                    {/* Gradient for text readability at bottom left */}
                    <div className={styles.gradientOverlay} />
                  </div>

                  {/* Bottom Left Content Overlay for this specific slide */}
                  <div className={styles.sliderContent}>
                    <div className={styles.insetPosterWrapper}>
                      <Link href={`/movie/${movie.id}`}>
                        <MovieImage
                          key={`poster-${movie.id}`}
                          src={posUrl}
                          alt={movie.title}
                          fill
                          sizes="200px"
                          className={styles.insetPoster}
                          movieId={movie.id}
                        />
                      </Link>
                    </div>
                    
                    <div className={styles.playGroup}>
                      <Link href={`/movie/${movie.id}`} className={styles.playBtnContainer}>
                        <div className={styles.playIconWrapper}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={styles.playIcon}>
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.015c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className={styles.titleGroup}>
                          <h1 className={styles.movieTitle}>{movie.title}</h1>
                          <p className={styles.subtitle}>Watch the Trailer</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Navigation (Outside Track) */}
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={goPrev} aria-label="Previous movie">&#10094;</button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={goNext} aria-label="Next movie">&#10095;</button>
        </div>

        {/* Right Side: Up Next */}
        <div className={styles.upNextSidebar}>
          <h3 className={styles.upNextHeading}>Up next</h3>
          
          <div className={styles.upNextList}>
            {upNextMovies.map((movie) => {
              const thumbUrl = getImageUrl(movie.poster_path || movie.backdrop_path, 'w300');
              return (
                <div key={movie.id} className={styles.upNextItem}>
                  <div className={styles.upNextThumb}>
                    <MovieImage
                      src={thumbUrl}
                      alt={movie.title}
                      fill
                      sizes="150px"
                      className={styles.upNextImg}
                      movieId={movie.id}
                    />
                  </div>
                  <div className={styles.upNextInfo}>
                    <div className={styles.upNextPlay}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className={styles.smallPlayIcon}>
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                      </svg>
                      <span className={styles.duration}>2:30</span>
                    </div>
                    <Link href={`/movie/${movie.id}`} className={styles.upNextItemTitle}>
                      {movie.title}
                    </Link>
                    <p className={styles.upNextSubtitle}>Watch the Trailer</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.browseTrailers}>
            <Link href="/search?q=trailers">Browse trailers &gt;</Link>
          </div>
        </div>

      </div>

      {/* Bottom Pill Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.pillList}>
          <Link href="/search?q=comic-con" className={styles.pill}>San Diego Comic-Con &gt;</Link>
          <Link href="/search?q=summer" className={styles.pill}>Summer Watch Guide &gt;</Link>
          <Link href="/search?q=emmys" className={styles.pill}>Emmys Nominees &gt;</Link>
          <Link href="/search?q=labs" className={styles.pill}>MDB Labs &gt;</Link>
        </div>
      </div>

    </div>
  );
}
