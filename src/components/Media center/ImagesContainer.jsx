import React, { useState } from "react";
import { Blogbg } from "../../images/imgs";
import MediaCenterImagesSlider from "./MediaCenterImagesSlider";
import PopSliderPhotos from "../../utils/PopSliderPhotos";

const ImagesContainer = ({selectedSectionId, langDetection}) => {
  const [showPopSlider, setShowPopSlider] = useState(false);
  const [image, setImage] = useState(null);

  const getImageToView = (img)=>(
    setImage(img)
  )

  return (
    <div className="min-h-[500px] relative">
      <div className="w-full h-[300px] absolute top-0 left-0">
        <img src={Blogbg} alt="bg-donation" className="size-full max-xl:hidden" />
      </div>
      <div className={`w-full xl:px-20 flex flex-col gap-16 absolute left-1/2 top-10 translate-x-[-50%]`}>
          <MediaCenterImagesSlider selectedSectionId={selectedSectionId} getImageToView={getImageToView} setShowPopSlider={setShowPopSlider}/>
      </div>
      {showPopSlider && <PopSliderPhotos showPopSlider={showPopSlider} setShowPopSlider={setShowPopSlider} image={image}/>}
    </div>
  );
};

export default ImagesContainer;
