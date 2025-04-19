import PlayIcon from "../assets/PlayIcon.png";
import InfoIcon from "../assets/InfoIcon.png";
interface VideoTitleProps {
  overview: string;
  original_title: string;
}
const VideoTitle = ({ overview, original_title }: VideoTitleProps) => {
  return (
    <div className="pt-[20%] px-16 absolute text-white gap-1">
      <h1 className="text-3xl font-bold ">{original_title}</h1>
      <p className="w-1/4">{overview}</p>
      <div className="flex gap-2  mt-1">
        <div className="bg-white text-black px-5 py-1 rounded-sm hover:opacity-80 flex gap-1.5 justify-center items-center">
          <img src={PlayIcon} className="w-3 h-3" />
          <button>Play</button>
        </div>
        <div className="bg-gray-500 opacity-70 text-white  px-5 py-1 rounded-sm  flex gap-1.5 justify-center items-center">
          <img src={InfoIcon} className="w-4 h-4" />
          <button className="text-white">
            More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
