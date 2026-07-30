import styles from './page.module.css';

export const metadata = {
  title: 'About Us | MovieDB',
  description: 'Learn about MovieDB — a premium movie database powered by TMDB.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.heading}>About MovieDB</h1>
        <div className={styles.content}>
          <p>
            <strong>MovieDB</strong> is a modern, open movie database that lets anyone discover films,
            explore cast &amp; crew, and find detailed information about any movie — no login required.
          </p>
          <p>
            We believe great cinema should be accessible to everyone. Our platform is powered by the
            free and official <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">TMDB API</a>,
            giving you up-to-date information on thousands of movies across all genres, eras, and languages.
          </p>
          <h2>What We Offer</h2>
          <ul>
            <li>Search any movie by title instantly</li>
            <li>Full cast and crew breakdowns</li>
            <li>Ratings, vote counts, and runtime</li>
            <li>Languages, countries, and production info</li>
            <li>High-quality poster and backdrop images</li>
          </ul>
          <h2>Data Source</h2>
          <p>
            All movie data is provided by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>.
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </div>
  );
}
