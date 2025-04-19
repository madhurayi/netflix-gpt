import { onAuthStateChanged, signOut } from "firebase/auth";
import NetflixLogo from "../assets/NetflixLogo.png";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  interface RootState {
    user: {
      displayName: string;
      email: string;
      photoURL: string;
      uid: string;
    };
  }
  const user = useSelector((store: RootState) => store.user);
  const handleButtonClick=()=>{
    signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
      navigate("/error");
    });
  }  

  useEffect(()=>{       
    const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName,photoURL} = user;
          dispatch(addUser({uid, email, displayName,photoURL:photoURL}));
          navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
      });

      // Unsubscribe when component unmounts
      return ()=>unsubscribe();
},[])

  return (
    <div className="absolute z-10 w-screen bg-gradient-to-b from-black px-8 py-2 flex justify-between">
      <img
        className="w-44 font-extrabold "
        src={NetflixLogo}
      />
      {user && <div className="flex items-center gap-2">
        <img alt="user-logo" src={user.photoURL} className="w-10 h-10 rounded-2xl" />
        <button className="text-white font-bold cursor-pointer" onClick={handleButtonClick}>Sign out</button>
      </div>}
    </div>
  );
};
