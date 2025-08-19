import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../store/slices/auth/loggedUser";
import { makeAppointment } from "../store/slices/about us/appointment";
import { useForm } from "react-hook-form";
import BtnLoader from "./BtnLoader";
import { t } from "i18next";

const AppointmentPopup = ({
  showHallPopup,
  setShowHallPopup,
  facility_id,
  event_id,
  langDetection
}) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const dispatch = useDispatch();
  const loggedUserData = useSelector((state) => state.loggedUser);
  const { data, error } = useSelector((state) => state.appointment);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("start_date", "");
    setValue("end_date", "");
  }, [setValue]);

  useEffect(() => {
    dispatch(getLoggedUser());
  }, []);

  useEffect(() => {
    if (loggedUserData?.data?.data?.data) {
      const userData = loggedUserData.data.data.data;
      setLoggedUser(userData);

      // set logged user info
      setValue("full_name", userData.name);
      setValue("phone", userData.phone);
      setValue("email", userData.email);
    }
  }, [loggedUserData, setValue]);

  const formSubmit = (data) => {
    setShowBtnLoader(true);
    if (facility_id) {
      dispatch(
        makeAppointment({
          full_name: data?.full_name,
          phone: data?.phone,
          email: data?.email,
          start_date: data?.start_date,
          end_date: data?.end_date,
          facility_id,
        })
      );
    }
    if (event_id) {
      dispatch(
        makeAppointment({
          full_name: data?.full_name,
          phone: data?.phone,
          email: data?.email,
          start_date: data?.start_date,
          end_date: data?.end_date,
          event_id,
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      setShowBtnLoader(false);
      setShowHallPopup(false);
    }
    if (error) {
      setShowBtnLoader(false);
    }
  }, [data, error]);

  return (
    <div
      dir="ltr"
      className={`fixed top-0 left-0 z-[999] ${
        showHallPopup ? "flex" : "hidden"
      } justify-center items-center size-full bg-black/50`}
      onClick={() => setShowHallPopup(false)}
    >
      <div
        className="bg-white w-full lg:w-[600px] max-h-[95%] overflow-y-auto rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-5 rounded-t-xl bg-gray-200">
          <p className="text-xl text-secondryColor font-bold">{t('book now')}</p>
          <FontAwesomeIcon
            className="text-xl text-zinc-500 cursor-pointer"
            icon={faX}
            onClick={() => setShowHallPopup(false)}
          />
        </div>

        <div className="flex flex-col p-5 gap-3">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(formSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="full_name"
                className="text-lg text-mainColor font-semibold"
              >
                {t('full name')}
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    id="full_name"
                    className={`h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent`}
                    {...register("full_name", {
                      required: t('this field is required'),
                      minLength: {
                        value: 10,
                        message: t('the name must be 10 characters or more'),
                      },
                    })}
                  />
                </div>
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors.full_name?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-lg text-mainColor font-semibold"
              >
                {t('phone number')}
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    id="phone"
                    autoComplete="off"
                    className="h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent"
                    {...register("phone", {
                      required: t('this field is required'),
                      pattern: {
                        value: /^(05\d{8}|5\d{8})$/,
                        message: t('we accept Saudi numbers only'),
                      },
                    })}
                  />
                </div>
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors.phone?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-lg text-mainColor font-semibold"
              >
                {t('email')}
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    id="email"
                    className="h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent"
                    {...register("email", {
                      required: t('this field is required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('invalid email'),
                      },
                    })}
                  />
                </div>
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors.email?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="start_date"
                className="text-lg text-mainColor font-semibold"
              >
                {t('start date')}
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    type="date"
                    id="start_date"
                    defaultValue={""}
                    className="h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent"
                    {...register("start_date", {
                      required: t('this field is required'),
                      validate: (value) => {
                        const today = new Date();
                        return (
                          new Date(value) > today ||
                          t('only future date must be selected')
                        );
                      },
                    })}
                  />
                </div>
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors.start_date?.message}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="end_date"
                className="text-lg text-mainColor font-semibold"
              >
                {t('end date')}
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center bg-gray-300 rounded-md">
                  <input
                    type="date"
                    id="end_date"
                    defaultValue={""}
                    className="h-full w-full py-2 px-5 text-base outline-none font-semibold bg-transparent"
                    {...register("end_date", {
                      required: t('this field is required'),
                      validate: (value) =>
                        watch("start_date") && value < watch("start_date")
                          ? t('the end date must not be before the start date')
                          : true,
                    })}
                  />
                </div>
                <p className="mt-1 px-2 text-red-600 text-sm">
                  {errors.end_date?.message}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-mainColor relative h-10 rounded-lg py-2 cursor-pointer hover:bg-secondryColor hover:text-white duration-300 text-white font-semibold"
            >
              {showBtnLoader ? <BtnLoader /> : t('book')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPopup;
