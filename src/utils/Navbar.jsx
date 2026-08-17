import { Link, NavLink, useLocation } from "react-router-dom";
import TopNav from "../components/Navbar/TopNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNavbarLinks } from "../store/slices/utils/navbar";
import { useEffect, useState } from "react";
import { logoutUser } from "../store/slices/auth/logout";
import ChangeLang from "./ChangeLang";
import { t } from "i18next";

const Navbar = ({ setShowLogin, loggedUserInfo, settings, langDetection }) => {
  const [navbarLinks, setNavbarLinks] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [hiddenOnClick, setHiddenOnClick] = useState(false);
  const { data } = useSelector((state) => state.navbar);
  const logoutData = useSelector((state) => state.logout);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    setShowUserMenu(false);
  }, [pathname]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getNavbarLinks());
  }, []);

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

  //handel Hidden Submenu on click
  const handelHiddenOClick = () => {
    setHiddenOnClick(true);
    setTimeout(() => {
      setHiddenOnClick(false);
    }, 500);
  };

  //handel scroll nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      dir={langDetection === "en" ? "ltr" : "rtl"}
      className="w-full absolute z-[99] max-xl:hidden"
    >
      <div className="w-full relative">
        <TopNav
          stickyNav={stickyNav}
          settings={settings}
          langDetection={langDetection}
        />
        <div
          className={`w-full h-[90px] ${
            stickyNav && "fixed bg-mainColor shadow-xl"
          }`}
        >
          <div
            className={`container flex justify-between items-center ${
              stickyNav
                ? "fixed left-1/2 translate-x-[-50%] top-0 bg-mainColor py-4"
                : "bg-transparent py-8"
            }`}
          >
            <div
              className={`logo shadow-lg bg-white ${
                stickyNav ? "size-[150px]" : "size-[200px]"
              } duration-300 flex justify-center items-center ${
                langDetection === "en"
                  ? "rounded-br-[50px]"
                  : "rounded-bl-[50px]"
              } absolute z-10 top-0`}
            >
              <Link to="/">
                <img
                  src={settings?.logo}
                  alt="logo"
                  className={`${stickyNav ? "w-[110px]" : "w-[150px]"}`}
                />
              </Link>
            </div>

            <ul
              className={`navbar justify-center ${
                langDetection === "en" ? "pl-[200px]" : "pr-[200px]"
              } flex-1 flex items-center gap-3`}
            >
              <li>
                <NavLink
                  to={"/"}
                  className="text-base relative pb-3 capitalize text-white hover:text-mainColor duration-300 font-semibold link"
                >
                  {t("home")}
                </NavLink>
              </li>

              {langDetection === "en"
                ? navbarLinks?.slice(0, 3)?.map((item) => (
                    <li key={item?.id}>
                      <NavLink
                        to={`/pages/${item?.key}`}
                        onClick={(e) => {
                          item?.sub_pages.length > 0 && e.preventDefault();
                          item?.key === "donation_gift" &&
                            token === null &&
                            (e.preventDefault(), setShowLogin(true));
                        }}
                        className="link sub-menu capitalize flex items-center gap-1 text-base relative text-white hover:text-mainColor duration-300 font-semibold"
                      >
                        {item?.title}
                        {item?.sub_pages.length > 0 && (
                          <FontAwesomeIcon
                            className="text-base text-white"
                            icon={faAngleDown}
                          />
                        )}
                        {item?.sub_pages.length > 0 ? (
                          <ul
                            className={`inner-sub-menu w-[250px] shadow-lg  hidden rounded-lg bg-white absolute ${
                              langDetection === "en"
                                ? "left-0 rounded-tr-lg rounded-tl-none"
                                : "right-0 rounded-tr-none"
                            } top-[34px] z-10`}
                          >
                            {item?.sub_pages?.map((link) => (
                              <li
                                key={link?.id}
                                className="w-full relative sub-menu-inner"
                              >
                                <Link
                                  onClick={(e) => {
                                    link?.sub_pages.length > 0 &&
                                      e.preventDefault();
                                    link?.key === "donation_gift" &&
                                      token === null &&
                                      (e.preventDefault(), setShowLogin(true));
                                    link.sub_pages.length === 0 &&
                                      handelHiddenOClick();
                                  }}
                                  to={`/pages/${link?.key}`}
                                  className={`${
                                    hiddenOnClick ? "hidden" : "flex"
                                  } flex items-center gap-3 rounded-lg pr-5 pl-2 py-3 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
                                >
                                  {link?.title}
                                  {link?.sub_pages.length > 0 ? (
                                    langDetection === "en" ? (
                                      <FontAwesomeIcon
                                        className="text-lg"
                                        icon={faAngleRight}
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        className="text-lg"
                                        icon={faAngleLeft}
                                      />
                                    )
                                  ) : null}
                                </Link>
                                {link?.sub_pages.length > 0 ? (
                                  <ul
                                    className={`inner-sub-menu-inner shadow-xl border border-black/20 rounded-lg cursor-default hidden w-[150px] bg-white absolute ${
                                      langDetection === "en"
                                        ? "right-[-150px]"
                                        : "left-[-150px]"
                                    } top-0`}
                                  >
                                    {link?.sub_pages?.map((link) => (
                                      <li key={link?.id}>
                                        <Link
                                          onClick={(e) => {
                                            link?.key === "donation_gift" &&
                                              token === null &&
                                              (e.preventDefault(),
                                              setShowLogin(true));
                                            handelHiddenOClick();
                                          }}
                                          className="flex items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300"
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
                  ))
                : navbarLinks?.slice(0, 4)?.map((item) => (
                    <li key={item?.id}>
                      <NavLink
                        to={`/pages/${item?.key}`}
                        onClick={(e) => {
                          item?.sub_pages.length > 0 && e.preventDefault();
                          item?.key === "donation_gift" &&
                            token === null &&
                            (e.preventDefault(), setShowLogin(true));
                        }}
                        className="link sub-menu flex items-center gap-1 text-base relative text-white hover:text-mainColor duration-300 font-semibold"
                      >
                        {item?.title}
                        {item?.sub_pages.length > 0 && (
                          <FontAwesomeIcon
                            className="text-base text-white"
                            icon={faAngleDown}
                          />
                        )}
                        {item?.sub_pages.length > 0 ? (
                          <ul
                            className={`inner-sub-menu w-[250px] shadow-lg  hidden rounded-lg rounded-tr-none bg-white absolute right-0 top-[34px] z-10`}
                          >
                            {item?.sub_pages?.map((link) => (
                              <li
                                key={link?.id}
                                className="w-full relative sub-menu-inner"
                              >
                                <Link
                                  onClick={(e) => {
                                    link?.sub_pages.length > 0 &&
                                      e.preventDefault();
                                    link?.key === "donation_gift" &&
                                      token === null &&
                                      (e.preventDefault(), setShowLogin(true));
                                    link.sub_pages.length === 0 &&
                                      handelHiddenOClick();
                                  }}
                                  to={`/pages/${link?.key}`}
                                  className={`${
                                    hiddenOnClick ? "hidden" : "flex"
                                  } flex items-center gap-3 rounded-lg pr-5 pl-2 py-3 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
                                >
                                  {link?.title}
                                  {link?.sub_pages.length > 0 ? (
                                    <FontAwesomeIcon
                                      className="text-lg"
                                      icon={faAngleLeft}
                                    />
                                  ) : null}
                                </Link>
                                {link?.sub_pages.length > 0 ? (
                                  <ul className="inner-sub-menu-inner shadow-xl border border-black/20 rounded-lg cursor-default hidden w-[150px] bg-white absolute left-[-150px] top-0">
                                    {link?.sub_pages?.map((link) => (
                                      <li key={link?.id}>
                                        <Link
                                          onClick={(e) => {
                                            link?.key === "donation_gift" &&
                                              token === null &&
                                              (e.preventDefault(),
                                              setShowLogin(true));
                                            handelHiddenOClick();
                                          }}
                                          className="flex items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300"
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

              {/* start handel other links */}
              {langDetection === "en" ? (
                navbarLinks?.length > 4 ? (
                  <li className="link other-links text-base relative pb-3 flex items-center gap-1 cursor-default capitalize text-white hover:text-mainColor duration-300 font-semibold link">
                    {t("other links")}
                    <FontAwesomeIcon className="text-lg" icon={faAngleDown} />
                    {navbarLinks?.length > 4 ? (
                      <ul
                        className={`inner-sub-menu w-[250px] shadow-lg hidden rounded-lg bg-white absolute ${
                          langDetection === "en"
                            ? "left-0 rounded-tr-lg rounded-tl-none"
                            : "right-0 rounded-tr-none"
                        } top-[34px] z-10`}
                      >
                        {navbarLinks?.slice(3)?.map((item) => (
                          <li
                            key={item?.id}
                            className="other-links-sub relative"
                          >
                            <Link
                              onClick={(e) => {
                                item?.sub_pages.length > 0 &&
                                  e.preventDefault();
                                item?.key === "donation_gift" &&
                                  token === null &&
                                  (e.preventDefault(), setShowLogin(true));
                                item.sub_pages.length === 0 &&
                                  handelHiddenOClick();
                              }}
                              className={`${
                                hiddenOnClick ? "hidden" : "flex"
                              } items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
                              to={`/pages/${item?.key}`}
                            >
                              {item?.title}
                              {item?.sub_pages.length > 0 ? (
                                langDetection === "en" ? (
                                  <FontAwesomeIcon
                                    className="text-lg"
                                    icon={faAngleRight}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="text-lg"
                                    icon={faAngleLeft}
                                  />
                                )
                              ) : null}
                            </Link>

                            {item?.sub_pages.length > 0 ? (
                              <ul
                                className={`inner-sub-menu-inner shadow-xl border border-black/20 rounded-lg cursor-default hidden w-[150px] bg-white absolute ${
                                  langDetection === "en"
                                    ? "right-[-150px]"
                                    : "left-[-150px]"
                                } top-0`}
                              >
                                {item?.sub_pages?.map((link) => (
                                  <li key={link?.id}>
                                    <Link
                                      onClick={(e) => {
                                        link?.sub_pages.length > 0 &&
                                          e.preventDefault();
                                        link?.key === "donation_gift" &&
                                          token === null &&
                                          (e.preventDefault(),
                                          setShowLogin(true));
                                        link.sub_pages.length === 0 &&
                                          handelHiddenOClick();
                                      }}
                                      className={`${
                                        hiddenOnClick ? "hidden" : "flex"
                                      } flex items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
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
                  </li>
                ) : null
              ) : navbarLinks?.length > 5 ? (
                <li className="link other-links text-base relative pb-3 flex items-center gap-1 cursor-default capitalize text-white hover:text-mainColor duration-300 font-semibold link">
                  {t("other links")}
                  <FontAwesomeIcon className="text-lg" icon={faAngleDown} />
                  {navbarLinks?.length > 4 ? (
                    <ul
                      className={`inner-sub-menu w-[250px] shadow-lg hidden rounded-lg bg-white absolute ${
                        langDetection === "en"
                          ? "left-0 rounded-tr-lg rounded-tl-none"
                          : "right-0 rounded-tr-none"
                      } top-[34px] z-10`}
                    >
                      {navbarLinks?.slice(4)?.map((item) => (
                        <li key={item?.id} className="other-links-sub relative">
                          <Link
                            onClick={(e) => {
                              item?.sub_pages.length > 0 && e.preventDefault();
                              item?.key === "donation_gift" &&
                                token === null &&
                                (e.preventDefault(), setShowLogin(true));
                              item.sub_pages.length === 0 &&
                                handelHiddenOClick();
                            }}
                            className={`${
                              hiddenOnClick ? "hidden" : "flex"
                            } items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
                            to={`/pages/${item?.key}`}
                          >
                            {item?.title}
                            {item?.sub_pages.length > 0 ? (
                              langDetection === "en" ? (
                                <FontAwesomeIcon
                                  className="text-lg"
                                  icon={faAngleRight}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  className="text-lg"
                                  icon={faAngleLeft}
                                />
                              )
                            ) : null}
                          </Link>

                          {item?.sub_pages.length > 0 ? (
                            <ul
                              className={`inner-sub-menu-inner shadow-xl border border-black/20 rounded-lg cursor-default hidden w-[150px] bg-white absolute ${
                                langDetection === "en"
                                  ? "right-[-150px]"
                                  : "left-[-150px]"
                              } top-0`}
                            >
                              {item?.sub_pages?.map((link) => (
                                <li key={link?.id}>
                                  <Link
                                    onClick={(e) => {
                                      link?.sub_pages.length > 0 &&
                                        e.preventDefault();
                                      link?.key === "donation_gift" &&
                                        token === null &&
                                        (e.preventDefault(),
                                        setShowLogin(true));
                                      link.sub_pages.length === 0 &&
                                        handelHiddenOClick();
                                    }}
                                    className={`${
                                      hiddenOnClick ? "hidden" : "flex"
                                    } items-center gap-3 rounded-lg pr-5 pl-2 py-2 text-base text-secondryColor font-semibold hover:bg-mainColor hover:text-white duration-300`}
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
                </li>
              ) : null}
              {/* end handel other links */}
            </ul>

            <div className=" flex items-center relative gap-5 mr-5">
              <ChangeLang
                stickyNav={stickyNav}
                showLangMenu={showLangMenu}
                setShowLangMenu={setShowLangMenu}
              />
              {loggedUserInfo ? (
                <div
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`h-[48px] ${
                    showUserMenu ? "rounded-t-lg" : "rounded-lg"
                  } relative px-4 flex items-center ${
                    stickyNav
                      ? "bg-white text-mainColor shadow-base"
                      : `${
                          langDetection === "en"
                            ? "text-mainColor bg-[#C6ABCE]"
                            : "text-white bg-mainColor"
                        }`
                  } justify-center hover:translate-x-[-4px] duration-300 cursor-pointer gap-2`}
                >
                  <p className="text-base font-medium">{t("welcome")}</p>
                  <p className="text-base font-medium">
                    {loggedUserInfo?.phone}
                  </p>
                  <ul
                    className={`${langDetection === "en" ? "w-[200px] rounded-tl-none" : "w-[175px] rounded-tr-none"} ${
                      showUserMenu ? "flex" : "hidden"
                    } flex flex-col gap-2 ${
                      stickyNav
                        ? "bg-white text-mainColor"
                        : langDetection === "en"
                          ? "bg-[#C6ABCE] text-mainColor"
                          : "bg-mainColor text-white"
                    } rounded-lg absolute ${langDetection === "en" ? "left-0" : "right-0"} bottom-[-100px]`}
                  >
                    <li>
                      <Link
                        onClick={() => setShowUserMenu(false)}
                        to={"/profile"}
                        className={`flex items-center border-b ${
                          stickyNav ? "border-black/20" : "border-white/50"
                        } justify-center gap-2 py-3 px-2 text-sm font-semibold rounded-t-lg duration-300`}
                      >
                        <FontAwesomeIcon className="text-lg" icon={faUser} />
                        {langDetection === "en" ? "Profile" : "الصفحة الشخصية"}
                      </Link>
                    </li>

                    <li>
                      <div
                        onClick={() => {
                          dispatch(logoutUser());
                          setShowUserMenu(false);
                        }}
                        className="flex items-center justify-center gap-2 py-3 px-2 text-base font-semibold rounded-b-lg duration-300"
                      >
                        <FontAwesomeIcon
                          className="text-lg"
                          icon={faArrowRightFromBracket}
                        />
                        {t("logout")}
                      </div>
                    </li>
                  </ul>
                </div>
              ) : (
                <div
                  onClick={() => setShowLogin(true)}
                  className={`h-[48px] px-3 flex items-center justify-center hover:translate-x-[-4px] duration-300 cursor-pointer gap-2 ${
                    stickyNav
                      ? "bg-white text-mainColor"
                      : "bg-mainColor text-white"
                  } rounded-lg`}
                >
                  <p className="text-base font-medium">
                    {langDetection === "en" ? "Sign in" : "تسجيل الدخول"}
                  </p>
                  <FontAwesomeIcon className="text-lg" icon={faUser} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
