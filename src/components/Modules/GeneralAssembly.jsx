import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGeneralAssembly } from "../../store/slices/about us/generalAssembly";
import GeneralAssemblyCard from "../Cards/GeneralAssemblyCard";

const GeneralAssembly = () => {
  const [generalAssemblyList, setGeneralAssemblyList] = useState(null);
  const [generalAssemblyTitle, setGeneralAssemblyTitle] = useState(null);
  const { data } = useSelector((state) => state.generalAssembly);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGeneralAssembly());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setGeneralAssemblyTitle(data.data.data);
          if(data.data.data.page_title){
            setGeneralAssemblyTitle(data.data.data.page_title)
          }
          if(data.data.data.memebers){
            if(data.data.data.memebers.data){
              setGeneralAssemblyList(data.data.data.memebers.data)
            }
          }
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
          {generalAssemblyTitle}
        </h2>
      </div>

      <div className="flex max-xl:justify-center gap-5 flex-wrap">
        {
          generalAssemblyList?.map(member=>(
            <GeneralAssemblyCard key={member?.id} member={member}/>
          ))
        }
      </div>
    </div>
  );
};

export default GeneralAssembly;
