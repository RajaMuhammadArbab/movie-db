'use client';

import { useState } from 'react';
import { getImageUrl } from '@/lib/tmdb';
import MovieImage from './MovieImage';
import styles from './PersonCard.module.css';

export default function PersonCard({ person, rank }) {
  const photoUrl = getImageUrl(person.profile_path, 'w185');

  return (
    <div className={styles.card}>
      {rank && <span className={styles.rank}>#{rank}</span>}
      <div className={styles.avatarWrapper}>
        <MovieImage
          src={photoUrl}
          alt={person.name}
          fill
          sizes="100px"
          className={styles.avatar}
          movieId={person.id}
          aspectRatio="1/1"
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{person.name}</p>
        <p className={styles.role}>{person.known_for_department}</p>
      </div>
    </div>
  );
}
