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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375zm0 4.5h-.375v11.25c0 1.035.84 1.875 1.875 1.875h15c1.035 0 1.875-.84 1.875-1.875V7.5h-.375A3.375 3.375 0 0112 4.5a3.375 3.375 0 01-3.375 3H3.375zM12 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/></svg> Movies
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path d="M19.5 6h-15v9h15V6zm-3.75-1.5h-7.5a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5zM3.375 16.5a.375.375 0 000 .75h17.25a.375.375 0 000-.75H3.375zM6 19.5a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75A.75.75 0 016 19.5z"/></svg> TV shows
                </h3>
                <ul className={styles.list}>
                  <li><Link href="/search?q=tv" onClick={closeMenu}>What's on TV & streaming</Link></li>
                  <li><Link href="/search?q=tv-top" onClick={closeMenu}>Top 250 TV shows</Link></li>
                  <li><Link href="/search?q=tv-popular" onClick={closeMenu}>Most popular TV shows</Link></li>
                  <li><Link href="/search?genre=10759" onClick={closeMenu}>Browse TV shows by genre</Link></li>
                  <li><Link href="/search?q=tv-news" onClick={closeMenu}>TV news</Link></li>
                </ul>

                <h3 className={styles.colTitle} style={{ marginTop: '30px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 20.015c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd"/></svg> Watch
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"/></svg> Awards & events
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
