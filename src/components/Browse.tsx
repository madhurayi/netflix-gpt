import { Header } from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainCOntainer";
import SecondaryContainer from "./SecondaryContainer";

export const Browse=()=>{
    useNowPlayingMovies();
    return(
        <div>
            <Header/>
            <div>
                <MainContainer/>
                <SecondaryContainer/>
            </div>
        </div>
    )
}