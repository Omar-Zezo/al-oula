import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { SR } from "../images/svg";
import { CreditCard, Mada } from "../images/imgs";
import { useDispatch, useSelector } from "react-redux";
import { getQuickDonations } from "../store/slices/donation/quickDonations";
import { toast } from "react-toastify";
import { makeQDonationPayment } from "../store/slices/donation/QDonationPayment";
import QHyperPayWidget from "./QHyperPayWidget";
import { t } from "i18next";

const QuickDonations = ({langDetection}) => {
  const [services, setServices] = useState(null);
  const [phone, setPhone] = useState(null);
  const [qty, setQty] = useState(1);
  const [paymentObj, setPaymentObj] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [donationDetails, setDonationDetails] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [showQuickDonation, setShowQuickDonation] = useState(false);
  const { data } = useSelector((state) => state.quickDonations);
  const donationPaymentData = useSelector((state) => state.QDonationPayment);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuickDonations());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setServices(data.data.data);
          setSelectedDonationId(data.data.data[0]?.id);
          setDonationDetails(data.data.data[0]);
        }
      }
    }
  }, [data]);

  const errorMsg = (msg) => toast.error(msg);
  const saudiPhonePattern = /^(05\d{8}|5\d{8})$/;

  // handel total amount with qty
  useEffect(()=>{
    setSelectedPrice(selectedPrice * qty)
  },[qty])

  const formSubmit = (e) => {
    e.preventDefault();
    if (saudiPhonePattern.test(phone)) {
      if (selectedPrice !== null && selectedPrice > 0) {
        if (selectedValue) {
          if (selectedValue === "MADA" || selectedValue === "VISA MASTER") {
            dispatch(
              makeQDonationPayment({
                service_id: donationDetails?.id,
                total_amount: selectedPrice,
                quantity: qty,
                phone,
                payment_ways:
                  selectedValue === "MADA" || selectedValue === "VISA MASTER"
                    ? "credit_card"
                    : "bank_transfer",
                payment_brand:
                  selectedValue === "MADA" || selectedValue === "VISA MASTER"
                    ? selectedValue
                    : "VISA MASTER",
                order_type: "quick",
              })
            );
          }
        } else {
          errorMsg("من فضلك قم بتحديد طريقة الدفع");
        }
      } else {
        errorMsg("من فضلك قم بتحديد مبلغ التبرع");
      }
    } else {
      errorMsg("نقبل الأرقام السعودية فقط");
    }
  };

  useEffect(() => {
    if (donationPaymentData) {
      if (donationPaymentData.data) {
        if (donationPaymentData.data.data) {
          if (donationPaymentData.data.data.data) {
            setPaymentObj(donationPaymentData.data.data.data);
            setShowPaymentPopup(true);
          }
        }
      }
    }
  }, [donationPaymentData]);

  useEffect(() => {
    if (donationDetails?.price_value === "fixed") {
      setSelectedPrice(donationDetails?.basic_service_value);
    }

    if (donationDetails?.price_value === "multi") {
      setSelectedPrice(null);
    }
  }, [donationDetails]);

  return (
    <div
      className={`${
        showQuickDonation
          ? "right-[-2px] xl:h-[480px]"
          : "right-[-14%] max-lg:right-[-58%]"
      } w-[25%] max-xl:w-[95%] rounded-l-lg fixed z-[99] top-[33%] overflow-y-auto border border-black/10 shadow-2xl duration-700`}
    >
      <div
        onClick={() => setShowQuickDonation(!showQuickDonation)}
        className="flex items-center justify-between"
      >
        <h5
          className={`w-full text-sm cursor-pointer h-[40px] pl-5 flex items-center ${
            showQuickDonation ? "justify-center" : "justify-end"
          }  border-b border-black/20 bg-white text-mainColor font-semibold duration-300`}
        >
          {t('donate quickly')}
        </h5>
        {showQuickDonation ? (
          <div
            onClick={() => {
              showPaymentPopup
                ? setShowQuickDonation(!showQuickDonation)
                : setShowQuickDonation(!showQuickDonation)
            }}
            className="w-fit h-10 px-2 flex items-center justify-center bg-[#A888B5] hover:bg-mainColor duration-300"
          >
            <FontAwesomeIcon
              className="text-2xl max-xl:text-lg text-white cursor-pointer"
              icon={faXmark}
            />
          </div>
        ) : (
          <div
            onClick={() => setShowQuickDonation(true)}
            className="w-fit h-10 px-2 flex items-center justify-center rounded-l-lg bg-[#A888B5]"
          >
            <FontAwesomeIcon
              className="text-2xl max-xl:text-lg text-white cursor-pointer"
              icon={faPlus}
            />
          </div>
        )}
      </div>

      {showPaymentPopup ? (
        <div
          className={`${
            showQuickDonation ? "flex" : "hidden"
          } payment-card size-full items-center justify-center relative top-0 left-0 pt-5 bg-white`}
        >
          <QHyperPayWidget paymentObj={paymentObj} />
        </div>
      ) : (
        <div
          className={`${
            showQuickDonation ? "flex" : "hidden"
          } w-full flex-col bg-white p-2 rounded-bl-lg`}
        >
          <ul className="flex items-center overflow-x-auto pb-2">
            {services?.map((service) => (
              <li
                onClick={() => {
                  setSelectedDonationId(service?.id);
                  setDonationDetails(service);
                  setSelectedPrice(null);
                }}
                className={`min-w-[100px] text-center shrink-0 py-3 px-2 ${
                  selectedDonationId === service?.id
                    ? "bg-[#C6ABCE] text-mainColor"
                    : "bg-mainColor text-white"
                } first-of-type:rounded-r-lg border-l last-of-type:rounded-l-lg border-white/30 text-base font-medium shadow-md cursor-pointer`}
              >
                {service?.title}
              </li>
            ))}
          </ul>
          <form
            className="w-full shrink-0 mt-3 flex flex-col"
            onSubmit={formSubmit}
          >
            {services?.map((service) =>
              service?.id === selectedDonationId ? (
                service?.price_value === "variable" ? (
                  <div className="flex flex-col gap-2">
                    <ul className="flex items-center gap-2 justify-center overflow-x-auto">
                      <li
                        onClick={(e) => setSelectedPrice(e.target.innerText)}
                        className={`min-w-[100px] flex items-center justify-center gap-2 shrink-0 p-2 text-center font-bold ${
                          selectedPrice === 10
                            ? "bg-mainColor text-white"
                            : "border border-mainColor text-mainColor"
                        } rounded-lg text-lg font-medium shadow-md cursor-pointer`}
                      >
                        10
                        <img width={15} src={SR} alt="ryal" />
                      </li>
                      <li
                        onClick={(e) => setSelectedPrice(e.target.innerText)}
                        className={`min-w-[100px] flex items-center justify-center gap-2 shrink-0 p-2 text-center font-bold ${
                          selectedPrice === 50
                            ? "bg-mainColor text-white"
                            : "border border-mainColor text-mainColor"
                        } rounded-lg text-lg font-medium shadow-md cursor-pointer`}
                      >
                        50
                        <img width={15} src={SR} alt="ryal" />
                      </li>
                      <li
                        onClick={(e) => setSelectedPrice(e.target.innerText)}
                        className={`min-w-[100px] flex items-center justify-center gap-2 shrink-0 p-2 text-center font-bold ${
                          selectedPrice === 100
                            ? "bg-mainColor text-white"
                            : "border border-mainColor text-mainColor"
                        } rounded-lg text-lg font-medium shadow-md cursor-pointer`}
                      >
                        100
                        <img width={15} src={SR} alt="ryal" />
                      </li>
                    </ul>
                    <div className="flex justify-between items-center p-3 border border-black/20 rounded-md">
                      <input
                        name="price"
                        type="number"
                        autoComplete="off"
                        value={selectedPrice > 0 ? selectedPrice:null}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        placeholder={t('donate price')}
                        className="w-[98%] text-center outline-none"
                      />
                      <img width={15} src={SR} alt="ryal" />
                    </div>

                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        className={`text-base p-2 bg-mainColor rounded-r-md mr-1 cursor-pointer text-white hover:bg-secondryColor duration-300`}
                        icon={faMinus}
                        onClick={() => {
                          if (qty > 1) {
                            setQty(qty - 1);
                          }
                        }}
                      />
                      <input
                        value={qty}
                        type="number"
                        className="w-[20%] p-1 text-center outline-none flex-1"
                        onChange={(e) => setQty(e.target.value)}
                        onFocus={() => setQty("")}
                      />
                      <FontAwesomeIcon
                        className="text-base p-2 bg-mainColor rounded-bl-md rounded-tl-md cursor-pointer text-white hover:bg-secondryColor duration-300"
                        icon={faPlus}
                        onClick={() => setQty(qty + 1)}
                      />
                    </div>


                    <input
                      name="phone"
                      type="tel"
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phone number')}
                      className="w-[98%] p-3 outline-mainColor border text-center border-black/20 rounded-md"
                    />
                  </div>
                ) : service?.price_value === "fixed" ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center p-3 border border-black/20 rounded-md">
                      <input
                        name="price"
                        type="number"
                        disabled
                        autoComplete="off"
                        value={selectedPrice}
                        placeholder={t('donate price')}
                        className="w-[98%] text-center outline-none"
                      />
                      <img width={15} src={SR} alt="ryal" />
                    </div>

                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        className={`text-base p-2 bg-mainColor rounded-r-md mr-1 cursor-pointer text-white hover:bg-secondryColor duration-300`}
                        icon={faMinus}
                        onClick={() => {
                          if (qty > 1) {
                            setQty(qty - 1);
                          }
                        }}
                      />
                      <input
                        value={qty}
                        type="number"
                        className="w-[20%] p-1 text-center outline-none flex-1"
                        onChange={(e) => setQty(e.target.value)}
                        onFocus={() => setQty("")}
                      />
                      <FontAwesomeIcon
                        className="text-base p-2 bg-mainColor rounded-bl-md rounded-tl-md cursor-pointer text-white hover:bg-secondryColor duration-300"
                        icon={faPlus}
                        onClick={() => setQty(qty + 1)}
                      />
                    </div>

                    <input
                      name="phone"
                      type="tel"
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phone number')}
                      className="w-[98%] p-3 outline-mainColor border text-center border-black/20 rounded-md"
                    />
                  </div>
                ) : service?.price_value === "multi" ? (
                  <div className="flex flex-col gap-2">
                    <ul className="flex items-center gap-2 justify-center overflow-x-auto">
                      {service?.multiple_service_values?.map((value, index) => (
                        <li
                          onClick={(e) => setSelectedPrice(e.target.innerText)}
                          className={`min-w-[100px] flex items-center justify-center gap-2 shrink-0 p-2 text-center font-bold ${
                            selectedPrice === index
                              ? "bg-mainColor text-white"
                              : "border border-mainColor text-mainColor"
                          } rounded-lg text-lg font-medium shadow-md cursor-pointer`}
                        >
                          {value}
                          <img width={15} src={SR} alt="ryal" />
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center p-3 border border-black/20 rounded-md">
                      <input
                        name="price"
                        type="number"
                        autoComplete="off"
                        disabled
                        value={selectedPrice > 0 ? selectedPrice:""}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        placeholder={t('donate price')}
                        className="w-[98%] text-center outline-none"
                      />
                      <img width={15} src={SR} alt="ryal" />
                    </div>

                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        className={`text-base p-2 bg-mainColor rounded-r-md mr-1 cursor-pointer text-white hover:bg-secondryColor duration-300`}
                        icon={faMinus}
                        onClick={() => {
                          if (qty > 1) {
                            setQty(qty - 1);
                          }
                        }}
                      />
                      <input
                        value={qty}
                        type="number"
                        className="w-[20%] p-1 text-center outline-none flex-1"
                        onChange={(e) => setQty(e.target.value)}
                        onFocus={() => setQty("")}
                      />
                      <FontAwesomeIcon
                        className="text-base p-2 bg-mainColor rounded-bl-md rounded-tl-md cursor-pointer text-white hover:bg-secondryColor duration-300"
                        icon={faPlus}
                        onClick={() => setQty(qty + 1)}
                      />
                    </div>



                    <input
                      name="phone"
                      type="tel"
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phone number')}
                      className="w-[98%] p-3 outline-mainColor border text-center border-black/20 rounded-md"
                    />
                  </div>
                ) : service?.price_value === "percent" ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center p-3 border border-black/20 rounded-md">
                      <input
                        name="price"
                        type="number"
                        autoComplete="off"
                        value={selectedPrice > 0 ? selectedPrice:""}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        placeholder={t('donate price')}
                        className="w-[98%] text-center outline-none"
                      />
                      <img width={15} src={SR} alt="ryal" />
                    </div>

                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        className={`text-base p-2 bg-mainColor rounded-r-md mr-1 cursor-pointer text-white hover:bg-secondryColor duration-300`}
                        icon={faMinus}
                        onClick={() => {
                          if (qty > 1) {
                            setQty(qty - 1);
                          }
                        }}
                      />
                      <input
                        value={qty}
                        type="number"
                        className="w-[20%] p-1 text-center outline-none flex-1"
                        onChange={(e) => setQty(e.target.value)}
                        onFocus={() => setQty("")}
                      />
                      <FontAwesomeIcon
                        className="text-base p-2 bg-mainColor rounded-bl-md rounded-tl-md cursor-pointer text-white hover:bg-secondryColor duration-300"
                        icon={faPlus}
                        onClick={() => setQty(qty + 1)}
                      />
                    </div>


                    <input
                      name="phone"
                      type="tel"
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('phone number')}
                      className="w-[98%] p-3 outline-mainColor border text-center border-black/20 rounded-md"
                    />
                  </div>
                ) : null
              ) : null
            )}
            <p className="w-full mt-5 text-center text-sm text-mainColor font-medium">
              {t('your donation will automatically go')}
            </p>
            <div className="w-full flex flex-col gap-2 mt-2">
              <label
                htmlFor="total"
                className={`text-base text-mainColor font-semibold ${langDetection === "en" ? 'text-left':'text-right'}`}
              >
                {t('choose payment method')}
              </label>
              <div className="flex justify-center flex-wrap gap-5 items-center rounded-md">
                <label
                  className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-5 py-2 ${
                    selectedValue === "MADA" ? "bg-mainColor text-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_ways"
                    value="MADA"
                    checked={selectedValue === "MADA"}
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                      localStorage.setItem("payment_brand", e.target.value);
                    }}
                    className="mr-2 hidden"
                  />
                  <img
                    width={50}
                    src={Mada}
                    alt="CreditCard"
                    className="ml-2"
                  />
                </label>

                <label
                  className={`w-fit text-mainColor flex items-center text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-5 py-2 ${
                    selectedValue === "VISA MASTER"
                      ? "bg-mainColor text-white"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_ways"
                    value="VISA MASTER"
                    checked={selectedValue === "VISA MASTER"}
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                      localStorage.setItem("payment_brand", e.target.value);
                    }}
                    className="mr-2 hidden"
                  />
                  <img width={60} src={CreditCard} alt="CreditCard" />
                </label>
              </div>
            </div>
            <button className="w-full bg-mainColor hover:bg-secondryColor duration-300 text-white rounded-lg mt-2 py-2 text-lg font-semibold">
            {t('donate now')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuickDonations;