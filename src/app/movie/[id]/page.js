import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MovieImage from '@/components/MovieImage';
import PosterCard from '@/components/PosterCard';
import PersonCard from '@/components/PersonCard';
import ScrollRow from '@/components/ScrollRow';
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
  const recommendations = movie.recommendations?.results?.slice(0, 15) || [];
  
  const year = movie.release_date?.substring(0, 4) || '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'NR';

  // Find YouTube Trailer
  const videos = movie.videos?.results || [];
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
  const trailerId = trailer?.key;

  return (
    <div className={styles.page}>
      <HistoryTracker movie={{ id: movie.id, title: movie.title, poster_path: movie.poster_path }} />

      {/* Main Container */}
      <div className={styles.container}>

        {/* Home / Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.homeLink}>
            <span className={styles.backArrow}>&lt;</span> Home
          </Link>
        </div>

        {/* HERO SECTION: Video Player + Dark Info Panel */}
        <div className={styles.heroLayout}>
          
          {/* Left: Huge Video Player */}
          <div className={styles.videoArea}>
            {trailerId ? (
              <iframe
                className={styles.trailerFrame}
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=0&fs=1&color=white&playsinline=1`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

          {/* Right: Dark Info Panel */}
          <div className={styles.infoPanel}>
            
            {/* Top half: Poster + Title */}
            <div className={styles.panelHeader}>
              <div className={styles.miniPosterWrapper}>
                <MovieImage
                  src={posterUrl}
                  alt={`${movie.title} Poster`}
                  fill
                  sizes="120px"
                  className={styles.miniPoster}
                  movieId={movie.id}
                />
              </div>
              <div className={styles.headerText}>
                <h1 className={styles.title}>{movie.title} <span className={styles.year}>({year})</span> <span className={styles.arrowIcon}>&gt;</span></h1>
                <div className={styles.genres}>
                  {movie.genres?.slice(0, 3).map(g => (
                    <span key={g.id} className={styles.genreText}>{g.name}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom half: Overview */}
            <div className={styles.panelBody}>
              <h2 className={styles.trailerTitle}>{movie.title} | {trailer ? trailer.name : 'Overview'}</h2>
              <p className={styles.overviewText}>{movie.overview}</p>
            </div>

          </div>
        </div>

        {/* Content Below Hero (Rows similar to Featured Videos) */}
        <div className={styles.contentRows}>
          
          {/* Top Cast (Horizontal Scroll) */}
          {cast.length > 0 && (
            <div className={styles.rowWrapper}>
              <ScrollRow title="Top Cast" linkLabel="See all" linkHref="#">
                {cast.map((person, i) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </ScrollRow>
            </div>
          )}

          {/* Similar Movies (Horizontal Scroll) */}
          {recommendations.length > 0 && (
            <div className={styles.rowWrapper}>
              <ScrollRow title="Related Movies" linkLabel="See all" linkHref="#">
                {recommendations.map(movie => (
                  <PosterCard key={movie.id} movie={movie} />
                ))}
              </ScrollRow>
            </div>
          )}

        </div>

        {/* Detailed Database Section */}
        <div className={styles.detailsContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.yellowBar}></span>
            <h2 className={styles.sectionTitle}>Details</h2>
          </div>
          <div className={styles.detailsList}>
            <DetailItem label="Release date" value={movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'} />
            <DetailItem label="Runtime" value={formatRuntime(movie.runtime)} />
            <DetailItem label="Countries of origin" value={movie.production_countries?.map(c => c.name).join(', ') || 'N/A'} />
            <DetailItem label="Official languages" value={movie.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A'} />
            <DetailItem label="Also known as" value={movie.original_title || 'N/A'} />
            <DetailItem label="Production companies" value={movie.production_companies?.map(c => c.name).join(', ') || 'N/A'} />
            {movie.budget > 0 && <DetailItem label="Budget" value={formatCurrency(movie.budget)} />}
            {movie.revenue > 0 && <DetailItem label="Gross worldwide" value={formatCurrency(movie.revenue)} />}
            <DetailItem label="MovieDB ID" value={movie.id} />
          </div>
        </div>

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
