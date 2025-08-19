import { useEffect, useState } from "react";
import AboutusSlider from "../components/AboutUs/AboutusSlider";
import VirtualTour from "../components/Modules/VirtualTour";
import { AboutCover } from "../images/imgs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPageNavById } from "../store/slices/utils/pageNavById";
import parse from "html-react-parser";
import PageCard from "../components/Cards/PageCard";
import OurPartners from "../components/Modules/OurPartners";
import BoardOfDirectors from "../components/Modules/BoardOfDirectors";
import GeneralAssembly from "../components/Modules/GeneralAssembly";
import OurTeam from "../components/Modules/OurTeam";
import MediaCenterNews from "../components/Modules/MediaCenterNews";
import MediaCenterPhotos from "../components/Modules/MediaCenterPhotos";
import MediaCenterVideos from "../components/Modules/MediaCenterVideos";
import Projects from "../components/Modules/Projects";
import GovernanceMaterial from "../components/Modules/GovernanceMaterial";
import SeasonalProjects from "../components/Modules/SeasonalProjects";
import MediaCenterBlogs from "../components/Modules/MediaCenterBlogs";
import Library from "../components/Modules/Library";
import Events from "../components/Modules/Events";
import Surveys from "../components/Modules/Surveys";
import GiftForm from "../components/Modules/GiftForm";
import Initiatives from "../components/Modules/Initiatives";
import SaidAboutus from "../components/Modules/SaidAboutus";
import Awards from "../components/Modules/Awards";
import Strategies from "../components/Modules/Strategies";
import Faq from "../components/Modules/Faq";
import ContactForm from "../components/Modules/ContactForm";
import Volunteer from "../components/Modules/Volunteer";
import MembershipForm from "../components/Modules/MembershipForm";
import EmploymentApplication from "../components/Modules/EmploymentApplication";
import Beneficiaries from "../components/Modules/Beneficiaries";
import PartnerForm from "../components/Modules/PartnerForm";
import ScrollToTop from "../utils/ScrollToTop";
import Facilities from "../components/Modules/Facilities";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import UseLangDetection from "../hooks/UseLangDetection";
import Files from "../components/Modules/Files";

const PageByKey = () => {
  const [pageContent, setPageContent] = useState(null);
  const { data } = useSelector((state) => state.pageNavById);

  const settings = UseSettings();

  const dispatch = useDispatch();
  const langDetection = UseLangDetection()

  const { key } = useParams();

  useEffect(() => {
    if (key) {
      dispatch(getPageNavById(key));
    }
  }, [key]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPageContent(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${pageContent?.title}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!pageContent ? (
        <PageLoader />
      ) : (
        <div dir={langDetection === "en" ? 'ltr':'rtl'} className="flex flex-col">
          <div className="xl:h-[400px] h-[200px] bg-mainColor xl:rounded-b-[80px] relative">
            <img
              src={pageContent?.cover ? pageContent?.cover : AboutCover}
              alt="about-cover"
              className="size-full absolute left-0 top-0 object-cover xl:rounded-b-[80px]"
            />
            <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 xl:rounded-b-[80px]"></div>
          </div>
          <div className={`xl:w-fit w-[90%] xl:px-20 h-[100px] ${langDetection === "en" ? 'xl:ml-24 mr-auto':'xl:mr-24'} flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]`}>
            <p className="text-[40px] capitalize max-xl:text-3xl text-white font-semibold">
              {pageContent?.title}
            </p>
          </div>

          {pageContent?.value ? (
            <div
              className={`container bg-white shadow-xl rounded-2xl xl:p-10 p-5 border-t-[15px] border-mainColor flex max-xl:flex-col max-xl:gap-5 justify-between items-center mt-[100px]`}
            >
              <div
                className={`${
                  pageContent?.image
                    ? "w-[47%] max-xl:w-full"
                    : "w-full flex flex-col items-center"
                } text-xl text-mainColor leading-9 font-medium max-xl:order-2`}
              >
                {pageContent ? parse(pageContent?.value) : null}
              </div>
              {pageContent?.image ? (
                <div className="w-[48%] max-xl:w-full h-[500px] max-xl:h-[300px]">
                  <AboutusSlider images={[pageContent?.image]} />
                </div>
              ) : null}
            </div>
          ) : null}

          {/* sub Pages */}
          {pageContent?.subPages ? (
            <div className="mt-[150px]">
              <div className="container flex flex-wrap gap-6">
                {pageContent?.subPages?.map((page) => (
                  <PageCard key={page?.id} page={page} />
                ))}
              </div>
            </div>
          ) : null}

          {/* modules */}
          {pageContent?.modules
            ? pageContent?.modules?.map((module) =>
                module?.key === "virtual_tour" ? (
                  <VirtualTour key={module?.id} />
                ) : module.key === "partners" ? (
                  <OurPartners key={module?.id} />
                ) : module?.key === "board_of_directors" ? (
                  <BoardOfDirectors key={module?.id} />
                ) : module?.key === "general_assembly" ? (
                  <GeneralAssembly key={module?.id} />
                ) : module?.key === "our_team" ? (
                  <OurTeam key={module?.id} />
                ) : module?.key === "news_sections" ? (
                  <MediaCenterNews key={module?.id} />
                ) : module?.key === "photos_sections" ? (
                  <MediaCenterPhotos key={module?.id} />
                ) : module?.key === "videos_sections" ? (
                  <MediaCenterVideos key={module?.id} />
                ) : module?.key === "services_sections" ? (
                  <Projects key={module?.id} />
                ) : module?.key === "governance_material" ? (
                  <GovernanceMaterial key={module?.id} />
                ) : module?.key === "programs_sections" ? (
                  <SeasonalProjects key={module?.id} />
                ) : module?.key === "blogs_sections" ? (
                  <MediaCenterBlogs key={module?.id} />
                ) : module?.key === "oula_library" ? (
                  <Library key={module?.id} />
                ) : module?.key === "events" ? (
                  <Events key={module?.id} />
                ) : module?.key === "surveys" ? (
                  <Surveys key={module?.id} />
                ) : module?.key === "donation_gift" ? (
                  <GiftForm key={module?.id} />
                ) : module?.key === "initiatives" ? (
                  <Initiatives key={module?.id} />
                ) : module?.key === "about_us_slider" ? (
                  <SaidAboutus key={module?.id} />
                ) : module?.key === "awards" ? (
                  <Awards key={module?.id} />
                ) : module.key === "strategies" ? (
                  <Strategies key={module?.id} />
                ) : module?.key === "faqs" ? (
                  <Faq key={module?.id} />
                ) : module?.key === "complaints_and_suggestions" ||
                  module?.key === "contact_us" ? (
                  <ContactForm key={module?.id} />
                ) : module?.key === "volunteer_request" ? (
                  <Volunteer key={module?.id} />
                ) : module.key === "membership_request" ? (
                  <MembershipForm key={module?.id} />
                ) : module?.key === "employment_application" ? (
                  <EmploymentApplication />
                ) : module?.key === "beneficiaries_requests" ? (
                  <Beneficiaries key={module?.id} />
                ) : module?.key === "partner_request" ? (
                  <PartnerForm key={module?.id} />
                ) : module?.key === "facilities_sections" ? (
                  <Facilities key={module?.id} />
                ) : module?.key === "files" ? (
                  <Files key={module?.id}/>
                ):null
              )
            : null}
        </div>
      )}
    </ScrollToTop>
  );
};

export default PageByKey;
