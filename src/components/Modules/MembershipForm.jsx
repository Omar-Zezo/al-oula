import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { membershipJoin } from "../../store/slices/forms/membershipForm";
import { customStyles, memberShipContent } from "../../constant";
import HyperPayPopup from "../../utils/HyperPayPopup";
import BtnLoader from "../../utils/BtnLoader";
import UseSettings from "../../hooks/UseSettings";
import { Bank } from "../../images/svg";
import { CreditCard, Mada } from "../../images/imgs";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";
import Select from "react-select";


const MembershipForm = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [selectedMemberType, setSelectedMemberType] = useState(
    "Permanent Member - Annual Subscription 10,000 SAR"
  );
  const [descForType, setDescForType] = useState("");
  const [paymentObj, setPaymentObj] = useState(null);
  const [showHyperPayPopup, setShowHyperPayPopup] = useState(false);
  const membershipData = useSelector((state) => state.membershipForm);

  const dispatch = useDispatch();
  const settings = UseSettings();
  const langDetection = UseLangDetection()


  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const errorMsg = (msg) => toast.error(msg);

  // apply for a membership
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    if (selectedMemberType !== "") {
      if (selectedValue !== "") {
        if (selectedValue === "MADA" || selectedValue === "VISA MASTER") {
          dispatch(
            membershipJoin({
              full_name: data?.full_name,
              job_title: data?.job_title,
              email: data?.email,
              phone: data?.phone,
              ident_num: data.ident_num,
              release_date: data?.release_date,
              lssuer: data?.lssuer,
              nationality: data?.nationality,
              birthday: data?.birthday,
              city: data?.city,
              workplace: data?.workplace,
              membership_type: selectedMemberType,
              total_amount:
                selectedMemberType === "Permanent Member - Annual Subscription 10,000 SAR"
                  ? 10000
                  : selectedMemberType === "Active Member - Annual Subscription 1,000 SAR"
                  ? 1000
                  : selectedMemberType === "Affiliate Member - Annual Subscription 500 SAR"
                  ? 500
                  : 200,
              confirmed: data?.confirmed === true && "yes",
              payment_brand: selectedValue,
              payment_ways:
                selectedValue === "MADA" || selectedValue === "VISA MASTER"
                  ? "credit_card"
                  : "bank_transfer",
            })
          );
        }


        if (selectedValue === "bank_transfer") {
          dispatch(
            membershipJoin({
              full_name: data?.full_name,
              job_title: data?.job_title,
              email: data?.email,
              phone: data?.phone,
              ident_num: data.ident_num,
              release_date: data?.release_date,
              lssuer: data?.lssuer,
              nationality: data?.nationality,
              birthday: data?.birthday,
              city: data?.city,
              workplace: data?.workplace,
              membership_type: selectedMemberType,
              total_amount:
              selectedMemberType === "Permanent Member - Annual Subscription 10,000 SAR"
              ? 10000
              : selectedMemberType === "Active Member - Annual Subscription 1,000 SAR"
              ? 1000
              : selectedMemberType === "Affiliate Member - Annual Subscription 500 SAR"
              ? 500
              : 200,
              confirmed: data?.confirmed === true && "yes",
              payment_ways:
                selectedValue === "MADA" || selectedValue === "VISA MASTER"
                  ? "credit_card"
                  : "bank_transfer",
            })
          );
        }
      } else {
        errorMsg(t('please select payment method'));
      }
    } else {
      errorMsg(t('please select your membership type'));
    }
  };

  useEffect(() => {
    if (membershipData) {
      if (membershipData.data) {
        setShowBtnLoader(false);
        if (membershipData.data.data) {
          if (membershipData.data.data.data) {
            setPaymentObj(membershipData.data.data.data);
            if(membershipData.data.data.data.donation_code){
              window.location = `/bank_transfer/${membershipData.data.data.data.donation_code}`;
            }
            if(membershipData.data.data.data.checkout_id){
              setShowHyperPayPopup(true);
            }
          }
        }
      }
      if (membershipData.error) {
        setShowBtnLoader(false);
        if (membershipData.error.data) {
          if (membershipData.error.data.message) {
            errorMsg(membershipData.error.data.message);
          }
        }
      }
    }
  }, [membershipData]);

  useEffect(() => {
    if (selectedMemberType) {
      const contentForType = memberShipContent.filter(
        (content) => content.type === selectedMemberType
      );
      setDescForType(contentForType[0]);
    }
  }, [selectedMemberType]);


   const gender = [
      { value: "male", label: t('male') },
      { value: "female", label: t('female') },
    ];


  return (
    <div>
      <div className="container">
        <div className="flex flex-col gap-10">
          <ul className="flex overflow-x-auto pb-2 items-center gap-5">
            <li
              onClick={(e) => setSelectedMemberType("Permanent Member - Annual Subscription 10,000 SAR")}
              className={`px-2 py-3 ${
                selectedMemberType === "Permanent Member - Annual Subscription 10,000 SAR" || selectedMemberType === "عضوة دائمة - اشتراك سنوي 10,000 ريال"
                  ? "bg-mainColor text-white"
                  : "bg-white text-mainColor"
              } shadow-lg border border-black/20 text-base font-semibold rounded-lg cursor-pointer shrink-0`}
            >
              {t('permanent Member - Annual Subscription 10,000 SAR')}
            </li>
            <li
              onClick={(e) => setSelectedMemberType("Active Member - Annual Subscription 1,000 SAR")}
              className={`px-2 py-3 ${
                selectedMemberType === "Active Member - Annual Subscription 1,000 SAR" || selectedMemberType === "عضوة عاملة - اشتراك سنوي 1,000 ريال"
                  ? "bg-mainColor text-white"
                  : "bg-white text-mainColor"
              } shadow-lg border border-black/20 text-base font-semibold rounded-lg cursor-pointer shrink-0`}
            >
              {t('active Member - Annual Subscription 1,000 SAR')}
            </li>
            <li
              onClick={(e) => setSelectedMemberType("Affiliate Member - Annual Subscription 500 SAR")}
              className={`px-2 py-3 ${
                selectedMemberType === "Affiliate Member - Annual Subscription 500 SAR" || selectedMemberType === "عضوة منتسبة - اشتراك سنوي 500 ريال"
                  ? "bg-mainColor text-white"
                  : "bg-white text-mainColor"
              } shadow-lg border border-black/20 text-base font-semibold rounded-lg cursor-pointer shrink-0`}
            >
              {t('affiliate Member - Annual Subscription 500 SAR')}
            </li>
            <li
              onClick={(e) => setSelectedMemberType("Student Member - Annual Subscription 200 SAR")}
              className={`px-2 py-3 ${
                selectedMemberType === "Student Member - Annual Subscription 200 SAR" || selectedMemberType === "عضوة طالب/ة - اشتراك سنوي 200 ريال"
                  ? "bg-mainColor text-white"
                  : "bg-white text-mainColor"
              } shadow-lg border border-black/20 text-base font-semibold rounded-lg cursor-pointer shrink-0`}
            >
              {t('student Member - Annual Subscription 200 SAR')}
            </li>
          </ul>

          <div className="flex flex-col gap-4">
            <h4 className="text-xl capitalize text-[#444] font-semibold">
              {t(descForType?.title)}
            </h4>
            <p className="text-[#7e7e7e] text-lg font-medium">
              {t(descForType?.desc)}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="text-mainColor text-2xl font-semibold">
              {t('membership form')}
            </h4>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="flex flex-col gap-3">
                <p className="text-lg text-[#444] font-semibold">
                {t('personal information')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('full name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t('full name')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("full_name", {
                        required: t('this field is required'),
                        minLength: {
                          value: 3,
                          message: t('the name must be 3 letters or more'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.full_name?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="age"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('birthday')}
                    </label>
                    <input
                      id="birthday"
                      type="date"
                      placeholder={t('birthday')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] max-xl:w-full rounded-[50px]"
                      {...register("birthday", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.age?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="ident_num"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('id number')}
                    </label>
                    <input
                      id="ident_num"
                      type="number"
                      placeholder={t('id number')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("ident_num", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.ident_num?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="notional-id"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('release date')}
                    </label>
                    <input
                      id="release_date"
                      type="date"
                      placeholder={t('release date')}
                      className="p-5 outline-mainColor max-xl:w-full bg-[#f1f1f1] rounded-[50px]"
                      {...register("release_date", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.release_date?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="notional-id"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('issuer')}
                    </label>
                    <input
                      id="lssuer"
                      type="text"
                      placeholder={t('issuer')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("lssuer", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.lssuer?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="city"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('city')}
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder={t('city')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("city", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.city?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="nationality"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('gender')}
                    </label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: t('this field is required')}}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={gender}
                          styles={customStyles}
                          placeholder={t('gender')}
                          className="bg-[#f1f1f1] hover:outline-mainColor p-2 text-base rounded-[50px] outline-none border"
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.nationality?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <p className="text-lg text-[#444] font-semibold">
                {t('contact information')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('phone number')}
                    </label>
                    <input
                      id="phone"
                      autoComplete="off"
                      type="tel"
                      placeholder={t('phone number')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("phone", {
                        required: t('this field is required'),
                        pattern: {
                          value: /^(05\d{8}|5\d{8})$/,
                          message: t('we accept Saudi numbers only'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.phone?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t('email')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("email", {
                        required: t('this field is required'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('invalid email'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <p className="text-lg text-[#444] font-semibold">
                  {t('practical experiences')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="workplace"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('current place of work')}
                    </label>
                    <input
                      id="workplace"
                      type="text"
                      placeholder={t('current place of work')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("workplace", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.workplace?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="job_title"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('job title')}
                    </label>
                    <input
                      id="job_title"
                      type="text"
                      placeholder={t('job title')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("job_title", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.job_title?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <div className="flex flex-col gap-2">
                  <div className="w-full mx-auto flex gap-2 pr-5 items-center">
                    <input
                      id="confirmed"
                      type="checkbox"
                      className="p-5 size-4 accent-mainColor outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("confirmed", {
                        required:
                          t('please confirm that all the information you have provided is correct')
                      })}
                    />
                    <label
                      htmlFor="confirmed"
                      className="text-[#444] text-base font-medium"
                    >
                      {t('i hereby acknowledge')}
                    </label>
                  </div>
                  <p className="mt-1 pr-2 text-red-600 text-sm">
                    {errors.confirmed?.message}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="total"
                    className="text-base text-[#444] font-bold pr-2"
                  >
                    {t('choose payment method')}
                  </label>
                  <div className="flex flex-wrap gap-5 items-center rounded-md">
                    {settings?.enable_bank_transfer ? (
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
                            localStorage.setItem(
                              "payment_brand",
                              e.target.value
                            );
                          }}
                          className="mr-2 hidden"
                        />
                        <img
                          width={30}
                          src={Bank}
                          alt="CreditCard"
                          className="mx-2"
                        />
                        {t('bank transfer')}
                      </label>
                    ) : null}

                    <label
                      className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor duration-300 rounded-[50px] px-5 py-2 ${
                        selectedValue === "MADA"
                          ? "bg-mainColor text-white"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_ways"
                        value="MADA"
                        checked={selectedValue === "MADA"}
                        onChange={(e) => setSelectedValue(e.target.value)}
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
                        onChange={(e) => setSelectedValue(e.target.value)}
                        className="mr-2 hidden"
                      />
                      <img width={60} src={CreditCard} alt="CreditCard" />
                      {t('credit card')}
                    </label>
                  </div>
                </div>

                <div className="flex justify-between gap-5 flex-wrap mt-5">
                  <button
                    type="submit"
                    className={`py-4 w-[15%] h-[60px] relative max-xl:w-full ${langDetection === "en" ? 'rounded-r-full':'rounded-l-full'} bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white text-lg font-bold`}
                  >
                    {showBtnLoader ? <BtnLoader /> : t('send')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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

export default MembershipForm;
