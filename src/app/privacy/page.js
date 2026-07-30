import styles from '../about/page.module.css';

export const metadata = {
  title: 'Privacy Policy | MovieDB',
  description: 'MovieDB Privacy Policy — how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <div className={styles.content}>
          <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
          <h2>Information We Collect</h2>
          <p>
            MovieDB does not require user accounts, registration, or login. We do not collect personal
            information such as names, email addresses, or payment details.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            This site uses the <strong>TMDB API</strong> to retrieve movie data. Your search queries
            are sent to TMDB servers to fetch results. Please review <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">TMDB&apos;s Privacy Policy</a> for details.
          </p>
          <h2>Cookies</h2>
          <p>
            We may use essential session cookies for site functionality. We do not use tracking or
            advertising cookies at this time. Future integration of Google AdSense may introduce
            third-party cookies — this policy will be updated accordingly.
          </p>
          <h2>Contact</h2>
          <p>For privacy-related questions, please visit our <a href="/contact">Contact page</a>.</p>
        </div>
      </div>
    </div>
  );
}
