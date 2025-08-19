import { MaintenanceImg } from "../images/imgs";


const Maintenance = ({message}) => {

  return <div className="h-screen flex items-center justify-center">
    <div className="size-fit flex flex-col justify-center items-center gap-10">
    <img src={MaintenanceImg} alt="maintenance" className="w-full xl:w-1/2"/>
    <p className="text-3xl text-[#444] font-semibold">{message}</p>
    </div>
  </div>
};

export default Maintenance;
