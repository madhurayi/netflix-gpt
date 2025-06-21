import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector(
    (state: {
      movie?: { nowPlayingMovies?: { overview: string; original_title: string; id: number }[] };
    }) => state.movie?.nowPlayingMovies,
  );

  if (!movies) return null;
  const mainMovie = movies.length > 0 ? movies[0] : null;
  const { overview, original_title, id } = mainMovie || {};

  return (
    <div className="overflow-x-hidden">
      <VideoTitle overview={overview || ''} original_title={original_title || ''} />
      {id && <VideoBackground movieId={id || 0} />}
    </div>
  );
};

export default MainContainer;
