'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './ScrollRow.module.css';

export default function ScrollRow({ title, linkLabel, linkHref, children }) {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // If we hit the end, smooth scroll back to the start
      if (direction === 'right') {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }
  };

  // Auto-scroll every 4 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      scroll('right');
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      className={styles.section}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title} <span className={styles.arrowIcon}>&gt;</span>
        </h2>
        {linkLabel && linkHref && (
          <a href={linkHref} className={styles.link}>
            {linkLabel}
          </a>
        )}
      </div>

      <div className={styles.rowContainer}>
        <button 
          className={`${styles.scrollBtn} ${styles.leftBtn}`} 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          &#10094;
        </button>
        
        <div className={styles.scrollArea} ref={scrollRef}>
          {children}
        </div>

        <button 
          className={`${styles.scrollBtn} ${styles.rightBtn}`} 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}
