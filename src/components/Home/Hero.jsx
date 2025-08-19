import { ArrowDownHero } from "../../images/imgs";
import { Line, Wave } from "../../images/svg";
import HeroSlide from "./HeroSlide";
import { motion } from "framer-motion"

const Hero = ({langDetection}) => {
  return (
    <div className="w-full max-md:h-[320px] h-[600px] xl:h-[900px] relative overflow-hidden">
      <img
        src={Wave}
        alt="hero-shap-1"
        className="w-full absolute bottom-0 xl:bottom-[-10%] left-0 z-10"
      />
      <img
        src={Line}
        alt="hero-shap-1"
        className="w-full opacity-70 absolute bottom-0 left-0 z-50 max-xl:hidden"
      />
      <motion.div
        animate={{ y: [0, 20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 right-[10%] z-[15] max-xl:hidden"
      >
        <a href="#about">
        <img
          src={ArrowDownHero}
          width={80}
          alt="hero-arrow"
        />
      </a>
      </motion.div>
      <div>
        <HeroSlide langDetection={langDetection}/>
      </div>
    </div>
  );
};

export default Hero;
