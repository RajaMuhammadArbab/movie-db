'use client';

import { useRef } from 'react';
import Link from 'next/link';
import MovieImage from './MovieImage';
import { getImageUrl } from '@/lib/tmdb';
import styles from './StreamingSection.module.css';

export default function StreamingSection({ movies }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className={styles.section}>
      
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Explore what&apos;s streaming</h2>
        
        <button onClick={scrollToTop} className={styles.backToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.upArrow}>
            <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
          </svg>
          Back to top
        </button>

        <button className={styles.settingsBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.gearIcon}>
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.097.078.16.208.16.336 0 .093-.01.185-.029.274a7.49 7.49 0 000 1.62c.02.088.03.181.03.273 0 .128-.063.258-.16.336l-.84.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.098-.078-.16-.208-.16-.336a7.49 7.49 0 000-1.62c0-.128.062-.258.16-.336l.84-.692a1.875 1.875 0 00.432-2.385l-.923-1.597a1.875 1.875 0 00-2.28-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
          </svg>
          Set your preferred services
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabActive}>PRIME VIDEO</div>
      </div>
      
      <p className={styles.subtitle}>included with Prime</p>

      {/* Slider */}
      <div className={styles.sliderWrapper}>
        <button className={`${styles.navBtn} ${styles.leftBtn}`} onClick={() => scroll('left')}>&#10094;</button>
        
        <div className={styles.cardsScroll} ref={scrollRef}>
          {movies.map(movie => {
            const posterUrl = getImageUrl(movie.poster_path, 'w300');
            return (
              <div key={movie.id} className={styles.card}>
                
                <div className={styles.posterContainer}>
                  <MovieImage
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    sizes="200px"
                    className={styles.posterImg}
                    movieId={movie.id}
                  />
                  {/* Bookmark ribbon */}
                  <div className={styles.bookmarkWrapper}>
                    <svg width="24" height="34" viewBox="0 0 24 34" fill="rgba(0,0,0,0.6)" className={styles.bookmarkRibbon}>
                      <path d="M0 0H24V34L12 28L0 34V0Z" />
                    </svg>
                    <span className={styles.plusIcon}>+</span>
                  </div>
                </div>

                <div className={styles.infoArea}>
                  <div className={styles.ratingRow}>
                    <span className={styles.star}>⭐</span>
                    <span className={styles.score}>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                    <button className={styles.hollowStarBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.hollowStar}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </button>
                  </div>
                  
                  <Link href={`/movie/${movie.id}`} className={styles.movieTitle}>
                    {movie.title}
                  </Link>

                  <div className={styles.actions}>
                    <Link href={`/movie/${movie.id}`} className={styles.watchNowBtn}>
                      Watch now
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.externalIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </Link>
                    
                    <Link href={`/movie/${movie.id}`} className={styles.trailerBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.015c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                      Trailer
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        
        <button className={`${styles.navBtn} ${styles.rightBtn}`} onClick={() => scroll('right')}>&#10095;</button>
      </div>

    </section>
  );
}
