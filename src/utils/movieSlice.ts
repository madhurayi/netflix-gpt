import { createSlice } from "@reduxjs/toolkit";

export interface MovieState {
    nowPlayingMovies: [];
    popularMovies:[];
    trailerVideo:[];
}

const initialState: MovieState = {
    nowPlayingMovies: [],
    popularMovies: [],
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
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload;
        }
    }
});

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovies}=movieSlice.actions;
export default movieSlice.reducer;