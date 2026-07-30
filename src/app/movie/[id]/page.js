import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MovieImage from '@/components/MovieImage';
import TrailerButton from '@/components/TrailerButton';
import HistoryTracker from '@/components/HistoryTracker';
import styles from './page.module.css';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return { title: 'Movie Not Found | MovieDB' };
  return {
    title: `${movie.title} (${movie.release_date?.substring(0, 4)}) | MovieDB`,
    description: movie.overview?.substring(0, 160),
  };
}

function formatRuntime(minutes) {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatCurrency(value) {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie || movie.success === false) {
    notFound();
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  const cast = movie.credits?.cast?.slice(0, 15) || [];
  const crew = movie.credits?.crew || [];
  const directors = crew.filter(p => p.job === 'Director');
  const writers = crew.filter(p => p.job === 'Writer' || p.job === 'Screenplay' || p.department === 'Writing').slice(0, 3);
  const producers = crew.filter(p => p.job === 'Producer' || p.job === 'Executive Producer').slice(0, 3);
  const topStars = cast.slice(0, 3);

  const year = movie.release_date?.substring(0, 4) || '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';
  const isReleased = movie.status === 'Released';

  // Find YouTube Trailer
  const videos = movie.videos?.results || [];
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
  const trailerId = trailer?.key;

  return (
    <div className={styles.page}>
      <HistoryTracker movie={{ id: movie.id, title: movie.title, poster_path: movie.poster_path }} />

      {/* Main Container */}
      <div className={styles.container}>

        {/* 1. Title Header Block */}
        <div className={styles.headerBlock}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.metaRow}>
              <span>{year}</span>
              <span className={styles.dot}>·</span>
              <span>{movie.adult ? 'NC-17' : 'PG-13'}</span> {/* Placeholder for age rating */}
              <span className={styles.dot}>·</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
            {movie.original_title && movie.original_title !== movie.title && (
              <p className={styles.originalTitle}>Original title: {movie.original_title}</p>
            )}
          </div>
          
          <div className={styles.ratingArea}>
            <div className={styles.ratingBox}>
              <div className={styles.ratingLabel}>MovieDB RATING</div>
              <div className={styles.ratingValue}>
                <span className={styles.starIcon}>★</span>
                <div className={styles.ratingNumbers}>
                  <span className={styles.score}>{rating}</span><span className={styles.outOf}>/10</span>
                  <div className={styles.voteCount}>{movie.vote_count?.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingLabel}>YOUR RATING</div>
              <div className={styles.ratingValueRate}>
                <span className={styles.starIconEmpty}>☆</span>
                <span className={styles.rateText}>Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Media Block */}
        <div className={styles.mediaBlock}>
          <div className={styles.posterWrapper}>
            <MovieImage
              src={posterUrl}
              alt={`${movie.title} Poster`}
              fill
              sizes="300px"
              className={styles.posterImg}
              movieId={movie.id}
            />
          </div>
          <div className={styles.trailerWrapper}>
            {trailerId ? (
              <iframe
                className={styles.trailerFrame}
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&mute=0&controls=1`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className={styles.noTrailer}>
                <MovieImage
                  src={backdropUrl}
                  alt={movie.title}
                  fill
                  className={styles.noTrailerImg}
                  movieId={movie.id}
                />
                <div className={styles.noTrailerOverlay}>
                  <span>No Trailer Available</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Synopsis & Top Credits */}
        <div className={styles.synopsisBlock}>
          <div className={styles.genres}>
            {movie.genres?.map(g => (
              <Link key={g.id} href={`/search?genre=${g.id}&genre_name=${encodeURIComponent(g.name)}`} className={styles.genrePill}>
                {g.name}
              </Link>
            ))}
          </div>
          
          <p className={styles.overviewText}>{movie.overview}</p>
          
          <div className={styles.topCredits}>
            {directors.length > 0 && (
              <div className={styles.creditRow}>
                <span className={styles.creditLabel}>Director{directors.length > 1 ? 's' : ''}</span>
                <div className={styles.creditLinks}>
                  {directors.map(p => <span key={p.id} className={styles.creditName}>{p.name}</span>)}
                </div>
              </div>
            )}
            {writers.length > 0 && (
              <div className={styles.creditRow}>
                <span className={styles.creditLabel}>Writer{writers.length > 1 ? 's' : ''}</span>
                <div className={styles.creditLinks}>
                  {writers.map(p => <span key={p.id} className={styles.creditName}>{p.name}</span>)}
                </div>
              </div>
            )}
            {topStars.length > 0 && (
              <div className={styles.creditRow}>
                <span className={styles.creditLabel}>Stars</span>
                <div className={styles.creditLinks}>
                  {topStars.map(p => <span key={p.id} className={styles.creditName}>{p.name}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Top Cast List */}
        {cast.length > 0 && (
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Top cast</h2>
            </div>
            <div className={styles.castGrid}>
              {cast.map(person => {
                const photoUrl = getImageUrl(person.profile_path, 'w185');
                return (
                  <div key={`${person.id}-${person.character}`} className={styles.castCard}>
                    <div className={styles.castPhotoWrapper}>
                      <MovieImage
                        src={photoUrl}
                        alt={person.name}
                        fill
                        sizes="100px"
                        className={styles.castPhoto}
                        movieId={person.id}
                        aspectRatio="1/1"
                      />
                    </div>
                    <div className={styles.castInfo}>
                      <p className={styles.castName}>{person.name}</p>
                      <p className={styles.castCharacter}>{person.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Detailed Database Section */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Details</h2>
          </div>
          <div className={styles.detailsList}>
            <DetailItem label="Release date" value={movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'} />
            <DetailItem label="Countries of origin" value={movie.production_countries?.map(c => c.name).join(', ') || 'N/A'} />
            <DetailItem label="Official languages" value={movie.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A'} />
            <DetailItem label="Also known as" value={movie.original_title || 'N/A'} />
            <DetailItem label="Production companies" value={movie.production_companies?.map(c => c.name).join(', ') || 'N/A'} />
            <DetailItem label="MovieDB ID" value={movie.id} />
          </div>
        </div>

        {/* 6. Box Office */}
        {(movie.budget > 0 || movie.revenue > 0) && (
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Box office</h2>
            </div>
            <div className={styles.detailsList}>
              {movie.budget > 0 && <DetailItem label="Budget" value={formatCurrency(movie.budget)} />}
              {movie.revenue > 0 && <DetailItem label="Gross worldwide" value={formatCurrency(movie.revenue)} />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className={styles.detailListItem}>
      <span className={styles.detailListLabel}>{label}</span>
      <span className={styles.detailListValue}>{value}</span>
    </div>
  );
}
