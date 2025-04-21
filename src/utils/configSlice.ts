import { createSlice } from "@reduxjs/toolkit";
import { languages } from "./languageConstants";

const configSlice=createSlice({
    name:"config",
    initialState:{
        lang: "en" as keyof typeof languages,
    },
    reducers:{
        setLang:(state,action)=>{
            state.lang=action.payload;
        }
    }
})

export const {setLang}=configSlice.actions;
export default configSlice.reducer;