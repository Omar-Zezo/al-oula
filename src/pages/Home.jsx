import { useEffect, useState } from "react";
import AboutusSection from "../components/Home/AboutusSection";
import AboutVideo from "../components/Home/AboutVideo";
import ArticalesSection from "../components/Home/ArticalesSection";
import DonationSection from "../components/Home/DonationSection";
import Hero from "../components/Home/Hero";
import NewsSection from "../components/Home/NewsSection";
import OurPrizes from "../components/Home/OurPrizes";
import Parteners from "../components/Home/Parteners";
import Statistics from "../components/Home/Statistics";
import DonateNowPopup from "../utils/DonateNowPopup";
import AboutUsSlider from "../components/Home/AboutUsSlider";
import ProgramsCards from "../components/Home/ProgramsCards";
import GiftPopup from "../utils/GiftPopup";
import ScrollToTop from "../utils/ScrollToTop";
import Login from "../utils/Login";
import OurPartners from "../components/Modules/OurPartners";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { getHeroSlider } from "../store/slices/Home/heroSlider";
import UseLangDetection from "../hooks/UseLangDetection";

const Home = () => {
  const [showGiftPopUp, setShowGiftPopUp] = useState(false);
  const [giftDetails, setGiftDetails] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const [showDonatePopUp, setShowDonatePopUp] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);
  const [multiPrice, setMultiPrice] = useState(null);
  const [slides, setSlides] = useState(null);
  const { data } = useSelector((state) => state.heroSlider);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeroSlider());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.data) {
            setSlides(data.data.data.data);
          }
        }
      }
    }
  }, [data]);

  const settings = UseSettings();
  const langDetection = UseLangDetection();

  const getDonation = (data, price) => {
    setDonationDetails(data);
    setGiftDetails(data);
    setMultiPrice(price);
  };

  return (
    <ScrollToTop>
      <Helmet>
        <title>{settings?.name}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!slides ? (
        <PageLoader />
      ) : (
        <div dir={langDetection === "en" ? "ltr":"rtl"}>
          <Hero langDetection={langDetection}/>
          <AboutusSection langDetection={langDetection}/>
          <AboutVideo langDetection={langDetection}/>
          <Statistics />
          <ProgramsCards langDetection={langDetection}/>
          <DonationSection
            setShowDonatePopUp={setShowDonatePopUp}
            getDonation={getDonation}
            setShowGiftPopUp={setShowGiftPopUp}
            setShowLogin={setShowLogin}
          />
          <AboutUsSlider />
          <Parteners langDetection={langDetection}/>
          <OurPartners />
          <ArticalesSection />
          <NewsSection />
          <OurPrizes />
          <DonateNowPopup
            donationDetails={donationDetails}
            showDonatePopUp={showDonatePopUp}
            setShowDonatePopUp={setShowDonatePopUp}
            multiPrice={multiPrice}
            qty={1}
          />
          <GiftPopup
            giftDetails={giftDetails}
            showGiftPopUp={showGiftPopUp}
            setShowGiftPopUp={setShowGiftPopUp}
            multiPrice={multiPrice}
          />
          <Login showLogin={showLogin} setShowLogin={setShowLogin} langDetection={langDetection}/>
        </div>
      )}
    </ScrollToTop>
  );
};

export default Home;
