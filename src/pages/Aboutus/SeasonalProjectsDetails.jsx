import { Link, useParams } from "react-router-dom";
import { AboutCover, FamilyBlur, HappyFamily } from "../../images/imgs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonalProjectsDetails } from "../../store/slices/about us/seasonalProjectsDetails";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";
import ScrollToTop from "../../utils/ScrollToTop";

const SeasonalProjectsDetails = () => {
  const [project, setProject] = useState(null);
  const { data } = useSelector((state) => state.seasonalProjectsDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  const settings = UseSettings();

  useEffect(() => {
    if (id) {
      dispatch(getSeasonalProjectsDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          console.log(data.data.data);
          setProject(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
    <div>
      <Helmet>
        <title>{`${settings?.name} - تفاصيل المشروع`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      <div className="xl:h-[400px] h-[200px] bg-mainColor xl:rounded-b-[80px] relative">
        <img
          src={AboutCover}
          alt="about-cover"
          className="size-full absolute left-0 top-0 object-cover xl:rounded-b-[80px]"
        />
        <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 xl:rounded-b-[80px]"></div>
      </div>
      <div className="xl:w-fit w-[90%] xl:px-20 h-[100px] xl:mr-24 flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]">
        <p className="text-[40px] max-xl:text-3xl text-white font-semibold">
          تفاصيل المشروع
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-20">
        <h3 className="text-[36px] w-[95%] mt-6 text-mainColor text-center font-bold">
          {project?.page_title}
        </h3>
        {/* programs cards */}
        <div className="mt-[120px] bg-cover relative overflow-hidden">
          <div className="xl:px-10 max-xl:overflow-x-auto max-xl:overflow-y-hidden max-xl:pb-5 flex items-end gap-3 relative">
            <img
              src={FamilyBlur}
              alt="blur"
              className="absolute top-0 right-10"
            />
            <div
              style={{
                background: `url('${HappyFamily}')`,
                backgroundRepeat: "no-repeat",
              }}
              className="w-[198px] px-5 flex flex-col gap-5 justify-center items-center h-[423px] bg-cover bg-mainColor rounded-tr-[60px] rounded-bl-[60px] rounded-br-3xl rounded-tl-3xl"
            >
              <h3 className="text-3xl text-center text-white font-semibold">
                {project?.page_title}
              </h3>
              <p className="text-lg text-white text-center font-medium">
                نعمل معاً لبناء منظومة حلول أسرية مستدامة ومؤثرة في المجتمع
              </p>
            </div>

            {project?.programs?.map((item, index) => (
              <div
                key={index}
                className="w-1/6 max-xl:w-[198px] shrink-0 cursor-pointer relative"
              >
                <Link to={`/program-details/${item?.id}`}>
                <img
                  src={item?.image_path}
                  alt=""
                  className="size-full object-cover"
                />
                <h4 className="w-[90%] absolute left-1/2 translate-x-[-50%] bottom-5 text-2xl text-center text-white font-bold">
                  {item?.title}
                </h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </ScrollToTop>
  );
};

export default SeasonalProjectsDetails;
