import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberCard from "../Cards/MemberCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBoardOfDirectors } from "../../store/slices/about us/boardOfDirectors";

const BoardOfDirectors = () => {
  const [boardOfDirectorsList, setBoardOfDirectorsList] = useState(null);
  const { data } = useSelector((state) => state.boardOfDirectors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardOfDirectors());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setBoardOfDirectorsList(data.data.data);
        }
      }
    }
  }, [data]);


  return (
    <div className="container flex flex-col gap-[120px]">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-3xl text-mainColor text-center font-bold">
          {boardOfDirectorsList?.page_title}
        </h2>
      </div>

      <div className="flex max-xl:justify-center gap-5 flex-wrap">
        {
          boardOfDirectorsList?.directors?.map(member=>(
            <MemberCard key={member?.id} member={member}/>
          ))
        }
      </div>
    </div>
  );
};

export default BoardOfDirectors;
