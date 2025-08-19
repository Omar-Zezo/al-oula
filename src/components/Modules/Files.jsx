import { t } from "i18next";
import { TypeFile, TypeImg, TypePdf, TypeVideo } from "../../images/imgs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFiles } from "../../store/slices/about us/files";
import MediaSlider from "../AboutUs/MediaSlider";

const Files = () => {
  const [programsFiles, setProgramsFiles] = useState(null)
  const {data} = useSelector(state=> state.files)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getFiles())
  },[])

  useEffect(()=>{
    if(data?.data){
      setProgramsFiles(data?.data)
    }
  },[data])

  return (
    <div className="mt-[150px] flex flex-col items-center gap-20">
      <h2 className="text-4xl text-mainColor font-semibold">
        {t("files")}
      </h2>
      <div className="container relative">
        <MediaSlider files={programsFiles}/>
      </div>
    </div>
  );
};

export default Files;
