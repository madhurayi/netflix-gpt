import { onAuthStateChanged, signOut } from 'firebase/auth';
import NetflixLogo from '../assets/NetflixLogo.png';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearch } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { setLang } from '../utils/configSlice';

interface RootState {
  user: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
  };
}

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const gptSearch = useSelector(
    (store: { gpt: { showGptSearch: boolean } }) => store.gpt.showGptSearch,
  );
  const handleButtonClick = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL: photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLang(e.target.value));
  };

  return (
    <div className="absolute z-10 flex w-screen justify-between bg-gradient-to-b from-black px-8 py-2">
      <img className="w-44 font-extrabold" src={NetflixLogo} />
      {user && (
        <div className="flex items-center gap-2">
          {gptSearch && (
            <select className="bg-white px-2 py-1" onChange={handleLangChange}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="cursor-pointer rounded-xl bg-red-900 px-4 py-2 text-white"
            onClick={handleGptSearchClick}
          >
            {gptSearch ? 'Home' : 'GPT Search'}
          </button>
          <img alt="user-logo" src={user.photoURL} className="h-10 w-10 rounded-2xl" />
          <button className="cursor-pointer font-bold text-white" onClick={handleButtonClick}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
