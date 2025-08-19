import { useEffect, useState } from "react";
import { AboutCover } from "../../images/imgs";
import { getServicesCategoryDetails } from "../../store/slices/about us/servicesCategoryDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProjectCard from "../../components/Cards/ProjectCard";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";
import UseLangDetection from "../../hooks/UseLangDetection";
import ScrollToTop from "../../utils/ScrollToTop";

const ServicesOfSection = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [sectionTitle, setSectionTitle] = useState(null);

  const { data } = useSelector((state) => state.servicesCategoryDetails);

  const dispatch = useDispatch();
  const { id } = useParams();
  const settings = UseSettings();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (id) {
      dispatch(getServicesCategoryDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.section_title) {
            setSectionTitle(data.data.data.section_title);
          }
          if (data.data.data.services) {
            if (data.data.data.services.data) {
              setCategoryDetails(data.data.data.services.data);
            }
          }
        }
      }
    }
  }, [data]);
  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${sectionTitle}`}</title>
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
      <div
        className={`xl:w-fit w-[90%] xl:px-20 h-[100px] ${
          langDetection === "en" ? "xl:ml-24 mr-auto" : "xl:mr-24"
        } flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]`}
      >
        <p className="text-[40px] max-xl:text-3xl text-white font-semibold">
          {sectionTitle}
        </p>
      </div>

      <div dir={langDetection === "en" ? 'ltr':'rtl'} className="container flex flex-wrap gap-5 mt-20">
        {categoryDetails?.map((service) => (
          <div className="w-[415px]">
            <ProjectCard key={service?.id} service={service} />
          </div>
        ))}
      </div>
    </ScrollToTop>
  );
};

export default ServicesOfSection;
