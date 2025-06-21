import { MovieCard } from './MovieCard';
import './MovieList.css';
export interface MovieListProps {
  movieTitle: string;
  moviesData:
    | {
        overview: string;
        original_title: string;
        id: number;
        poster_path: string;
      }[]
    | undefined;
}
export const MovieList = ({ movieTitle, moviesData }: MovieListProps) => {
  return (
    <div>
      <h1 className="my-2 text-xl font-bold text-white">{movieTitle}</h1>
      <div className="no-scrollbar flex overflow-x-auto">
        {moviesData && moviesData.length > 0 ? (
          <div className="flex gap-2">
            {moviesData?.map((movie, index) => (
              <MovieCard moviePosterPath={movie.poster_path} key={index} />
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
