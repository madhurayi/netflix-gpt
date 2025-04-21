import { useSelector } from 'react-redux';
import { MovieList } from './MovieList';
import { MovieState } from '../utils/movieSlice';

const SecondaryContainer = () => {
  const movies = useSelector((state: { movie?: MovieState }) => state.movie);
  return (
    <div className="z-20 -mt-56 flex w-screen flex-col gap-2 bg-black pl-12">
      <MovieList movieTitle={'Now Playing'} moviesData={movies?.nowPlayingMovies} />
      <MovieList movieTitle={'Popular'} moviesData={movies?.popularMovies} />
    </div>
  );
};

export default SecondaryContainer;
