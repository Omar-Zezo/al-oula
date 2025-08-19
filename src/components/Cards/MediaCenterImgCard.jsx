
const MediaCenterImgCard = ({image, getImageToView, setShowPopSlider}) => {
  return (
    <div 
    onClick={()=>{
      setShowPopSlider(true)
      getImageToView(image)
    }}
    className="flex flex-col mb-10 cursor-pointer">
      <div className="w-[307px] max-xl:w-full mx-auto bg-mainColor rounded-t-md p-3">
        <div className="w-full h-[200px] border-t-[4px] border-white rounded-md">
          <img
            src={image?.img}
            alt="news-img"
            className="size-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="bg-mainColor w-[307px] max-xl:w-[95%] mx-auto h-[100px] flex flex-col items-center gap-3 p-4 border-t-[6px] mt-[-16px] xl:mt-[-15px] border-white rounded-t-xl rounded-b-2xl relative overflow-hidden custom-path duration-300">
        <h4 className="w-[90%] text-lg text-center text-white font-medium description2">
          {image?.title}
        </h4>
      </div>
    </div>
  );
};

export default MediaCenterImgCard;
