import { useState } from "react";
import { Header } from "./Header";

export const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fa4630b1-ca1e-4788-94a9-eccef9f7af86/web/IN-en-20250407-TRIFECTA-perspective_43f6a235-9f3d-47ef-87e0-46185ab6a7e0_large.jpg" />
      </div>
      <form className="absolute bg-black p-12 my-36 mx-auto right-0 left-0 w-3/12 opacity-80 rounded-sm  ">
        <label className="text-3xl font-extrabold text-white py-4 my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </label>
        {!isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className="p-2 my-4  border-[1px] border-gray-400 rounded-sm text-gray-50 w-full "
        />}
        <input
          type="text"
          placeholder="Email or phone number"
          className="p-2 my-4  border-[1px] border-gray-400 rounded-sm text-gray-50 w-full "
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 border-[1px] border-gray-400 rounded-sm text-gray-50 w-full"
        />
        <button className="p-2 my-6 text-white bg-red-700 rounded-sm w-full">
          {" "}
          Sign In{" "}
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
