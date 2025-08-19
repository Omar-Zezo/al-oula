import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { DivShadow } from "../../images/imgs";

const NumCard = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // effect one time only
    threshold: 0.5, // start count when appear 50% of element 
  });

  return (
    <div
      ref={ref} // to watch ref div
      className="numbers xl:w-1/4 w-[47%] max-xl:mb-2 xl:px-10 px-5 xl:h-[99%] h-[300px] max-md:h-[200px] max-xl:bg-gradient-to-t from-[#814494] to-[#601079] max-xl:rounded-2xl overflow-hidden relative"
    >
      {index !== 3 && (
        <img
          src={DivShadow}
          alt="shadow"
          className="h-full absolute left-0 top-0 mask-image-gradient max-xl:hidden"
        />
      )}
      <img
        width={200}
        src={item?.icon_path}
        alt="shadow"
        className="icon max-xl:w-[80%] max-xl:left-1/2 max-xl:translate-x-[-50%] absolute max-xl:z-[1] left-0 bottom-5 opacity-25"
      />
      <div className="max-xl:w-full w-[80%] mx-auto xl:pt-10 flex max-xl:px-4 flex-col max-xl:h-fit max-xl:left-1/2 max-xl:translate-x-[-50%] max-xl:top-1/2 max-xl:translate-y-[-50%] items-center gap-2 xl:gap-4 z-10 absolute">
        {/* numbers count */}
        <p className="text-orange-400 text-[60px] max-xl:text-[40px] font-semibold">
          {inView ? <CountUp start={0} end={item?.value} separator="" duration={3} /> : 0}
        </p>
        <p className="text-white text-center text-3xl max-xl:text-xl font-semibold">
          {item?.name}
        </p>
      </div>
    </div>
  );
};

export default NumCard;
