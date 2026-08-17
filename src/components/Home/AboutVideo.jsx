import React, { useState, useRef, useEffect } from "react";
import { Play, VideoController, VPic, VshapeRight } from "../../images/imgs";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import { getVirtualTour } from "../../store/slices/Home/virtualTour";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const AboutVideo = ({ langDetection }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [videoData, setVideoData] = useState(null);
  const [videoTitle, setVideoTitle] = useState(null);
  const playerRef = useRef(null);
  const { data } = useSelector((state) => state.virtualTour);

  const dispatch = useDispatch();

  const handlePlay = () => {
    setPlaying(true);
  };

  useEffect(() => {
    dispatch(getVirtualTour());
  }, []);

  useEffect(() => {
    if (data?.data?.data) {
      setVideoData(data.data.data);
      const title = data.data.data?.title?.split(" ");
      setVideoTitle(title);
    }
  }, [data]);

  //motion
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
      id="video"
      className={`xl:mt-[120px] mt-20 ${
        langDetection === "en" ? "xl:pr-5" : "xl:pl-5"
      }`}
    >
      <div className="flex justify-between max-xl:flex-col max-xl:items-center max-xl:gap-20 max-xl:mx-auto">
        <div className="w-[43%] max-xl:w-full xl:h-[600px] relative">
          <img
            className={`absolute ${
              langDetection === "en" ? "left-[-2px] rotate-180" : "right-[-2px]"
            } max-xl:hidden`}
            width={250}
            src={VshapeRight}
            alt="right-shape"
          />
          <p
            className={`${
              langDetection === "en" ? "pl-5" : "pr-5"
            } text-[80px] max-xl:w-full max-xl:text-center max-xl:text-4xl text-mainColor font-bold absolute top-1/2 translate-y-[-50%] z-10`}
          >
            {videoTitle?.[0]} <br className="max-xl:hidden" />
            {videoTitle?.[1]}
          </p>
        </div>

        <div className="xl:w-[55%] w-[95%] xl:h-[600px] h-[400px] relative">
          <img
            src={VideoController}
            alt="controller"
            className="w-full max-xl:h-[130px] absolute bottom-0"
          />

          <div className="flex items-center justify-center gap-8 absolute xl:bottom-6 bottom-3 left-1/2 translate-x-[-50%]">
            <FontAwesomeIcon
              className="text-[40px] max-xl:text-2xl cursor-pointer text-white"
              icon={faPause}
              onClick={() => setPlaying(false)}
            />
            <FontAwesomeIcon
              className="text-[40px] max-xl:text-2xl cursor-pointer text-white"
              icon={faPlay}
              onClick={() => setPlaying(true)}
            />
            <FontAwesomeIcon
              className="text-[40px] max-xl:text-2xl cursor-pointer text-white"
              icon={faStop}
              onClick={() => {
                setPlaying(false);
                playerRef.current.seekTo(0);
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={(1 - volume) * 100}
              onChange={(e) => setVolume(1 - parseFloat(e.target.value) / 100)}
              className="w-[150px] max-xl:w-[100px] cursor-pointer appearance-none h-2 rounded-lg"
              style={{
                WebkitAppearance: "none",
                appearance: "none",
                height: "6px",
                borderRadius: "10px",
                outline: "none",
                opacity: "0.9",
                transition: "opacity .15s ease-in-out",
                background: `linear-gradient(to left, #814494 ${
                  (1 - volume) * 100
                }%, #C6ABCE ${(1 - volume) * 100}%)`,
              }}
            />
            <span className="text-white text-lg ml-2">
              {Math.round(volume * 100)}%
            </span>

            <style>{`
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`}</style>
          </div>

          <div className="w-[90%] h-[86%] absolute left-1/2 xl:bottom-[102px] bottom-[62px] translate-x-[-50%] z-10">
            <div className="size-full relative rounded-t-[50px]">
              <div className="size-full bg-gradient-to-r from-[#814494] to-[#C6ABCE] rounded-t-[50px]">
                <ReactPlayer
                  ref={playerRef}
                  width="100%"
                  height="100%"
                  style={playing ? { display: "block" } : { display: "none" }}
                  url={videoData?.video}
                  playing={playing}
                  volume={volume}
                  controls={true}
                />
              </div>
              {!playing && (
                <>
                  <img
                    src={VPic}
                    alt=""
                    className="size-full object-cover absolute left-0 top-0 rounded-t-[50px]"
                  />
                  <div className="size-full flex justify-center items-center video-gradient bg-blend-screen opacity-50 absolute top-0 left-0 rounded-t-[50px]"></div>
                  <img
                    src={Play}
                    alt="play"
                    className="w-[20%] absolute z-10 top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] cursor-pointer"
                    onClick={handlePlay}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutVideo;
