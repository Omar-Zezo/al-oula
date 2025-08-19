import React, { useEffect, useState } from "react";
import NewsCard from "../Cards/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { getNewsSectionDetails } from "../../store/slices/media cnter/newsSectionDetails";

const NewsContainer = ({ selectedSectionId, langDetection }) => {
  const [newsOfSection, setNewsOfSection] = useState(null);
  const { data } = useSelector((state) => state.newsSectionDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedSectionId) {
      dispatch(getNewsSectionDetails(selectedSectionId));
    }
  }, [selectedSectionId]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.news) {
            if (data.data.data.news.data) {
              setNewsOfSection(data.data.data.news.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className={`flex flex-wrap gap-5 mt-10`}>
      {newsOfSection?.map((art) => (
        <div key={art?.id} className="w-[307px] max-xl:w-full">
          <NewsCard art={art}/>
        </div>
      ))}
    </div>
  );
};

export default NewsContainer;
