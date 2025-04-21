import { Header } from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainCOntainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import { GptSearch } from './GPTSearch';
import { useSelector } from 'react-redux';

export const Browse = () => {
  const gptSearch = useSelector(
    (store: { gpt: { showGptSearch: boolean } }) => store.gpt.showGptSearch,
  );
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};
