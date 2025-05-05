import { useSelector } from 'react-redux';
import { languages } from '../utils/languageConstants';
import { useRef } from 'react';
import openai from '../utils/openai';

export const GptSearchBar = () => {
  const lang = useSelector(
    (store: { config: { lang: keyof typeof languages } }) => store.config.lang,
  );
  const searchText = useRef<HTMLInputElement>(null);

  const handleGptSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchText?.current?.value);
    const gptQuery =
      'Act as a movie recommendation system and suggest some movies for the query: ' +
      searchText?.current?.value +
      '. Ongly give me names of 5 movies, comma separated like the example given ahead. Example Result: Magadheera, vikramarkudu, bahubali';
    const gptResults = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: gptQuery }],
    });
    console.log('gpt', gptResults.choices);
  };

  return (
    <div className="flex justify-center pt-[10%]">
      <form className="grid w-1/2 grid-cols-12 gap-2 bg-black px-4 py-2" onSubmit={handleGptSearch}>
        <input
          ref={searchText}
          className="col-span-9 rounded-sm bg-white px-4 py-2"
          placeholder={languages[lang].gptPlaceholder}
        />
        <button className="col-span-3 rounded-sm bg-red-700 px-4 py-2 text-white" type="submit">
          {languages[lang].search}
        </button>
      </form>
    </div>
  );
};
