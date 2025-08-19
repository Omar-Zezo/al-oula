import { Link } from "react-router-dom"
import { Logo, Menu } from "../images/svg"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const MobileNav = ({setShowMenu}) => {
  return (
    <div className='w-full absolute z-50 flex items-center xl:hidden justify-between left-0 px-5'>
        {/* <div className="size-[60px] border flex items-center justify-center border-mainColor rounded-full">
            <div className="size-[55px] rounded-full flex justify-center items-center bg-slate-500">
            <p className="text-2xl text-white font-semibold">OA</p>
            </div>
        </div> */}
        <div className="w-[100px] p-2 bg-white rounded-bl-2xl">
            <Link to="/">
            <img src={Logo} alt="logo" className="size-full"/>
            </Link>
        </div>
        <div className="size-12 flex justify-center items-center rounded-lg"
        onClick={()=> setShowMenu(true)}
        >
          <img width={45} src={Menu} alt="menu" />
        </div>
    </div>
  )
}

export default MobileNav