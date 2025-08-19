import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import VideosContainer from "../Media center/VideosContainer";
import { getVideoSection } from "../../store/slices/media cnter/videoSection";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const MediaCenterVideos = () => {
  const [sectionsList, setSectionList] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { data } = useSelector((state) => state.videoSection);

  const dispatch = useDispatch();
  const langDetection = UseLangDetection()


  useEffect(() => {
    dispatch(getVideoSection());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.videos) {
            if (data.data.data.videos.data) {
              setSectionList(data.data.data.videos.data);
              setSelectedSectionId(data.data.data.videos.data[0]?.id);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col mb-[120px]">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            className="text-mainColor text-5xl"
            icon={faQuoteRight}
          />
          <h2 className="text-5xl text-mainColor text-center font-bold">{t('videos')}</h2>
        </div>
        <div className="flex flex-col gap-8 mt-[120px]">
          <ul className={`container flex overflow-x-auto max-xl:pb-5 items-center gap-5`}>
            {sectionsList?.map((section) => (
              <li
                onClick={() => setSelectedSectionId(section?.id)}
                key={section?.id}
                className={`shrink-0 p-3 ${
                  selectedSectionId === section?.id
                    ? "bg-mainColor"
                    : "bg-transparent border border-mainColor"
                } rounded-[50px] flex items-center gap-3 font-medium cursor-pointer`}
              >
                <p
                  className={`text-xl ${
                    selectedSectionId === section?.id
                      ? "text-white"
                      : "text-mainColor"
                  }`}
                >
                  {section?.title}
                </p>
                <p
                  className={`py-1 px-3 ${
                    selectedSectionId === section?.id
                      ? "bg-white text-mainColor"
                      : "bg-mainColor text-white"
                  } text-base rounded-[50px]`}
                >
                  {section?.videos_count}
                </p>
              </li>
            ))}
          </ul>
          <VideosContainer selectedSectionId={selectedSectionId} langDetection={langDetection}/>
        </div>
      </div>
    </div>
  );
};

export default MediaCenterVideos;
