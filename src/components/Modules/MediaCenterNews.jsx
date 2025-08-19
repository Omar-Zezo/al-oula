import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNewsSection } from "../../store/slices/media cnter/newsSection";
import NewsContainer from "../Media center/NewsContainer";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const MediaCenterNews = () => {
  const [sectionsList, setSectionList] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { data } = useSelector((state) => state.newsSection);

  const dispatch = useDispatch();
  const langDetection = UseLangDetection()

  useEffect(() => {
    dispatch(getNewsSection());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.sections) {
            if (data.data.data.sections.data) {
              setSectionList(data.data.data.sections.data);
              setSelectedSectionId(data.data.data.sections.data[0]?.id);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="flex flex-col mb-[120px]">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t('our news')}
        </h2>
      </div>

      <div className="mt-20">
        <div className="container">
          <ul className={`flex overflow-x-auto max-xl:pb-5 items-center gap-5`}>
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
                  {section?.blogs_count}
                </p>
              </li>
            ))}
          </ul>

          <NewsContainer selectedSectionId={selectedSectionId} langDetection={langDetection}/>
        </div>
      </div>
    </div>
  );
};

export default MediaCenterNews;
