import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanksList } from "../store/slices/cart/banks";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { customStyles } from "../constant";
import { bankDonationPay } from "../store/slices/cart/bankDonation";
import { AboutCover } from "../images/imgs";
import BtnLoader from "../utils/BtnLoader";
import UseSettings from "../hooks/UseSettings";
import { Helmet } from "react-helmet";
import { t } from "i18next";
import UseLangDetection from "../hooks/UseLangDetection";

const BankTransfer = () => {
  const [bankList, setBankList] = useState(null);
  const [selectBanks, setSelectBanks] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const bankListData = useSelector((state) => state.banks);
  const bankDonationData = useSelector((state) => state.bankDonation);

  const settings = UseSettings();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const { donationCode } = useParams();
  const navigate = useNavigate();

  const langDetection = UseLangDetection()

  useEffect(() => {
    dispatch(getBanksList());
  }, []);

  // get bank list
  useEffect(() => {
    if (bankListData) {
      if (bankListData.data) {
        if (bankListData.data.data) {
          if (bankListData.data.data.data) {
            const formattedCategories = bankListData.data.data.data.map(
              (bank) => ({
                value: bank.bank_name,
                label: bank.bank_name,
              })
            );
            setSelectBanks(formattedCategories);
            setBankList(bankListData.data.data.data);
          }
        }
      }
    }
  }, [bankListData]);

  //submit bank payment form
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    const formData = new FormData();
    formData.append("bank_name", data?.bank_name?.value);

    // if image with data
    if (data.attachments?.[0]) {
      formData.append("attachments", data?.attachments[0]);
    }

    dispatch(bankDonationPay({ formData, donationCode }));
  };

  useEffect(() => {
    if (bankDonationData) {
      if (bankDonationData.data) {
        if (bankDonationData.data.data) {
          if (bankDonationData.data.data.data) {
            console.log(bankDonationData.data.data.data);
            if (bankDonationData.data.data.data.donation_type === "service") {
              if (bankDonationData.data.data.data.donation_code) {
                navigate(
                  `/reviews/${bankDonationData.data.data.data.donation_code}`
                );
              }
            }
          }
        }
      }
    }
  }, [bankDonationData]);

  //handel btn loader
  useEffect(() => {
    if (bankDonationData.data) {
      setShowBtnLoader(false);
    }
    if (bankDonationData.error) {
      setShowBtnLoader(false);
    }
  }, [bankDonationData]);

  return (
    <div>
      <Helmet>
        <title>{`${settings?.name} - ${t("bank accounts")}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      <div className="flex flex-col">
        <div className="xl:h-[400px] h-[200px] bg-mainColor xl:rounded-b-[80px] relative">
          <img
            src={AboutCover}
            alt="about-cover"
            className="size-full absolute left-0 top-0 object-cover xl:rounded-b-[80px]"
          />
          <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 xl:rounded-b-[80px]"></div>
        </div>
        <div
          className={`xl:w-fit w-[90%] xl:px-20 h-[100px] ${
            langDetection === "en" ? "xl:ml-24 mr-auto" : "xl:mr-24"
          } flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]`}
        >
          <p className="text-[40px] max-xl:text-3xl text-white font-semibold">
            {t("bank accounts")}
          </p>
        </div>

        <div dir={langDetection === "en" ? 'ltr':'rtl'} className="container mt-20">
          <div className="max-xl:w-[95%] overflow-x-auto pb-5">
            <table className={`w-full mt-8 text-zinc-800`}>
              <thead>
                <tr className="flex justify-around rounded-t-xl bg-mainColor text-white text-lg max-lg:text-base font-semibold">
                  <th className="w-1/4 relative py-5 px-1 after:cell-border">
                    {t('bank name')}
                  </th>
                  <th className="w-1/4 relative text-center py-5 px-3 after:cell-border">
                   {t('account number')}
                  </th>
                  <th className="w-1/4 relative text-center py-5 px-3 after:cell-border">
                    IBAN
                  </th>
                  <th className="w-1/4 relative text-center py-5 px-3 after:cell-border">
                    {t('bank link')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {bankList?.map((bank, index) => (
                  <tr
                    key={index}
                    className="w-full flex justify-around py-3 px-1  border-b border-x border-gray-400 last-of-type:rounded-b-xl text-lg font-medium"
                  >
                    <td className="w-1/4 text-center py-3 relative overflow-hidden text-ellipsis text-nowrap">
                      {bank?.bank_name}
                    </td>
                    <td className="w-1/4 text-center py-3 relative overflow-hidden text-ellipsis text-nowrap">
                      {bank?.account_number}
                    </td>
                    <td className="w-1/4 text-center py-3 relative overflow-hidden text-ellipsis text-nowrap">
                      {bank?.IBAN}
                    </td>
                    <td className="w-1/4 text-center py-3 relative overflow-hidden text-ellipsis text-nowrap">
                      <a
                        target="_blanck"
                        href={bank?.bank_link}
                        className="text-blue-500 text-lg font-bold"
                      >
                        {t('visit')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-20">
            <h3 className="text-3xl text-center mb-10 text-mainColor font-semibold">
              {t('attach the conversion image')}
            </h3>
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="w-full grow flex flex-col gap-4">
                <label
                  htmlFor="bank_name"
                  className="text-base text-[#444] font-bold px-2"
                >
                {t('choose the bank to which the money is transferred')} :
                </label>
                <Controller
                  id="bank_name"
                  name="bank_name"
                  control={control}
                  rules={{ required: t('this field is required')}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectBanks}
                      styles={customStyles}
                      placeholder={t('choose the bank to which the money is transferred')}
                      className="bg-field p-2 text-base rounded-xl outline-none border"
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                      }}
                    />
                  )}
                />
                <p className="px-2 text-red-600 text-sm font-medium">
                  {errors["bank_name"]?.message}
                </p>
              </div>

              <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
                <label
                  htmlFor="attachments"
                  className="text-base text-[#444] font-bold px-2"
                >
                  {t('a copy of the transfer receipt')}
                </label>
                <input
                  id="attachments"
                  type="file"
                  className="bg-field p-4 text-base rounded-xl outline-none border"
                  {...register("attachments", {
                    required: t('this field is required'),
                  })}
                />
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors["attachments"]?.message}
                </p>
              </div>

              <div className="flex flex-wrap gap-5 justify-between mt-10">
                <div className="max-md:w-full w-1/2 mx-auto flex flex-col gap-4">
                  <button
                    type="submit"
                    className="bg-mainColor h-[60px] relative hover:bg-secondryColor duration-300 p-4 text-lg text-white text-center cursor-pointer font-semibold rounded-xl"
                  >
                    {showBtnLoader ? <BtnLoader /> : t('add')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankTransfer;
