import Link from 'next/link';
import styles from './GenreGrid.module.css';

const GENRE_THEMES = {
  28:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20action%20movie%20explosion%20scene?width=600&height=300&nologo=true', overlay: 'rgba(127,29,29,0.4)', icon: '💥', label: 'Action' },
  12:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20adventure%20movie%20jungle%20ruins?width=600&height=300&nologo=true', overlay: 'rgba(6,78,59,0.4)', icon: '🗺️', label: 'Adventure' },
  16:    { imageUrl: 'https://image.pollinations.ai/prompt/3d%20animated%20movie%20colorful%20fantasy%20world?width=600&height=300&nologo=true', overlay: 'rgba(120,53,15,0.4)', icon: '🎨', label: 'Animation' },
  35:    { imageUrl: 'https://image.pollinations.ai/prompt/comedy%20movie%20cheerful%20bright%20party?width=600&height=300&nologo=true', overlay: 'rgba(113,63,18,0.4)', icon: '😂', label: 'Comedy' },
  80:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20crime%20movie%20detective%20dark%20alley%20rain?width=600&height=300&nologo=true', overlay: 'rgba(30,27,75,0.5)', icon: '🕵️', label: 'Crime' },
  99:    { imageUrl: 'https://image.pollinations.ai/prompt/documentary%20nature%20wildlife%20camera?width=600&height=300&nologo=true', overlay: 'rgba(12,74,110,0.4)', icon: '🎥', label: 'Documentary' },
  18:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20drama%20movie%20emotional%20rainy%20window?width=600&height=300&nologo=true', overlay: 'rgba(30,58,138,0.4)', icon: '🎭', label: 'Drama' },
  10751: { imageUrl: 'https://image.pollinations.ai/prompt/family%20movie%20happy%20kids%20playing?width=600&height=300&nologo=true', overlay: 'rgba(20,83,45,0.4)', icon: '👨‍👩‍👧', label: 'Family' },
  14:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20fantasy%20movie%20magic%20castle%20dragons?width=600&height=300&nologo=true', overlay: 'rgba(74,4,78,0.4)', icon: '🧙', label: 'Fantasy' },
  27:    { imageUrl: 'https://image.pollinations.ai/prompt/cinematic%20horror%20movie%20scary%20dark%20haunted%20house?width=600&height=300&nologo=true', overlay: 'rgba(28,10,0,0.5)', icon: '👻', label: 'Horror' },
  9648:  { imageUrl: 'https://image.pollinations.ai/prompt/mystery%20movie%20magnifying%20glass%20clues?width=600&height=300&nologo=true', overlay: 'rgba(31,41,55,0.5)', icon: '🔍', label: 'Mystery' },
  10749: { imageUrl: 'https://image.pollinations.ai/prompt/romance%20movie%20couple%20sunset%20silhouette?width=600&height=300&nologo=true', overlay: 'rgba(131,24,67,0.4)', icon: '❤️', label: 'Romance' },
  878:   { imageUrl: 'https://image.pollinations.ai/prompt/sci-fi%20movie%20futuristic%20neon%20city%20spaceships?width=600&height=300&nologo=true', overlay: 'rgba(15,23,42,0.5)', icon: '🚀', label: 'Sci-Fi' },
  53:    { imageUrl: 'https://image.pollinations.ai/prompt/thriller%20movie%20suspenseful%20shadows?width=600&height=300&nologo=true', overlay: 'rgba(24,24,27,0.5)', icon: '⚡', label: 'Thriller' },
  37:    { imageUrl: 'https://image.pollinations.ai/prompt/western%20movie%20cowboy%20desert%20sunset?width=600&height=300&nologo=true', overlay: 'rgba(67,20,7,0.4)', icon: '🤠', label: 'Western' },
};

const DEFAULT = { imageUrl: 'https://image.pollinations.ai/prompt/movie%20theater%20screen%20popcorn?width=600&height=300&nologo=true', overlay: 'rgba(30,41,59,0.5)', icon: '🎬' };

export default function GenreGrid({ genres }) {
  return (
    <div className={styles.grid}>
      {genres.map(genre => {
        const theme = GENRE_THEMES[genre.id] || DEFAULT;
        
        return (
          <Link
            key={genre.id}
            href={`/search?genre=${genre.id}&genre_name=${encodeURIComponent(genre.name)}`}
            className={styles.tile}
            style={{
              backgroundImage: `url(${theme.imageUrl})`,
            }}
          >
            {/* Color overlay */}
            <div className={styles.overlay} style={{ background: theme.overlay }} />

            {/* Shine sweep */}
            <div className={styles.shine} />


            {/* Label + arrow bottom-left */}
            <div className={styles.bottom}>
              <span className={styles.name}>{genre.name}</span>
              <span className={styles.arrow}>→</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
