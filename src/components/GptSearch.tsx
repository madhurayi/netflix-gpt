import { BG_URL } from '../utils/constants';
import { GptMovieSuggestions } from './GptMovieSuggestions';
import { GptSearchBar } from './GptSearchBar';

export const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10 h-screen w-full">
        <img className="h-screen w-full" src={BG_URL} />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};
