import { NavLink } from "react-router-dom";
import { CustomerService } from "../images/svg";
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomNavigation = ({setShowLogin}) => {

  const token = localStorage.getItem("token")

  return (
    <div className="xl:hidden xl:w-[70%] xl:right-1/2 xl:translate-x-[-20%] xl:mt-10 xl:mb-5 xl:rounded-[50px] max-xl:fixed bottom-[-1px] left-0 z-30 w-full py-2 px-3 bg-gradient-to-r from-[#814494] to-[#C6ABCE]">
      <ul className="list-none bottom-nav w-full flex items-center justify-around">
      <li className="relative">
          <NavLink to="/" className="size-10 flex justify-center items-center rounded-full duration-300">
          <FontAwesomeIcon className="text-xl text-white" icon={faHouse} />
          </NavLink>
        </li>
        <li className="relative">
          <NavLink to="/profile" end className="size-10 flex justify-center items-center rounded-full duration-300"
          onClick={(e)=> {
            token ? (
              true
            ):(
              e.preventDefault(),
              setShowLogin(true)
            )
          }}
          >
          <FontAwesomeIcon className="text-xl text-white" icon={faUser} />
          </NavLink>
        </li>
        <li className="relative">
          <NavLink to="/profile/cart" className="size-10 flex justify-center items-center rounded-full duration-300">
          <FontAwesomeIcon className="text-xl text-white" icon={faCartShopping} />
          </NavLink>
        </li>
        <li className="relative" onClick={() => setShowMenu(true)}>
          <NavLink to="/pages/call_us" className="size-10 flex justify-center items-center rounded-full duration-300">
          <img width={25} height={25} src={CustomerService} alt={"donate"} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
