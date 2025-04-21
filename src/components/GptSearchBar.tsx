import { useSelector } from 'react-redux';
import { languages } from '../utils/languageConstants';

export const GptSearchBar = () => {
  const lang = useSelector(
    (store: { config: { lang: keyof typeof languages } }) => store.config.lang,
  );
  return (
    <div className="flex justify-center pt-[10%]">
      <form className="grid w-1/2 grid-cols-12 gap-2 bg-black px-4 py-2">
        <input
          className="col-span-9 rounded-sm bg-white px-4 py-2"
          placeholder={languages[lang].gptPlaceholder}
        />
        <button className="col-span-3 rounded-sm bg-red-700 px-4 py-2 text-white">
          {languages[lang].search}
        </button>
      </form>
    </div>
  );
};
