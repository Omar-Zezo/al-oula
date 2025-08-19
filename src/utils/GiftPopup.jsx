import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HyperPayWidget from "./HyperPayWidget";
import { makeGiftOrderInService } from "../store/slices/gifts/giftOrderInService";
import { SR, Bank } from "../images/svg";
import { CreditCard, Mada } from "../images/imgs";
import UseSettings from "../hooks/UseSettings";
import { t } from "i18next";


const GiftPopup = ({
  showGiftPopUp,
  setShowGiftPopUp,
  giftDetails,
  multiPrice,
  totalAmount
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [paymentObj, setPaymentObj] = useState(null);
  const [total_amount, setTotal_amount] = useState(null);
  const [recipient_name, setRecipient_name] = useState("");
  const [recipient_phone, setRecipient_phone] = useState("");
  const { data } = useSelector((state) => state.giftOrderInService);
  const dispatch = useDispatch();

  const errorMsg = (msg) => toast.error(msg);
  const settings = UseSettings()


  useEffect(() => {
    setTotal_amount(multiPrice);
  }, [multiPrice]);

  useEffect(() => {
    setTotal_amount(totalAmount);
  }, [totalAmount]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      recipient_name !== "" &&
      recipient_phone !== "" &&
      selectedValue !== ""
    ) {
      if (selectedValue === "MADA" || selectedValue === "VISA MASTER") {
        dispatch(
          makeGiftOrderInService({
            service_id: giftDetails?.id,
            total_amount: total_amount,
            recipient_name,
            recipient_phone,
            payment_ways:
              selectedValue === "MADA" || selectedValue === "VISA MASTER"
                ? "credit_card"
                : "bank_transfer",
            payment_brand:
              selectedValue === "MADA" || selectedValue === "VISA MASTER"
                ? selectedValue
                : "VISA MASTER",
          })
        );
      }

      if (selectedValue === "bank_transfer") {
        dispatch(
          makeGiftOrderInService({
            service_id: giftDetails?.id,
            total_amount: total_amount,
            recipient_name,
            recipient_phone,
            payment_ways: "bank_transfer",
            payment_brand: "VISA MASTER",
          })
        );
      }
    } else {
      errorMsg(t('please complete all fields'));
    }
  };

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.checkout_id) {
            setPaymentObj(data.data.data);
          }
          if (data.data.data.donation_code) {
            window.location = `/bank_transfer/${data.data.data.donation_code}`;
          }
        }
      }
    }
  }, [data]);


  return (
    <div
      onClick={() => {
        setShowGiftPopUp(false);
      }}
      className={`fixed top-0 left-0 z-[99999] ${
        showGiftPopUp ? "flex" : "hidden"
      } justify-center items-center size-full bg-mainColor/90`}
    >
      <div
        className={`w-full lg:w-[650px] rounded-xl relative ${paymentObj ? 'bg-transparent':'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${paymentObj ? 'hidden':'flex'} bg-gray-200 items-center justify-between px-4 py-5 rounded-t-xl`}>
          <p className="text-xl text-secondryColor font-bold">
           {t('pay now')} - {giftDetails?.title}
          </p>
          <FontAwesomeIcon
            className="text-xl text-zinc-500 cursor-pointer"
            icon={faX}
            onClick={() => setShowGiftPopUp(false)}
          />
        </div>

        {paymentObj ? (
          <div className="size-full flex items-center justify-center absolute top-0 left-0 payment-card">
            <HyperPayWidget paymentObj={paymentObj} />
          </div>
        ) : (
          <div className="flex flex-col p-5 gap-3 max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <h3 className="text-xl font-bold text-secondryColor">
              {giftDetails?.title}
            </h3>
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="price"
                  className="text-lg text-mainColor font-semibold"
                >
                  {t('price')}
                </label>
                <div className={`flex justify-between px-2 items-center bg-gray-300 rounded-md`}>
                  <input
                    id="price"
                    value={total_amount}
                    disabled
                    className="h-full w-[90%] py-2 px-5 outline-none text-base font-semibold bg-transparent"
                  />
                  <img width={15} src={SR} alt="ryal" />
                </div>
              </div>

              {/* <div className="flex flex-col gap-2">
                <label
                  htmlFor="qty"
                  className="text-lg text-mainColor font-semibold"
                >
                  الكمية
                </label>
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    type="numbr"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setTotal_amount(e.target.value * multiPrice);
                    }}
                    id="qty"
                    className="h-full w-full py-2 pr-5 outline-none text-base font-semibold bg-transparent"
                  />
                </div>
              </div> */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="qty"
                  className="text-lg text-mainColor font-semibold"
                >
                  {t('recipient name')}
                </label>
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    type="text"
                    value={recipient_name}
                    onChange={(e) => {
                      setRecipient_name(e.target.value);
                    }}
                    id="recipient_name"
                    className="h-full w-full py-2 px-5 outline-none text-base font-semibold bg-transparent"
                  />
                </div>
              </div>

              {/* <div className="flex flex-col gap-2">
                <label
                  htmlFor="total"
                  className="text-lg text-mainColor font-semibold"
                >
                  القيمة الإجمالية
                </label>
                <div className="flex justify-between items-center bg-gray-300 pl-5 rounded-md">
                  <input
                    id="total"
                    disabled
                    value={total_amount}
                    className="h-full w-[90%] py-2 pr-5 text-base outline-none font-semibold bg-transparent"
                  />
                </div>
              </div> */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="total"
                  className="text-lg text-mainColor font-semibold"
                >
                  {t('recipient phone')}
                </label>
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    type="tel"
                    id="recipient_phone"
                    autoComplete="off"
                    onChange={(e) => setRecipient_phone(e.target.value)}
                    value={recipient_phone}
                    className="h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="total"
                  className="text-lg text-mainColor font-semibold"
                >
                  {t('choose payment method')}
                </label>
                <div className="flex flex-wrap gap-5 items-center rounded-md">
                {
                    settings?.enable_bank_transfer ? (
                      <label
                      className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-5 py-2 ${
                        selectedValue === "bank_transfer"
                          ? "bg-mainColor text-white"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_ways"
                        value="bank_transfer"
                        checked={selectedValue === "bank_transfer"}
                        onChange={(e) => {
                          setSelectedValue(e.target.value);
                          localStorage.setItem("payment_brand", e.target.value);
                        }}
                        className="mr-2 hidden"
                      />
                      <img width={30} src={Bank} alt="CreditCard" className="mx-2"/>
                      {t('bank transfer')}
                    </label>
                    ):null
                  }


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
                      className="mx-2"
                    />
                    {t('mada')}
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
                    {t('credit card')}
                  </label>
                </div>
              </div>
              <input
                type="submit"
                value={t('pay now')}
                className="bg-mainColor rounded-lg py-2 cursor-pointer hover:bg-secondryColor hover:text-white duration-300 text-white font-semibold"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftPopup;
