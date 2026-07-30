'use client';

import Link from 'next/link';
import MovieImage from './MovieImage';
import { getImageUrl } from '@/lib/tmdb';
import styles from './FeaturedToday.module.css';

export default function FeaturedToday({ movies }) {
  if (!movies || movies.length < 9) return null;

  // We'll create 3 "Featured" cards, each needing 3 movies for the collage
  const featureConfigs = [
    {
      id: 'feature-1',
      icon: '🖼️',
      badgeText: 'Photos',
      title: 'The Latest Movie and TV Posters',
      linkText: 'See more posters',
      linkHref: '/search?q=posters',
      items: movies.slice(0, 3)
    },
    {
      id: 'feature-2',
      icon: '📋',
      badgeText: 'List',
      title: 'Top Rated Movies to Watch Right Now',
      linkText: 'Check the list',
      linkHref: '/search?q=top-rated',
      items: movies.slice(3, 6)
    },
    {
      id: 'feature-3',
      icon: '📋',
      badgeText: 'List',
      title: 'Staff Picks & Recommendations',
      linkText: 'See our picks',
      linkHref: '/search?q=picks',
      items: movies.slice(6, 9)
    }
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Featured today</h2>
      
      <div className={styles.cardContainer}>
        {featureConfigs.map((feature) => (
          <div key={feature.id} className={styles.card}>
            
            {/* 3-Poster Collage Box */}
            <Link href={feature.linkHref} className={styles.collageLink}>
              <div className={styles.collageBox}>
                
                {/* 3 Images side by side */}
                <div className={styles.imagesRow}>
                  {feature.items.map((movie, idx) => {
                    const posterUrl = getImageUrl(movie.poster_path, 'w300');
                    return (
                      <div key={movie.id || idx} className={styles.posterWrapper}>
                        <MovieImage
                          src={posterUrl}
                          alt={movie.title}
                          fill
                          sizes="150px"
                          className={styles.posterImg}
                          movieId={movie.id}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Gradient and Badge Overlay */}
                <div className={styles.gradientOverlay}>
                  <div className={styles.badge}>
                    <span className={styles.badgeIcon}>{feature.icon}</span>
                    <span className={styles.badgeText}>{feature.badgeText}</span>
                  </div>
                </div>

              </div>
            </Link>

            {/* Bottom Text Area */}
            <div className={styles.textArea}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <Link href={feature.linkHref} className={styles.cardLink}>
                {feature.linkText}
              </Link>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
