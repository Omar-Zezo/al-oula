import { useParams } from "react-router-dom";
import { AboutCover } from "../../images/imgs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialCard from "../../components/Cards/MaterialCard";
import { getGovernanceMaterialDetails } from "../../store/slices/about us/governanceMaterialDetails";
import UseSettings from "../../hooks/UseSettings";
import { Helmet } from "react-helmet";
import PageLoader from "../../utils/PageLoader";
import ScrollToTop from "../../utils/ScrollToTop";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const GovernanceMaterialDetails = () => {
  const [materials, setMaterials] = useState(null);
  const { data } = useSelector((state) => state.governanceMaterialDetails);

  const dispatch = useDispatch();
  const { id } = useParams();
  const settings = UseSettings();
  const langDetection = UseLangDetection()

  useEffect(() => {
    if (id) {
      dispatch(getGovernanceMaterialDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.governments) {
            if (data.data.data.governments.data) {
              setMaterials(data.data.data.governments.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
      <div>
        <Helmet>
          <title>{`${settings?.name} - ${t("details of governance materials")}`}</title>
          <meta name="description" content={settings?.description} />
          <meta name="keywords" content={settings?.keywords} />
          <link rel="icon" type="image/png" href={settings?.icon}></link>
        </Helmet>
        {!materials ? (
          <PageLoader />
        ) : (
          <>
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
                {t("details of governance materials")}
              </p>
            </div>

            <div className="pt-10 container">
              <div className="container flex flex-col gap-4">
                <div dir={langDetection === "en" ? 'ltr':'rtl'} className="flex flex-wrap justify-between gap-10 mt-20">
                  {materials?.length > 0 ? (
                    materials?.map((material) => (
                      <MaterialCard key={material?.id} material={material} langDetection={langDetection}/>
                    ))
                  ) : (
                    <p className="w-full text-xl text-[#444] text-center font-semibold">
                      {t('there are no details')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ScrollToTop>
  );
};

export default GovernanceMaterialDetails;
