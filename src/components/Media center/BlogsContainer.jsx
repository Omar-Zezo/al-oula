import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsSectionDetails } from "../../store/slices/media cnter/blogsSectionDetails";
import BlogCardMediaCenter from "../Cards/BlogCardMediaCenter";

const BlogsContainer = ({ selectedSectionId, langDetection }) => {
  const [blogsOfSection, setBlogsOfSection] = useState(null);
  const { data } = useSelector((state) => state.blogsSectionDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedSectionId) {
      dispatch(getBlogsSectionDetails(selectedSectionId));
    }
  }, [selectedSectionId]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.blogs) {
            if (data.data.data.blogs.data) {
              console.log(data.data.data.blogs.data);
              setBlogsOfSection(data.data.data.blogs.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="w-full flex flex-wrap gap-5 mt-10">
      {blogsOfSection?.map((art) => (
        <div key={art?.id} className="w-[307px] max-xl:w-full">
          <BlogCardMediaCenter art={art}/>
        </div>
      ))}
    </div>
  );
};

export default BlogsContainer;
