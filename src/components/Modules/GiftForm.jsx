import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getGiftsCategories } from "../../store/slices/gifts/giftsCategories";
import { getGiftPayment } from "../../store/slices/gifts/giftPayment";
import { customStyles } from "../../constant";
import { getGiftsCards } from "../../store/slices/gifts/giftsCards";
import HyperPayPopup from "../../utils/HyperPayPopup";
import { useNavigate } from "react-router-dom";
import { CreditCard, Mada } from "../../images/imgs";
import { t } from "i18next";

const GiftForm = () => {
  const [giftsCategories, setGiftsCategories] = useState(null);
  const [showHyperPayPopup, setShowHyperPayPopup] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const [paymentObj, setPaymentObj] = useState(null);
  const [giftsCards, setGiftsCards] = useState(null);
  const [gift_category_id, setGift_category_id] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const giftsCategoriesData = useSelector((state) => state.giftsCategories);
  const giftsCardsData = useSelector((state) => state.giftsCards);
  const { data } = useSelector((state) => state.giftPayment);
  const loggedUserData = useSelector((state) => state.loggedUser);

  //get  loggeduser data
  useEffect(() => {
    if (loggedUserData) {
      if (loggedUserData.data) {
        if (loggedUserData.data.data) {
          if (loggedUserData.data.data) {
            if (loggedUserData.data.data.data) {
              setLoggedUserInfo(loggedUserData.data.data.data);
              console.log(loggedUserData.data.data.data);
            }
          }
        }
      }
    }
  }, [loggedUserData]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (loggedUserInfo) {
      setValue("sender_name", loggedUserInfo.name);
      setValue("sender_phone", loggedUserInfo.phone);
    }
  }, [loggedUserInfo, setValue]);

  const dispatch = useDispatch();

  const errorMsg = (msg) => toast.error(msg);

  useEffect(() => {
    dispatch(getGiftsCategories());
  }, []);

  //get gifts categories
  useEffect(() => {
    if (giftsCategoriesData?.data?.data?.data) {
      const formattedCategories = giftsCategoriesData.data.data.data.map(
        (category) => ({
          value: category.id,
          label: category.title,
        })
      );
      setGiftsCategories(formattedCategories);
    }
  }, [giftsCategoriesData]);

  //get gifts cards
  useEffect(() => {
    if (giftsCardsData) {
      if (giftsCardsData.data) {
        if (giftsCardsData.data.data) {
          if (giftsCardsData.data.data.data) {
            setGiftsCards(giftsCardsData.data.data.data);
          }
        }
      }
    }
  }, [giftsCardsData]);

  //submit gift form
  const formSubmit = (data) => {
    if (!selectedCard) {
      errorMsg(t('please select a gift card'));
    }
    if (!selectedValue) {
      errorMsg(t('please select payment method'));
    }
    if (selectedCard && selectedValue) {
      dispatch(
        getGiftPayment({
          total_amount: data.total_amount,
          sender_name: data.sender_name,
          sender_phone: data.sender_phone,
          recipient_name: data.recipient_name,
          recipient_phone: data.recipient_phone,
          recipient_email: data.recipient_email,
          gift_category_id,
          gift_card_id: selectedCard,
          payment_brand: selectedValue,
          payment_ways:
            selectedValue === "MADA" || selectedValue === "VISA MASTER"
              ? "credit_card"
              : "bank_transfer",
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data) {
          if (data.data.data) {
            if (data.data.data.checkout_id) {
              setPaymentObj(data.data.data);
              setShowHyperPayPopup(true);
            }
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form className="w-[90%] mx-auto" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex gap-5 flex-wrap">
          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="sender_name"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('sender name')}
            </label>
            <input
              id="sender_name"
              type="text"
              defaultValue={loggedUserInfo?.name}
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('sender name')}
              {...register("sender_name", {
                required: t('this field is required'),
              })}
            />
            <p className="mt-1 px-2 text-red-600 text-sm">
              {errors["sender_name"]?.message}
            </p>
          </div>

          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="sender_phone"
              className="text-base text-[#444] font-bold pr-2"
            >
              {t('sender phone')}
            </label>
            <input
              dir="ltr"
              id="sender_phone"
              autoComplete="off"
              type="phone"
              defaultValue={loggedUserInfo?.phone}
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('sender phone')}
              {...register("sender_phone", {
                required: t('this field is required'),
                pattern: {
                  value: /^(05\d{8}|5\d{8})$/,
                  message: t('we accept Saudi numbers only'),
                },
              })}
            />
            <p className="mt-1 px-2 text-red-600 text-sm">
              {errors["sender_phone"]?.message}
            </p>
          </div>

          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="total_amount"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('gift amount')}
            </label>
            <input
              id="total_amount"
              type="number"
              min={1}
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('gift amount')}
              {...register("total_amount", {
                required: t('this field is required'),
                validate: (value) =>
                  value > 0 || t('the value must be greater than 0'),
              })}
            />
            <p className="mt-1 pr-2 text-red-600 text-sm">
              {errors["total_amount"]?.message}
            </p>
          </div>

          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="sender_name"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('recipient name')}
            </label>
            <input
              id="recipient_name"
              type="text"
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('recipient name')}
              {...register("recipient_name", {
                required: t('this field is required'),
              })}
            />
            <p className="mt-1 px-2 text-red-600 text-sm">
              {errors["recipient_name"]?.message}
            </p>
          </div>

          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="sender_phone"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('recipient phone')}
            </label>
            <input
              dir="ltr"
              id="recipient_phone"
              autoComplete="off"
              type="phone"
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('recipient phone')}
              {...register("recipient_phone", {
                required: t('this field is required'),
                pattern: {
                  value: /^(05\d{8}|5\d{8})$/,
                  message: t('we accept Saudi numbers only'),
                },
                validate: (val) => {
                  if (val === watch("sender_phone")) {
                    return t("the recipient's number and sender's mobile number fields must be different");
                  }
                },
              })}
            />
            <p className="mt-1 px-2 text-red-600 text-sm">
              {errors["recipient_phone"]?.message}
            </p>
          </div>

          <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
            <label
              htmlFor="email"
              className="text-base text-[#444] font-bold pr-2"
            >
              {t('recipient email')}
            </label>
            <input
              id="email"
              type="email"
              className="bg-[#f1f1f1] rounded-[50px] p-4 text-base outline-none border"
              placeholder={t('recipient email')}
              {...register("recipient_email", {
                required: t('this field is required'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('invalid email'),
                },
              })}
            />
            <p className="mt-1 px-2 text-red-600 text-sm">
              {errors.recipient_email?.message}
            </p>
          </div>

          <div className="w-full grow flex flex-col gap-4">
            <label
              htmlFor="gender"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('choose a gift category')}
            </label>
            <Controller
              id="gift_category_id"
              name="gift_category_id"
              control={control}
              rules={{ required: t('this field is required')}}
              render={({ field }) => (
                <Select
                  {...field}
                  options={giftsCategories}
                  styles={customStyles}
                  placeholder={t('choose a gift category')}
                  className="bg-[#f1f1f1] rounded-[50px] p-2 text-base outline-none border"
                  onChange={(selectedOption) => {
                    setGift_category_id(selectedOption?.value);
                    dispatch(getGiftsCards(selectedOption?.value));
                    field.onChange(selectedOption);
                  }}
                />
              )}
            />
            <p className="px-2 text-red-600 text-sm font-medium">
              {errors["gift_category_id"]?.message}
            </p>
          </div>

          <div
            className={`w-full ${
              giftsCards ? "flex" : "hidden"
            } flex-col gap-2`}
          >
            <label
              htmlFor="total"
              className="text-base text-[#444] font-bold pr-2"
            >
              {t('choose a gift card')}
            </label>
            <div className="flex gap-5 items-center rounded-md">
              {giftsCards?.map((card) => (
                <label
                  key={card?.id}
                  className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:text-white duration-300 rounded-md px-5 py-2 ${
                    selectedCard === card?.id ? "bg-[#C6ABCE] text-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="gift_card_id"
                    value={card?.id}
                    checked={selectedCard === card?.id}
                    onChange={(e) => {
                      setSelectedCard(Number(e.target.value));
                    }}
                    className="mr-2 hidden"
                  />
                  <img
                    width={150}
                    height={150}
                    src={card?.card_path}
                    alt={card?.file_name}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="total"
              className="text-base text-[#444] font-bold px-2"
            >
              {t('choose payment method')}
            </label>
            <div className="flex flex-wrap gap-5 items-center rounded-md">
              {/* {settings?.enable_bank_transfer ? (
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
                  <img
                    width={30}
                    src={Bank}
                    alt="CreditCard"
                    className="ml-2"
                  />
                  تحويل بنكي
                </label>
              ) : null} */}

              <label
                className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor duration-300 rounded-[50px] px-5 py-2 ${
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
                <img width={50} src={Mada} alt="CreditCard" className="mx-2" />
                {t('mada')}
              </label>

              <label
                className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor duration-300 rounded-[50px] px-5 py-2 ${
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
        </div>

        <div className="flex flex-wrap gap-5 justify-between mt-10">
          <div className="max-md:w-full w-1/2 mx-auto flex flex-col gap-4">
            <input
              type="submit"
              value={t('add')}
              className="bg-mainColor hover:bg-secondryColor duration-300 p-4 text-lg text-white text-center cursor-pointer font-semibold rounded-xl"
            />
          </div>
        </div>
      </form>
      {showHyperPayPopup && (
        <HyperPayPopup
          showHyperPayPopup={showHyperPayPopup}
          setShowHyperPayPopup={setShowHyperPayPopup}
          paymentObj={paymentObj}
        />
      )}
    </div>
  );
};

export default GiftForm;
