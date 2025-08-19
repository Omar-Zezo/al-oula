import React from "react";
import { BlogShapHover } from "../../images/imgs";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const NewsCard = ({art}) => {
  return (
    <div className="w-full h-[250px] rounded-2xl relative overflow-hidden border-b-[7px] border-white">
      <Link to={`/news-sections/news/${art?.id}`}>
        <img
          src={art?.img}
          alt="blog-img"
          className="absolute top-0 left-0 size-full object-cover"
        />
        <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-[#814494] to-[#C6ABCE] opacity-30"></div>
        <div
          style={{
            background: `url('${BlogShapHover}')`,
            backgroundRepeat: "no-repeat",
          }}
          className="w-[420px] h-[440px] flex flex-col items-center pt-24 absolute bottom-[-275px] left-[-200px] hover:bottom-[-200px] duration-300"
        >
          <p className="w-[30%] ml-auto mr-16 text-right text-base text-white font-medium description2">
            {art?.title}
          </p>
          <FontAwesomeIcon
            className="text-[30px] text-white ml-12 mt-12"
            icon={faArrowUpRightFromSquare}
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
