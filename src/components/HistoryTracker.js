'use client';

import { useEffect } from 'react';

export default function HistoryTracker({ movie }) {
  useEffect(() => {
    if (!movie || !movie.id) return;

    try {
      const stored = localStorage.getItem('imdb_history');
      let history = stored ? JSON.parse(stored) : [];
      
      // Remove if it already exists to move it to the front
      history = history.filter(m => m.id !== movie.id);
      
      // Add to front
      history.unshift({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      });

      // Keep only last 15 items
      if (history.length > 15) {
        history = history.slice(0, 15);
      }

      localStorage.setItem('imdb_history', JSON.stringify(history));
    } catch (e) {
      console.error("Could not save to history", e);
    }
  }, [movie]);

  return null; // Invisible component
}
