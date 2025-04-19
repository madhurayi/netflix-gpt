import { useRef, useState } from "react";
import { Header } from "./Header";
import { checkValidation } from "../utils/validate";
import { useRegExValidations } from "../hooks/useRegExValidations";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO_URL } from "../utils/constants";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkEmail, checkPassword } = useRegExValidations();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  const handleSubmit = () => {
    const isEmailValid = checkEmail(email.current?.value || "");
    const isPasswordValid = checkPassword(password.current?.value || "");
    if (!isEmailValid) {
      setErrorMessage("Email is not valid");
      return;
    }
    if (!isPasswordValid) {
      setErrorMessage("Password is not valid");
      return;
    }
    if (!isSignInForm) {
      if (email.current && password.current) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name?.current?.value || "",
              photoURL: PHOTO_URL,
            })
              .then(() => {
                const { uid, email, displayName, photoURL } =
                  auth.currentUser || {};

                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
                navigate("/browse");
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });

            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
      const errorMessage = checkValidation({
        email: email.current?.value || "",
        password: password.current?.value || "",
      });
      setErrorMessage(errorMessage);
    } else {
      if (email.current && password.current) {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/browse");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }
    }
  };
  return (
    <div className="bg-black">
      <Header />
      <div className="absolute h-screen w-full">
        <img
          className="h-screen w-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black p-12 my-36 mx-auto right-0 left-0 w-sm opacity-80 rounded-sm  "
      >
        <label className="text-3xl font-extrabold text-white py-4 my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </label>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4  border-[1px] border-gray-400 rounded-sm text-gray-50 w-full "
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className="p-2 my-4  border-[1px] border-gray-400 rounded-sm text-gray-50 w-full "
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-4 border-[1px] border-gray-400 rounded-sm text-gray-50 w-full"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="p-2 my-6 text-white bg-red-700 rounded-sm w-full"
          onClick={handleSubmit}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <p className="text-gray-300">
          {isSignInForm ? "New to Netflix?" : "Already registered"}{" "}
          <span
            className="font-bold text-white cursor-pointer"
            role="button"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};
