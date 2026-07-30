import Link from 'next/link';
import SearchBar from './SearchBar';
import MegaMenu from './MegaMenu';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Logo & Menu */}
        <div className={styles.leftGroup}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoBox}>
              <span className={styles.logoText}>MDB</span>
            </div>
          </Link>
          <MegaMenu />
        </div>

        {/* Full-width Search */}
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        {/* Right Nav */}
        <nav className={styles.nav}>
          <Link href="/search?q=trending" className={styles.navLink}>Trending</Link>
          <Link href="/search?q=top-rated" className={styles.navLink}>Top Rated</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/search?q=upcoming" className={`${styles.navLink} ${styles.navCta}`}>
            Upcoming
          </Link>
        </nav>

      </div>
    </header>
  );
}
