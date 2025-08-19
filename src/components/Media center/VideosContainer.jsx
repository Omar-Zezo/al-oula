import React, { useState } from "react";
import { Blogbg } from "../../images/imgs";
import MediaCenterVideosSlider from "./MediaCenterVideosSlider";
import PopSliderVideos from "../../utils/PopSliderVideos";

const VideosContainer = ({selectedSectionId, langDetection}) => {
    const [showPopSlider, setShowPopSlider] = useState(false);
    const [video, setVideo] = useState(null);
  
    const getVideoToView = (vid)=>(
      setVideo(vid)
    )

  return (
    <div className="min-h-[500px] relative">
      <div className="w-full h-[300px] absolute top-0 left-0">
        <img src={Blogbg} alt="bg-donation" className="size-full max-xl:hidden" />
      </div>
      <div className="w-full xl:px-20 flex flex-col gap-16 absolute left-1/2 top-10 translate-x-[-50%]">
          <MediaCenterVideosSlider selectedSectionId={selectedSectionId} getVideoToView={getVideoToView} setShowPopSlider={setShowPopSlider}/>
      </div>
      {showPopSlider && <PopSliderVideos showPopSlider={showPopSlider} setShowPopSlider={setShowPopSlider} video={video}/>}
    </div>
  );
};

export default VideosContainer;
