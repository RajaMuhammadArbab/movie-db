'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MovieImage.module.css';

// Cinematic gradient palette cycling per movie ID
const GRADIENTS = [
  ['#0f0c29', '#302b63', '#24243e'],
  ['#1a1a2e', '#16213e', '#0f3460'],
  ['#200122', '#6f0000', '#200122'],
  ['#0d0d0d', '#1a0533', '#0d0d0d'],
  ['#000428', '#004e92', '#000428'],
  ['#0f2027', '#203a43', '#2c5364'],
  ['#1a0000', '#3b0000', '#1a0000'],
  ['#0a0a0a', '#1a3a2a', '#0a0a0a'],
];

function getGradient(id) {
  const i = Math.abs(id || 0) % GRADIENTS.length;
  const [c1, c2, c3] = GRADIENTS[i];
  return `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;
}

export default function MovieImage({ src, alt, fill, sizes, priority, className, movieId }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={styles.placeholder} style={{ background: getGradient(movieId) }}>
        <div className={styles.particles}>
          <span className={styles.p1} />
          <span className={styles.p2} />
          <span className={styles.p3} />
        </div>
        <span className={styles.icon}>🎬</span>
        <span className={styles.label}>
          {alt?.replace(' poster', '').replace(' backdrop', '') || 'Movie'}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || ''}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setError(true)}
    />
  );
}
