import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrograms } from "../../store/slices/about us/allPrograms";
import { Link } from "react-router-dom";
import { t } from "i18next";

const SeasonalProjects = () => {
  const [projects, setProjects] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const { data } = useSelector((state) => state.allPrograms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPrograms({str: 'limit=5'}));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPageTitle(data.data.data?.page_title);
          if (data.data.data.programs) {
            if (data.data.data.programs.data) {
              setProjects(data.data.data.programs.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl text-mainColor text-center font-semibold">
          {pageTitle}
        </h1>
        <div className="flex flex-wrap justify-center gap-5 mt-20">
          {projects?.map((program) => (
            <div
              key={program?.id}
              className="w-1/6 max-xl:w-[198px] shrink-0 cursor-pointer relative mb-20"
            >
              <Link to={`/program-details/${program?.id}`}>
                <img
                  src={program?.image_path}
                  alt=""
                  className="size-full object-cover"
                />
                <h4 className="w-[90%] absolute left-1/2 translate-x-[-50%] bottom-5 text-2xl text-center text-white font-bold">
                  {program?.title}
                </h4>
              </Link>
            </div>
          ))}
          <div />
        </div>
        <Link
          to="/programs"
          className=" w-fit mx-auto text-xl rounded-lg bg-mainColor py-4 px-16 text-white font-bold"
        >
          {t('more')}
        </Link>
      </div>
    </div>
  );
};

export default SeasonalProjects;
