import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopNav = ({ settings, stickyNav, langDetection }) => {
  return (
    <div className={`bg-mainColor ${stickyNav && 'hidden'} rounded-b-[30px] shadow-2xl shadow-white`}>
      <div className="container py-3">
        <div className={`w-fit ${langDetection === "en" ? 'ml-auto':'mr-auto'} flex items-center gap-8`}>
          <a target="_blanck" href={settings?.social?.whatsapp}>
            <FontAwesomeIcon className="text-xl text-white" icon={faWhatsapp} />
          </a>
          <a target="_blanck" href={settings?.social?.linkedin}>
            <FontAwesomeIcon
              className="text-xl text-white"
              icon={faLinkedinIn}
            />
          </a>
          <a target="_blanck" href={settings?.social?.youtube}>
            <FontAwesomeIcon className="text-xl text-white" icon={faYoutube} />
          </a>
          <a target="_blanck" href={settings?.social?.instagram}>
            <FontAwesomeIcon
              className="text-xl text-white"
              icon={faInstagram}
            />
          </a>
          <a target="_blanck" href={settings?.social?.twitter}>
            <FontAwesomeIcon className="text-xl text-white" icon={faXTwitter} />
          </a>
          <a target="_blanck" href={settings?.social?.facebook}>
            <FontAwesomeIcon
              className="text-xl text-white"
              icon={faFacebookF}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
