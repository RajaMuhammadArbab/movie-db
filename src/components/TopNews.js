'use client';

import Link from 'next/link';
import styles from './TopNews.module.css';

const MOCK_NEWS_TITLES = [
  {
    id: 1,
    title: "Glen Hansard, Irish Musician and 'Once' Star Who Won Oscar for Best Song, Dies at 56",
    excerpt: 'Glen Hansard, the Irish musician who starred in the 2007 film "Once" and won the best original song Oscar for "Falling Slowly," died on Wednesday in a motorcycle crash. He was 56. According to the BBC, Hansard was killed in a single-vehicle crash in his home city of Dublin on Wednesday morning. The accident was...',
    date: 'Jul 29',
    source: 'Variety Film + TV',
  },
  {
    id: 2,
    title: "Supernatural Reality Competition Korean Series 'House of Fates' Greenlit as 'Battle of Fates' Spinoff at Disney+",
    date: 'Jul 30',
    source: 'Variety - TV News',
  },
  {
    id: 3,
    title: "Matthew Macfadyen and Claire Foy to Lead Adaptation of David Nicholls' 'You Are Here' for BBC and Starz",
    date: 'Jul 30',
    source: 'Variety - TV News',
  },
  {
    id: 4,
    title: "Matthew Macfadyen, Claire Foy to Lead Adaptation of David Nicholls Romance 'You Are Here'",
    date: 'Jul 30',
    source: 'The Hollywood Reporter - Movie News',
  },
  {
    id: 5,
    title: "'Balcanica,' Starring Matilda De Angelis, Picked Up by M-Appeal Ahead of Venice World Premiere (Exclusive)",
    date: 'Jul 30',
    source: 'Variety - Film News',
  },
];

const CATEGORIES = ["Top news", "Celebrity news", "Movie news", "Indie news", "TV news"];

// Use TMDB poster as news thumbnail
function NewsThumbnail({ posterPath, title, large }) {
  const baseUrl = 'https://image.tmdb.org/t/p/';
  const size = large ? 'w185' : 'w92';
  const src = posterPath ? `${baseUrl}${size}${posterPath}` : null;

  if (!src) {
    return (
      <div className={large ? styles.featuredImageWrapper : styles.gridImageWrapper}
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#475569', fontSize: large ? '2rem' : '1.2rem' }}>📰</span>
      </div>
    );
  }

  return (
    <div className={large ? styles.featuredImageWrapper : styles.gridImageWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} className={large ? styles.featuredImage : styles.gridImage} />
    </div>
  );
}

export default function TopNews({ movies = [] }) {
  // Use TMDB movie poster images to populate the news thumbnails
  const posters = movies.map(m => m.poster_path).filter(Boolean);

  const featured = { ...MOCK_NEWS_TITLES[0], posterPath: posters[0] };
  const grid = MOCK_NEWS_TITLES.slice(1).map((n, i) => ({ ...n, posterPath: posters[i + 1] }));
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Top news <span className={styles.arrowIcon}>&gt;</span>
      </h2>

      <div className={styles.newsContainer}>
        
        {/* Column 1: Featured News */}
        <div className={styles.featuredColumn}>
          <NewsThumbnail posterPath={featured.posterPath} title={featured.title} large />
          <div className={styles.featuredContent}>
            <Link href="#" className={styles.featuredTitle}>{featured.title}</Link>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.meta}>
              <span className={styles.date}>{featured.date}</span>
              <span className={styles.source}>{featured.source}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Grid News */}
        <div className={styles.gridColumn}>
          {grid.map(news => (
            <div key={news.id} className={styles.gridItem}>
              <NewsThumbnail posterPath={news.posterPath} title={news.title} />
              <div className={styles.gridContent}>
                <Link href="#" className={styles.gridTitle}>{news.title}</Link>
                <div className={styles.meta}>
                  <span className={styles.date}>{news.date}</span>
                  <span className={styles.source}>{news.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: More News Box */}
        <div className={styles.moreNewsColumn}>
          <div className={styles.moreNewsBox}>
            <h3 className={styles.moreNewsTitle}>MORE NEWS</h3>
            <div className={styles.pillContainer}>
              {CATEGORIES.map(cat => (
                <Link href="#" key={cat} className={styles.newsPill}>
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
