import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
export const appStore = configureStore({
    reducer: {user: userReducer,
        movie: movieReducer
    },
})