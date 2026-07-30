'use client';

import { useState } from 'react';
import styles from './TrailerPlayer.module.css';

export default function TrailerPlayer({ trailerId, posterUrl, backdropUrl, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const thumbnail = backdropUrl || posterUrl;

  return (
    <>
      {/* Thumbnail with custom play button */}
      <div className={styles.thumbnail} onClick={() => setIsOpen(true)}>
        <img
          src={thumbnail}
          alt={`${title} trailer thumbnail`}
          className={styles.thumbImg}
        />
        <div className={styles.playOverlay}>
          <div className={styles.playBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className={styles.playLabel}>Play Trailer</span>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsOpen(false)}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
                Close
              </button>
              <span className={styles.modalTitle}>{title} — Trailer</span>
            </div>

            {/* Video */}
            <div className={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=1&color=white`}
                title={`${title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
