import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
    nowPlayingMovies: [];
    trailerVideo:[];
}

const initialState: MovieState = {
    nowPlayingMovies: [],
    trailerVideo:[],
};

const movieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo = action.payload;
        }
    }
});

export const {addNowPlayingMovies,addTrailerVideo}=movieSlice.actions;
export default movieSlice.reducer;