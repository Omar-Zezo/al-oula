import { Outlet } from "react-router-dom";
import Navbar from "../utils/Navbar";
import Footer from "../utils/Footer";
import Login from "../utils/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../store/slices/auth/loggedUser";
import { ToastContainer } from "react-toastify";
import MobileNav from "../utils/MobileNav";
import MobileMenu from "../utils/MobileMenu";
import BottomNavigation from "../utils/BottomNavigation";
import QuickDonations from "../utils/QuickDonations";
import UseLangDetection from "../hooks/UseLangDetection";
import Maintenance from "../utils/Maintenance";
import { getSettings } from "../store/slices/utils/settings";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const [settings, setSettings] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const loggedUserData = useSelector((state) => state.loggedUser);
  const settingsData = useSelector((state) => state.settings);

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const langDetection = UseLangDetection();

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

  if (message === null) {
    return (
      <div className="overflow-hidden">
        <QuickDonations langDetection={langDetection} />
        <Navbar
          setShowLogin={setShowLogin}
          loggedUserInfo={loggedUserInfo}
          settings={settings}
          langDetection={langDetection}
        />
        <MobileNav showMenu={showMenu} setShowMenu={setShowMenu} />
        <BottomNavigation setShowLogin={setShowLogin} />
        <MobileMenu
          langDetection={langDetection}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          settings={settings}
        />
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          langDetection={langDetection}
        />
        <Outlet />
        <Footer settings={settings} langDetection={langDetection} />
        <ToastContainer position="top-center" className="z-[99999]" />
      </div>
    );
  } else {
    return <Maintenance message={message} />;
  }
};

export default Layout;
