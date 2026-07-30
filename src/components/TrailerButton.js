'use client';

import { useState } from 'react';
import styles from './TrailerButton.module.css';

export default function TrailerButton({ trailerId }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailerId) return null;

  return (
    <>
      <button 
        className={styles.playBtn} 
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.icon}>▶</span> Watch Trailer
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
            <div className={styles.iframeContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
