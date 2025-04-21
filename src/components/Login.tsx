import { useRef, useState } from 'react';
import { Header } from './Header';
import { checkValidation } from '../utils/validate';
import { useRegExValidations } from '../hooks/useRegExValidations';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, PHOTO_URL } from '../utils/constants';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkEmail, checkPassword } = useRegExValidations();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  const handleSubmit = () => {
    const isEmailValid = checkEmail(email.current?.value || '');
    const isPasswordValid = checkPassword(password.current?.value || '');
    if (!isEmailValid) {
      setErrorMessage('Email is not valid');
      return;
    }
    if (!isPasswordValid) {
      setErrorMessage('Password is not valid');
      return;
    }
    if (!isSignInForm) {
      if (email.current && password.current) {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name?.current?.value || '',
              photoURL: PHOTO_URL,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser || {};

                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  }),
                );
                navigate('/browse');
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });

            navigate('/browse');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + '-' + errorMessage);
          });
      }
      const errorMessage = checkValidation({
        email: email.current?.value || '',
        password: password.current?.value || '',
      });
      setErrorMessage(errorMessage);
    } else {
      if (email.current && password.current) {
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate('/browse');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + '-' + errorMessage);
          });
      }
    }
  };
  return (
    <div className="bg-black">
      <Header />
      <div className="absolute h-screen w-full">
        <img className="h-screen w-full" src={BG_URL} />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute right-0 left-0 mx-auto my-36 w-sm rounded-sm bg-black p-12 opacity-80"
      >
        <label className="my-4 py-4 text-3xl font-extrabold text-white">
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </label>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-4 w-full rounded-sm border-[1px] border-gray-400 p-2 text-gray-50"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="my-4 w-full rounded-sm border-[1px] border-gray-400 p-2 text-gray-50"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="my-4 w-full rounded-sm border-[1px] border-gray-400 p-2 text-gray-50"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button className="my-6 w-full rounded-sm bg-red-700 p-2 text-white" onClick={handleSubmit}>
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </button>
        <p className="text-gray-300">
          {isSignInForm ? 'New to Netflix?' : 'Already registered'}{' '}
          <span
            className="cursor-pointer font-bold text-white"
            role="button"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? 'Sign up now.' : 'Sign in now.'}
          </span>
        </p>
      </form>
    </div>
  );
};
