import { KingdomFlag, SaudiFlag } from "../images/svg";
import UseLangDetection from "../hooks/UseLangDetection";
import { langAr, langEn } from "../store/slices/translation/translation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ChangeLang = ({ stickyNav, showLangMenu, setShowLangMenu }) => {
  const langDetection = UseLangDetection();
  const { i18n } = useTranslation();

  const dispatch = useDispatch()
  const {pathname} = useLocation()

  useEffect(()=>{
    setShowLangMenu(false)
  },[pathname])


  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "en") {
      dispatch(langEn());
      window.location.reload()
    }

    if (lang === "ar") {
      dispatch(langAr());
      window.location.reload()
    }
  };


  return (
    <div className="flex flex-col relative">
      <div
        onClick={() => setShowLangMenu(!showLangMenu)}
        className={`h-[48px] px-3 ${
          showLangMenu ? "rounded-t-lg" : "rounded-lg"
        } ${
          stickyNav
            ? "bg-white text-mainColor shadow-base"
            : "text-white bg-mainColor/30"
        } flex items-center gap-2 cursor-pointer`}
      >
        {langDetection === "ar" ? (
          <img width={40} src={SaudiFlag} alt="saudi-flag" />
        ) : (
          <img width={33} src={KingdomFlag} alt="saudi-flag" />
        )}
      </div>
      <ul
        className={`w-[75px] ${langDetection === "en" ? 'left-0 rounded-tl-none':'right-0 rounded-tr-none'} items-center py-2 ${
          showLangMenu ? "flex" : "hidden"
        } flex flex-col gap-2 ${
          stickyNav ? "bg-white text-mainColor" : "bg-mainColor/30 text-white"
        } rounded-lg absolute top-[48px] shadow-lg`}
      >
        <li
          className={`w-full flex justify-center pb-1 border-b ${
            stickyNav ? "border-black/20" : "border-white/50"
          } cursor-pointer`}
          onClick={()=> {
            changeLang('ar')
            setShowLangMenu(false)
          }}
        >
          <img width={33} src={SaudiFlag} alt="saudi-flag" />
        </li>

        <li className={`w-full flex justify-center cursor-pointer`}
        onClick={()=>{
            changeLang('en')
            setShowLangMenu(false)
        }}
        >
          <img width={33} src={KingdomFlag} alt="saudi-flag" />
        </li>
      </ul>
    </div>
  );
};

export default ChangeLang;
