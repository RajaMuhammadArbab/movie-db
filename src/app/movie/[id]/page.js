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

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie || movie.success === false) {
    notFound();
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');

  const cast = movie.credits?.cast?.slice(0, 16) || [];
  const crew = movie.credits?.crew || [];
  const directors = crew.filter(p => p.job === 'Director');
  const writers = crew.filter(p => p.job === 'Writer' || p.job === 'Screenplay' || p.department === 'Writing').slice(0, 4);
  const producers = crew.filter(p => p.job === 'Producer' || p.job === 'Executive Producer').slice(0, 4);

  const year = movie.release_date?.substring(0, 4) || '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  // Find YouTube Trailer
  const videos = movie.videos?.results || [];
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
  const trailerId = trailer?.key;

  return (
    <div className={styles.page}>
      <HistoryTracker movie={{ id: movie.id, title: movie.title, poster_path: movie.poster_path }} />

      {/* Backdrop Banner */}
      <div className={styles.backdrop}>
        <MovieImage
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className={styles.backdropImg}
          movieId={movie.id}
          aspectRatio="16/9"
        />
        <div className={styles.backdropOverlay} />
      </div>

      {/* Main Content */}
      <div className={`container ${styles.mainContent}`}>

        {/* Poster + Core Info */}
        <div className={styles.hero}>
          <div className={styles.posterWrapper}>
            <MovieImage
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              sizes="300px"
              className={styles.poster}
              movieId={movie.id}
            />
          </div>

          <div className={styles.coreInfo}>
            <div className={styles.badges}>
              {movie.genres?.map(g => (
                <Link key={g.id} href={`/search?genre=${g.id}&genre_name=${encodeURIComponent(g.name)}`} className={styles.genreBadge}>
                  {g.name}
                </Link>
              ))}
            </div>

            <h1 className={styles.title}>{movie.title}</h1>

            {movie.original_title && movie.original_title !== movie.title && (
              <p className={styles.originalTitle}>Original title: {movie.original_title}</p>
            )}

            <div className={styles.metaRow}>
              <span className={styles.ratingBig}>
                <span className={styles.star}>★</span>
                {rating}
                <span className={styles.voteCount}>/ 10 ({movie.vote_count?.toLocaleString()} votes)</span>
              </span>
              <span className={styles.metaDot}>·</span>
              <span>{year}</span>
              <span className={styles.metaDot}>·</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>

            <p className={styles.overview}>{movie.overview}</p>

            <TrailerButton trailerId={trailerId} />
          </div>
        </div>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Production Info</h2>
            <div className={styles.detailRows}>
              <DetailRow label="Release Date" value={movie.release_date || 'N/A'} />
              <DetailRow label="Runtime" value={formatRuntime(movie.runtime)} />
              <DetailRow label="Original Language" value={movie.original_language?.toUpperCase() || 'N/A'} />
              <DetailRow label="Spoken Languages" value={movie.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A'} />
              <DetailRow label="Countries" value={movie.production_countries?.map(c => c.name).join(', ') || 'N/A'} />
              <DetailRow label="Status" value={movie.status || 'N/A'} />
              {movie.budget > 0 && <DetailRow label="Budget" value={`$${movie.budget?.toLocaleString()}`} />}
              {movie.revenue > 0 && <DetailRow label="Revenue" value={`$${movie.revenue?.toLocaleString()}`} />}
            </div>
          </section>

          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Crew</h2>
            <div className={styles.detailRows}>
              {directors.length > 0 && <DetailRow label="Director(s)" value={directors.map(p => p.name).join(', ')} />}
              {writers.length > 0 && <DetailRow label="Writer(s)" value={writers.map(p => p.name).join(', ')} />}
              {producers.length > 0 && <DetailRow label="Producer(s)" value={producers.map(p => p.name).join(', ')} />}
            </div>
          </section>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <section className={styles.castSection}>
            <h2 className={styles.sectionHeading}>Cast</h2>
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
          </section>
        )}

        {/* Production Companies */}
        {movie.production_companies?.length > 0 && (
          <section className={styles.companiesSection}>
            <h2 className={styles.sectionHeading}>Production Companies</h2>
            <div className={styles.companiesList}>
              {movie.production_companies.map(company => (
                <div key={company.id} className={styles.companyChip}>
                  {company.logo_path && (
                    <div style={{ position: 'relative', width: 48, height: 24 }}>
                      <MovieImage
                        src={getImageUrl(company.logo_path, 'w92')}
                        alt={company.name}
                        fill
                        sizes="48px"
                        className={styles.companyLogo}
                        movieId={company.id}
                        aspectRatio="2/1"
                      />
                    </div>
                  )}
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  );
}
