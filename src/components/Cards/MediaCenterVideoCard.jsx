
const MediaCenterVideoCard = ({video, getVideoToView, setShowPopSlider}) => {
  return (
    <div 
    onClick={()=>{
      getVideoToView(video)
      setShowPopSlider(true)
    }}
    className="flex flex-col mb-10 cursor-pointer">
      <div className="w-[307px] max-xl:w-[95%] mx-auto bg-mainColor rounded-t-md p-3">
        <div className="w-full h-[200px] border-t-[4px] border-white rounded-md">
          <img
            src={video?.img}
            alt="news-img"
            className="size-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="bg-mainColor w-[307px] max-xl:w-[95%] mx-auto h-[100px] flex flex-col items-center gap-3 p-4 border-t-[6px] mt-[-15px] max-xl:mt-[-20px] border-white rounded-t-xl rounded-b-2xl relative overflow-hidden custom-path duration-300">
        <h4 className="w-[90%] text-center text-lg text-white font-medium description2">
          {video?.title}
        </h4>
      </div>
    </div>
  );
};

export default MediaCenterVideoCard;
