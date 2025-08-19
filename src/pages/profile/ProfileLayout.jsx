import { Outlet, useNavigate } from "react-router-dom";
import { AboutCover } from "../../images/imgs";
import NavigationProfile from "../../components/Profile/NavigationProfile";
import Navbar from "../../utils/Navbar";
import Footer from "../../utils/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getPages } from "../../store/slices/pages/pages";
// import { getDonateOnline } from "../../store/slices/Home/donateOnline";
// import MobileNav from "../../utils/MobileNav";
// import MobileMenu from "../../utils/MobileMenu";
// import BottomNavigation from "../../utils/BottomNavigation";
import Login from "../../utils/Login";
// import StickyNavbar from "../../utils/StickyNavbar";
import { getLoggedUser } from "../../store/slices/auth/loggedUser";
import { getContactInfo } from "../../store/slices/Home/contactus";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../../utils/ScrollToTop";
import MobileNav from "../../utils/MobileNav";
import BottomNavigation from "../../utils/BottomNavigation";
import MobileMenu from "../../utils/MobileMenu";
import { Helmet } from "react-helmet";
import { SRW } from "../../images/svg";
import UseLangDetection from "../../hooks/UseLangDetection";
import { t } from "i18next";
import Maintenance from "../../utils/Maintenance";
import { getSettings } from "../../store/slices/utils/settings";

const ProfileLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState(null);
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const loggedUserData = useSelector((state) => state.loggedUser);
  const settingsData = useSelector((state) => state.settings);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const langDetection = UseLangDetection();

  useEffect(() => {
    dispatch(getContactInfo());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    }
  }, [token]);

  //get  loggeduser data
  useEffect(() => {
    if (loggedUserData) {
      if (loggedUserData.data) {
        if (loggedUserData.data.data) {
          if (loggedUserData.data.data) {
            if (loggedUserData.data.data.data) {
              setLoggedUserInfo(loggedUserData.data.data.data);
            }
          }
        }
      }
    }
  }, [loggedUserData]);

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  useEffect(() => {
    if (settingsData) {
      if (settingsData.data) {
        if (settingsData.data.data) {
          if (settingsData.data.data.data) {
            setSettings(settingsData.data.data.data);
          }
        }
      }
      if (settingsData?.error?.data?.message) {
        setMessage(settingsData?.error?.data?.message);
      }
    }
  }, [settingsData]);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token]);

  if (message === null) {
    return (
      <div>
        <ScrollToTop>
          <Helmet>
            <title>{`${settings?.name} - ${t("profile")}`}</title>
            <meta name="description" content={settings?.description} />
            <meta name="keywords" content={settings?.keywords} />
            <link rel="icon" type="image/png" href={settings?.icon}></link>
          </Helmet>
          <Navbar
            loggedUserInfo={loggedUserInfo}
            settings={settings}
            setShowLogin={setShowLogin}
            langDetection={langDetection}
          />
          <Login
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showOtp={showOtp}
            setShowOtp={setShowOtp}
          />
          {showOtp && <OtpCode showOtp={showOtp} setShowOtp={setShowOtp} />}
          <MobileNav showMenu={showMenu} setShowMenu={setShowMenu} />
          <BottomNavigation setShowLogin={setShowLogin} />
          <MobileMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            settings={settings}
          />
          <div>
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
              <p className="text-[40px] capitalize max-xl:text-3xl text-white font-semibold">
                {t("profile")}
              </p>
            </div>

            <div
              dir={langDetection === "en" ? "ltr" : "rtl"}
              className="container mt-20"
            >
              <NavigationProfile />
              <div className="mt-5 flex max-xl:flex-wrap gap-5">
                <div className="w-[30%] max-xl:order-2 max-xl:w-full h-fit bg-mainColor p-5 rounded-md">
                  <ul className="flex flex-col gap-5 items-center">
                    <li className="text-xl text-white font-semibold">
                      {t("membership ID")}: {loggedUserInfo?.membership_no}
                    </li>
                    <li className="flex flex-col items-center gap-2 text-xl text-secondryColor font-medium">
                      <p className="text-white text-lg font-semibold">
                        {t("number of donations")}
                      </p>
                      <p className="text-white text-base font-semibold">
                        <small className="text-orange-500 text-lg ml-2 font-bold">
                          {loggedUserInfo?.total_donations_count}
                        </small>{" "}
                        {t("donation")}
                      </p>
                    </li>
                    <li className="flex flex-col items-center gap-2 text-xl text-white font-medium">
                      <p className="text-white text-lg font-semibold">
                        {t("total donations")}
                      </p>
                      <p className="text-white flex items-center text-base font-semibold">
                        <small className="text-orange-500 text-lg mx-2 font-bold">
                          {loggedUserInfo?.total_donations_amount}
                        </small>{" "}
                        <img width={16} src={SRW} alt="ryal" />
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="w-full max-xl:order-1 bg-gray-50 rounded-md px-5 py-10">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <Footer settings={settings} langDetection={langDetection} />
          <ToastContainer cposition="top-center" className="z-[99999]" />
        </ScrollToTop>
      </div>
    );
  } else {
    return <Maintenance message={message} />;
  }
};

export default ProfileLayout;
