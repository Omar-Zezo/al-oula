import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../store/slices/auth/loggedUser";
import { useForm } from "react-hook-form";
import { updateUser } from "../../store/slices/auth/updateProfile";
import BtnLoader from "../../utils/BtnLoader";
import { t } from "i18next";

const PersonalInfo = () => {
  const [loggedUserInfo, setLoggedUserInfo] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const loggedUserData = useSelector((state) => state.loggedUser);
  const updateProfileData = useSelector((state) => state.updateProfile);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const formSubmit = (data) => {
    setShowBtnLoader(true);
    dispatch(updateUser(data));
  };

  useEffect(() => {
    dispatch(getLoggedUser());
  }, []);

  //get  loggeduser data
  useEffect(() => {
    if (loggedUserData) {
      if (loggedUserData.data) {
        if (loggedUserData.data.data) {
          if (loggedUserData.data.data) {
            if (loggedUserData.data.data.data) {
              setLoggedUserInfo(loggedUserData.data.data.data);
            }
          }
        }
      }
    }
  }, [loggedUserData]);

  //handel btn loader
  useEffect(() => {
    if (updateProfileData.data) {
      setShowBtnLoader(false);
    }
    if (updateProfileData.error) {
      setShowBtnLoader(false);
    }
  }, [updateProfileData]);

  return (
    <div className="flex flex-col gap-10">
      <h4 className="text-2xl text-center text-slate-900 font-semibold relative pb-2 title-line">
        {t('edit personal information')}
      </h4>
      <div className="flex flex-col gap-5">
        <p className="text-2xl max-xl:text-xl text-slate-900 font-semibold">
          {t('phone number')}: {loggedUserInfo?.phone}
        </p>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-wrap justify-between"
        >
          <div className="xl:w-[48%] w-full flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-base px-4 text-secondryColor font-semibold"
            >
              {t('full name')}
            </label>
            <input
              id="name"
              type="text"
              className="outline-mainColor px-4 py-5 rounded-[50px] bg-gray-200"
              placeholder={
                loggedUserInfo?.name
                  ? loggedUserInfo?.name
                  : loggedUserInfo?.phone
              }
              {...register("name", {
                required: "هذا الحقل مطلوب",
              })}
            />
            <p className="mt-1 pr-2 text-red-600 text-sm">
              {errors.name?.message}
            </p>
          </div>

          <div className="xl:w-[48%] w-full flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-base px-4 text-secondryColor font-semibold"
            >
              {t('email')}
            </label>
            <input
              type="email"
              className="outline-mainColor max-xl:mt-5 px-4 py-5 rounded-[50px] bg-gray-200"
              placeholder={loggedUserInfo?.email}
              {...register("email", {
                required: "هذا الحقل مطلوب",
              })}
            />
            <p className="mt-1 pr-2 text-red-600 text-sm">
              {errors.email?.message}
            </p>
          </div>
          <button
            type="submit"
            className="xl:w-[48%] relative h-[60px] w-full mx-auto mt-8 cursor-pointer p-4 rounded-[50px] bg-mainColor hover:bg-secondryColor duration-300 text-white font-bold"
          >
            {showBtnLoader ? <BtnLoader /> : t('edit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
