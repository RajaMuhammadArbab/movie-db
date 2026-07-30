'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './MegaMenu.module.css';

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
        <span className={styles.hamburger}>≡</span> Menu
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.container}>
            {/* Header of Mega Menu */}
            <div className={styles.header}>
              <Link href="/" className={styles.logo} onClick={closeMenu}>
                <div className={styles.logoBox}>MDB</div>
              </Link>
              <button className={styles.closeBtn} onClick={closeMenu}>✕</button>
            </div>

            {/* Menu Content Grid */}
            <div className={styles.grid}>
              
              <div className={styles.column}>
                <h3 className={styles.colTitle}>
                  <span className={styles.icon}>🎞️</span> Movies
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=release" onClick={closeMenu}>Release calendar</Link></li>
                  <li><Link href="/search?q=top-rated" onClick={closeMenu}>Top 250 movies</Link></li>
                  <li><Link href="/search?q=popular" onClick={closeMenu}>Most popular movies</Link></li>
                  <li><Link href="/search?genre=28" onClick={closeMenu}>Browse movies by genre</Link></li>
                  <li><Link href="/search?q=box-office" onClick={closeMenu}>Top box office</Link></li>
                  <li><Link href="/search?q=showtimes" onClick={closeMenu}>Showtimes & tickets</Link></li>
                  <li><Link href="/search?q=news" onClick={closeMenu}>Movie news</Link></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3 className={styles.colTitle}>
                  <span className={styles.icon}>📺</span> TV shows
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=tv" onClick={closeMenu}>What's on TV & streaming</Link></li>
                  <li><Link href="/search?q=tv-top" onClick={closeMenu}>Top 250 TV shows</Link></li>
                  <li><Link href="/search?q=tv-popular" onClick={closeMenu}>Most popular TV shows</Link></li>
                  <li><Link href="/search?genre=10759" onClick={closeMenu}>Browse TV shows by genre</Link></li>
                  <li><Link href="/search?q=tv-news" onClick={closeMenu}>TV news</Link></li>
                </ul>

                <h3 className={styles.colTitle} style={{ marginTop: '30px' }}>
                  <span className={styles.icon}>▶️</span> Watch
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=watch" onClick={closeMenu}>What to watch</Link></li>
                  <li><Link href="/search?q=trailers" onClick={closeMenu}>Latest trailers</Link></li>
                  <li><Link href="/search?q=originals" onClick={closeMenu}>MDB Originals</Link></li>
                  <li><Link href="/search?q=picks" onClick={closeMenu}>MDB Picks</Link></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3 className={styles.colTitle}>
                  <span className={styles.icon}>⭐</span> Awards & events
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=oscars" onClick={closeMenu}>Oscars</Link></li>
                  <li><Link href="/search?q=emmys" onClick={closeMenu}>Primetime Emmys</Link></li>
                  <li><Link href="/search?q=comic-con" onClick={closeMenu}>San Diego Comic-Con</Link></li>
                  <li><Link href="/search?q=summer" onClick={closeMenu}>Summer Watch Guide</Link></li>
                  <li><Link href="/search?q=anticipated" onClick={closeMenu}>Most Anticipated This Month</Link></li>
                  <li><Link href="/search?q=festivals" onClick={closeMenu}>Festival Central</Link></li>
                  <li><Link href="/search?q=events" onClick={closeMenu}>All events</Link></li>
                </ul>
              </div>

              <div className={styles.column}>
                <h3 className={styles.colTitle}>
                  <span className={styles.icon}>👥</span> Celebs
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=born-today" onClick={closeMenu}>Born today</Link></li>
                  <li><Link href="/search?q=trending" onClick={closeMenu}>Trending people</Link></li>
                  <li><Link href="/search?q=celeb-news" onClick={closeMenu}>Celebrity news</Link></li>
                </ul>

                <h3 className={styles.colTitle} style={{ marginTop: '30px' }}>
                  <span className={styles.icon}>🌍</span> Community
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=help" onClick={closeMenu}>Help center</Link></li>
                  <li><Link href="/search?q=contributor" onClick={closeMenu}>Contributor zone</Link></li>
                  <li><Link href="/search?q=polls" onClick={closeMenu}>Polls</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
