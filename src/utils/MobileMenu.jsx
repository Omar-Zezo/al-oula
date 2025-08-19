import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Close, KingdomFlag, SaudiFlag } from "../images/svg";
import { useDispatch, useSelector } from "react-redux";
import {
  faArrowRightFromBracket,
  faGlobe,
  faMinus,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { logoutUser } from "../store/slices/auth/logout";
import { langAr, langEn } from "../store/slices/translation/translation";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const MobileMenu = ({ showMenu, setShowMenu, settings, langDetection }) => {
  const [navbarLinks, setNavbarLinks] = useState(null);
  const [selectedSubmenu, setSelectedSubmenu] = useState(null);
  const [subOfSub, setSubOfSub] = useState(null);
  const { data } = useSelector((state) => state.navbar);
  const logoutData = useSelector((state) => state.logout);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const errorMsg = (msg) => toast.error(msg);

  // navLinks
  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setNavbarLinks(data.data.data);
        }
      }
    }
  }, [data]);

  //logout
  useEffect(() => {
    if (logoutData) {
      if (logoutData.data) {
        if (logoutData.data.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("phone");
          if (
            !localStorage.getItem("token") &&
            !localStorage.getItem("phone")
          ) {
            window.location = "/";
          }
        }
      }
    }
  }, [logoutData]);

  //change language
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "en") {
      dispatch(langEn());
      window.location.reload();
    }

    if (lang === "ar") {
      dispatch(langAr());
      window.location.reload();
    }
  };

  return (
    <div
      dir={langDetection === "en" ? "ltr" : "rtl"}
      className={`fixed left-0 top-0 overflow-y-auto z-[999] w-full pb-5 h-screen bg-mainColor flex flex-col gap-10 items-center justify-start pt-5 ${
        showMenu ? "ml-0" : "ml-[-100%]"
      } duration-300`}
    >
      <div className="w-full px-10 pt-8 flex items-center justify-between">
        {/* <div className="p-2 border border-white/50 rounded-lg"> */}
        <img
          width={25}
          height={25}
          src={Close}
          alt="close"
          onClick={() => setShowMenu(false)}
        />
        {/* </div> */}
      </div>
      <ul className="navbar w-[90%] mr-auto flex flex-col mx-auto items-center gap-8">
        <li className="w-full text-center relative mt-[-8px] mb-5 pb-4 line-mobile-menu">
          <NavLink
            to={"/"}
            onClick={() => setShowMenu(false)}
            className="text-xl capitalize relative pb-3 text-white hover:text-mainColor duration-300 font-semibold"
          >
            {t("home")}
          </NavLink>
        </li>

        {navbarLinks?.map((item) => (
          <li
            key={item?.id}
            className="w-full text-center mt-[-8px] mb-5 line-mobile-menu relative last-of-type:mb-0"
          >
            <NavLink
              to={`/pages/${item?.key}`}
              onClick={(e) => {
                setSelectedSubmenu(item?.id);
                selectedSubmenu === item?.id && setSelectedSubmenu(null);
                item?.sub_pages.length > 0
                  ? e.preventDefault()
                  : setShowMenu(null);
                item?.key === "donation_gift" &&
                  token === null &&
                  (e.preventDefault(), setShowLogin(true));
              }}
              className="sub-menu capitalize flex flex-col items-center gap-1 text-lg pb-3 text-white duration-300 font-semibold"
            >
              <div className="flex gap-2 items-center">
                {item?.title}
                {item?.sub_pages.length > 0 && (
                  <>
                    {selectedSubmenu === item?.id ? (
                      <FontAwesomeIcon
                        className="text-base text-white"
                        icon={faMinus}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-base text-white"
                        icon={faPlus}
                      />
                    )}
                  </>
                )}
              </div>
              {item?.sub_pages.length > 0 ? (
                <ul
                  className={`${
                    selectedSubmenu === item?.id
                      ? "flex flex-col gap-2"
                      : "hidden"
                  } w-[250px]  rounded-b-lg`}
                >
                  {item?.sub_pages?.map((link) => (
                    <li
                      key={link?.id}
                      className="w-full relative sub-menu-inner"
                    >
                      <Link
                        to={`/pages/${link?.key}`}
                        className={`text-white flex items-center capitalize justify-center text-center gap-3 py-3 text-base font-semibold hover:bg-mainColor hover:text-white duration-300`}
                        onClick={(e) => {
                          if (link?.sub_pages.length > 0) {
                            console.log(link?.id)
                            e.preventDefault();
                            e.stopPropagation()
                            setSubOfSub(link?.id)
                            subOfSub === link?.id && setSubOfSub(null);
                            return;
                          }

                          if (link?.key === "donation_gift" && token === null) {
                            e.preventDefault();
                            errorMsg(t("please login first"));
                            return;
                          }

                          setShowMenu(null);
                        }}
                      >
                        {/* ddddddddddddddddddddddddddddddd */}
                        {link?.title}
                        {link?.sub_pages.length > 0 ? (
                          <>
                            {subOfSub === link?.id ? (
                              <FontAwesomeIcon
                                className="text-base text-white"
                                icon={faMinus}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="text-base text-white"
                                icon={faPlus}
                              />
                            )}
                          </>
                        ) : null}
                      </Link>
                      {link?.sub_pages.length > 0 ? (
                        <ul
                          className={`w-full cursor-default ${
                            subOfSub === link?.id
                              ? "flex flex-col items-center mx-auto gap-2"
                              : "hidden"
                          }  items-center rounded-l-md w-[150px]`}
                        >
                          {link?.sub_pages?.map((link) => (
                            <li key={link?.id}> 
                              <Link
                                onClick={(e) => {
                                  link?.key === "donation_gift" &&
                                  token === null
                                    ? (e.preventDefault(), setShowLogin(true))
                                    : setShowMenu(null);
                                }}
                                className="text-center pb-2 flex items-center capitalize gap-3  pl-2 py-2 text-base text-white font-semibold hover:bg-mainColor hover:text-white duration-300"
                                to={`/pages/${link?.key}`}
                              >
                                {link?.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-8">
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

      <div className="flex items-center gap-3">
        {token !== null && (
          <div
            onClick={() => dispatch(logoutUser())}
            className="flex items-center gap-2 text-lg font-bold p-3 border bg-white rounded-lg text-mainColor"
          >
            {t("logout")}
            <FontAwesomeIcon
              className="text-xl"
              icon={faArrowRightFromBracket}
            />
          </div>
        )}

        <div className="flex  gap-2 text-lg font-bold px-3 py-1 border border-white rounded-lg text-white">
          {langDetection === "en" ? (
            <div
              onClick={() => changeLang("ar")}
              className="flex items-center gap-2"
            >
              <img width={40} src={SaudiFlag} alt="saudi-flag" />
              <p className="pt-1">العربية</p>
            </div>
          ) : (
            <div
              onClick={() => changeLang("en")}
              className="flex items-center gap-2"
            >
              <img width={40} src={KingdomFlag} alt="saudi-flag" />
              <p className="pt-1">الإنجليزية</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
