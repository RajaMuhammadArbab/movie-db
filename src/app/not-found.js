import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.text}>
        We couldn&apos;t find the movie or page you&apos;re looking for.
      </p>
      <Link href="/" className={styles.homeBtn}>← Back to Homepage</Link>
    </div>
  );
}
