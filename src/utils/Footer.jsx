import {
  faLocationDot,
  faMinus,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Logo, ShareLogo, WorldMap } from "../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { CircleHalf, Telegram } from "../images/svg";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getFooterLinks } from "../store/slices/utils/footer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeSubscribe } from "../store/slices/utils/newsletters";
import BtnLoader from "./BtnLoader";
import { t } from "i18next";
import { motion } from "framer-motion";


const Footer = ({ settings, langDetection }) => {
  const [footerLinks, setFooterLinks] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("معلومات الإتصال");
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const { data } = useSelector((state) => state.footer);
  const newslettersData = useSelector((state) => state.newsletters);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const formSubmit = (data) => {
    setShowBtnLoader(true);
    dispatch(makeSubscribe(data));
  };

  //newsletters
  useEffect(() => {
    if (newslettersData) {
      if (newslettersData.data) {
        setShowBtnLoader(false);
      }
      if (newslettersData.error) {
        setShowBtnLoader(false);
      }
    }
  }, [newslettersData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFooterLinks());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setFooterLinks(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <footer
      dir={langDetection === "en" ? "ltr" : "rtl"}
      className="xl:relative overflow-hidden max-xl:pb-20 bg-gradient-to-r from-[#824196] to-[#a37fad] xl:h-[680px] h-fit mt-[120px] rounded-t-3xl"
    >
      <div className="w-[70%] mx-auto h-[300px] xl:hidden bg-white flex items-center justify-center rounded-b-full">
        <img src={settings?.logo} alt="logo" className="w-[240px]" />
      </div>
      <img
        src={WorldMap}
        alt="map-world"
        className="size-full xl:absolute top-5 opacity-25 left-0"
      />
      <div className="container flex xl:gap-8 max-xl:flex-col justify-between h-full xl:absolute xl:left-1/2 xl:translate-x-[-50%]">
        <div className="w-[20%] h-[70%] max-xl:hidden flex items-center justify-center rounded-b-full bg-white">
          <img src={Logo} alt="logo" className="max-w-[120%]" />
        </div>
        <div className="w-[78%] max-xl:w-full flex max-xl:flex-col max-xl:items-center gap-10 xl:pt-[100px] h-full">
          <div className="relative">
            <motion.div
            animate={{
              y: ['-10px', '10px'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            className="absolute top-[-50px] right-10 z-10"
            >
              <a
                href={"https://maps.app.goo.gl/n5oWDptg5Jd28bBL7"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="absolute text-[100px] text-mainColor hover:text-[#C6ABCE] duration-300 rotate-12"
                  icon={faLocationDot}
                />
              </a>
            </motion.div>

            <div className="size-[320px] bg-white rounded-[50px] xl:rounded-full">
              <iframe
                src={settings?.link_map_address}
                allowFullScreen=""
                loading="lazy"
                title="safarymap"
                className="size-full rounded-[50px] xl:rounded-full grayscale"
              ></iframe>
            </div>
            <div className="w-full mt-10 flex flex-col gap-3">
              <h5 className="text-xl text-white font-semibold">
                {t("subscribe to the newsletter")}
              </h5>
              <form className="flex" onSubmit={handleSubmit(formSubmit)}>
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder={t("email")}
                    autoComplete="off"
                    className={`p-2 w-full text-base ${
                      langDetection === "en" ? "rounded-l-md" : "rounded-r-md"
                    } border-none outline-none`}
                    {...register("newsletter_email", {
                      required: "هذا الحقل مطلوب",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "البريد الإلكتروني غير صالح",
                      },
                    })}
                  />
                  <p className="mt-1 pr-2 text-red-600 text-sm">
                    {errors.newsletter_email?.message}
                  </p>
                </div>
                <button
                  className={`w-20 relative ${
                    langDetection === "en" ? "rounded-r-full" : "rounded-l-full"
                  } font-semibold flex items-center justify-center text-base max-lg:text-base text-white bg-mainColor hover:bg-secondryColor duration-300 h-10 px-4`}
                >
                  {showBtnLoader ? <BtnLoader /> : t("subscribe")}
                </button>
              </form>
            </div>
          </div>

          <div className="max-xl:w-full flex max-xl:flex-col max-xl:items-center gap-5 xl:flex-1">
            <div className="w-1/3 max-xl:w-full shrink-0 flex flex-col max-xl:items-center gap-4">
              <h4
                className="w-[80%] text-2xl text-white font-semibold flex items-center justify-between max-xl:pb-5 max-xl:border-b border-white/70"
                onClick={() => {
                  selectedGroup
                    ? setSelectedGroup(null)
                    : setSelectedGroup("روابط تهمك");
                }}
              >
                {t("important links")}
                {selectedGroup === "روابط تهمك" ? (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faMinus}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faPlus}
                  />
                )}
              </h4>
              <ul
                className={`flex flex-col  max-xl:items-center gap-4 max-xl:${
                  selectedGroup === "روابط تهمك" ? "flex" : "hidden"
                }`}
              >
                {footerLinks?.slice(0, footerLinks?.length / 2).map((item) => (
                  <li key={item?.id} className="flex gap-1 items-center">
                    <img width={15} src={CircleHalf} alt="icon" className="" />
                    <Link
                      to={`/pages/${item?.key}`}
                      className="text-xl capitalize text-white font-medium hover:text-mainColor duration-300"
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/3 max-xl:w-full shrink-0 flex flex-col max-xl:items-center gap-4">
              <h4
                className="w-[80%] text-2xl text-white font-semibold flex items-center justify-between max-xl:pb-5 max-xl:border-b border-white/70"
                onClick={() => {
                  selectedGroup
                    ? setSelectedGroup(false)
                    : setSelectedGroup("المركز الإعلامي");
                }}
              >
                {t("media Center")}
                {selectedGroup === "المركز الإعلامي" ? (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faMinus}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faPlus}
                  />
                )}
              </h4>
              <ul
                className={`xl:flex flex-col max-xl:items-center gap-4 max-xl:${
                  selectedGroup === "المركز الإعلامي" ? "flex" : "hidden"
                }`}
              >
                {footerLinks?.slice(footerLinks?.length / 2).map((item) => (
                  <li
                    key={item?.id}
                    className="flex gap-1 items-center max-xl:justify-center max-xl:mb-5"
                  >
                    <img width={15} src={CircleHalf} alt="icon" className="" />
                    <Link
                      to={`/pages/${item?.key}`}
                      className="text-xl capitalize text-white font-medium hover:text-mainColor duration-300"
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[233px] max-xl:w-full shrink-0 flex flex-col max-xl:items-center gap-4">
              <h4
                className="w-[80%] text-2xl text-white font-semibold flex items-center justify-between"
                onClick={() => {
                  selectedGroup
                    ? setSelectedGroup(null)
                    : setSelectedGroup("معلومات الإتصال");
                }}
              >
                {t("contact with us")}
                {selectedGroup === "معلومات الإتصال" ? (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faMinus}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="text-xl text-white xl:hidden"
                    icon={faPlus}
                  />
                )}
              </h4>
              <ul
                className={`flex flex-col xl:pl-2 gap-8 max-xl:${
                  selectedGroup === "معلومات الإتصال" ? "flex" : "hidden"
                }`}
              >
                <li className="flex gap-2 items-center">
                  <div className="size-10 shrink-0 flex items-center justify-center bg-mainColor rounded-full border-2 border-white">
                    <FontAwesomeIcon
                      className="text-lg text-white"
                      icon={faPhone}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg text-white font-semibold">
                      {t("phone")}
                    </p>
                    <a
                      href={`tel:${settings?.phone}`}
                      className="text-lg text-white"
                    >
                      {settings?.phone}
                    </a>
                  </div>
                </li>

                <li className="flex gap-2 items-center">
                  <div className="size-10 shrink-0 flex items-center justify-center bg-mainColor rounded-full border-2 border-white">
                    <img width={24} src={Telegram} alt="email" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg text-white font-semibold">
                      {t("email")}
                    </p>
                    <a
                      href={`mailto:${settings?.email}`}
                      className="xl:text-[17px] text-lg text-white font-medium"
                    >
                      {settings?.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-2 items-center">
                  <div className="size-10 shrink-0 flex items-center justify-center bg-mainColor rounded-full border-2 border-slate-100">
                    <FontAwesomeIcon
                      className="text-lg text-white font-medium"
                      icon={faLocationDot}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg text-white font-semibold">
                      {t("location")}
                    </p>
                    <a href="" className="text-lg text-white font-medium">
                      {settings?.address}
                    </a>
                  </div>
                </li>

                <li className="flex gap-2 items-center">
                  <a href={settings?.site_license?.url} target="_blanck">
                    <img
                      width={205}
                      src={settings?.site_license?.img}
                      alt="site_license"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-xl:hidden absolute container flex items-center bottom-10 left-1/2 translate-x-[-50%]">
        <div className="w-fit">
          <a
            target="_blanck"
            href="https://share.net.sa"
            className="mr-auto flex gap-2 items-center"
          >
            <p className="max-md:hidden text-xl max-lg:text-base text-white font-semibold">
              {t("powered")}
            </p>
            <img
              width={400}
              src={ShareLogo}
              className="w-[120px] max-lg:w-20"
              alt="share-aldawly"
            />
          </a>
        </div>

        <div
          className={`w-fit flex ${
            langDetection === "en" ? "ml-auto" : "mr-auto"
          } items-center gap-5`}
        >
          <a href={settings?.social?.facebook} target="_blanck">
            <FontAwesomeIcon
              className="text-[35px] text-white"
              icon={faFacebook}
            />
          </a>

          <a href={settings?.social?.youtube} target="_blanck">
            <FontAwesomeIcon
              className="text-[35px] text-white"
              icon={faYoutube}
            />
          </a>

          <a href={settings?.social?.instagram} target="_blanck">
            <FontAwesomeIcon
              className="text-[35px] text-white"
              icon={faInstagram}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
