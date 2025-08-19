import {
  faCartShopping,
  faClipboard,
  faFileInvoice,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../../store/slices/auth/logout";
import { t } from "i18next";

const NavigationProfile = () => {
  const logoutData = useSelector((state) => state.logout);

  const dispatch = useDispatch()

  useEffect(()=>{
    if(logoutData){
      if(logoutData.data){
        if(logoutData.data.status === 200){
          localStorage.removeItem("token")
          localStorage.removeItem("phone")
          if (!localStorage.getItem("token") && !localStorage.getItem("phone")) {
            window.location = '/';
          }
        }
      }
    }
  },[logoutData])

  return (
    <div className="overflow-x-auto">
      <ul className="profile-nav w-full max-xl:overflow-x-auto flex items-center justify-center xl:gap-10 gap-5 mx-auto bg-gray-200 xl:px-10 px-5 py-5 rounded-md">
        <li className="xl:w-fit">
          <NavLink
            end
            to="/profile"
            className="py-2 px-3 flex font-semibold text-slate-900 items-center gap-3 bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon className="text-xl" icon={faUser} />
            <p className="text-base max-xl:hidden">{t('personal information')}</p>
          </NavLink>
        </li>

        <li className="xl:w-fit">
          <NavLink
            to="/profile/donation-record"
            className="py-2 px-3 flex text-slate-900 font-semibold items-center gap-3 bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon className="text-xl" icon={faClipboard} />
            <p className="text-base max-xl:hidden">{t('donation record')}</p>
          </NavLink>
        </li>

        <li className="xl:w-fit">
          <NavLink
            to="/profile/cart"
            className="py-2 px-3 flex font-semibold text-slate-900 items-center gap-3 bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
            <p className="text-base max-xl:hidden">{t('donation cart')}</p>
          </NavLink>
        </li>

        <li className="xl:w-fit">
          <NavLink
            to="/profile/my-bills"
            className="py-2 px-3 flex text-slate-900 font-semibold items-center gap-3 bg-gray-100 rounded-md"
          >
            <FontAwesomeIcon className="text-xl" icon={faFileInvoice} />
            <p className="text-base max-xl:hidden">{t('my bills')}</p>
          </NavLink>
        </li>

        <li className="xl:w-fit">
          <button 
          onClick={()=>{
            dispatch(logoutUser())
          }}
          className="py-2 px-3 flex text-slate-900 font-semibold items-center gap-3 bg-gray-100 hover:bg-red-500 hover:text-white duration-300 rounded-md">
            <FontAwesomeIcon className="text-xl" icon={faPowerOff} />
            <p className="text-base max-xl:hidden">{t('logout')}</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationProfile;
