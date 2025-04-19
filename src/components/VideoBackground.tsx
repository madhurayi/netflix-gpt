import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoBackgroundProps {
  movieId: number;
}

const VideoBackground = ({ movieId }: VideoBackgroundProps) => {
  const trailerVideo=useSelector((state : {movie: {trailerVideo:{key:number}}})=>state.movie.trailerVideo)
  useMovieTrailer(movieId);
  return (
    <div className="w-screen aspect-video">
      <iframe
      className="w-screen aspect-video"
        width="560"
        src={
          "https://www.youtube.com/embed/"+trailerVideo.key+"?si=4HbxVDGLhVsPKAIk&autoplay=1&mute=1&rel=0&controls=0&loop=1&showinfo=0"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
