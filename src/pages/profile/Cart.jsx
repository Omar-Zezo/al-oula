import CartItemsContainer from "../../components/Cart/CartItemsContainer";
import { getUserCart } from "../../store/slices/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCheckout } from "../../store/slices/cart/checkout";
import HyperPayPopup from "../../utils/HyperPayPopup";
import { CreditCard, Mada } from "../../images/imgs";
import { Bank } from "../../images/svg";
import UseSettings from "../../hooks/UseSettings";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [paymentObj, setPaymentObj] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [showHyperPayPopup, setShowHyperPayPopup] = useState(false);
  const { data } = useSelector((state) => state.cart);
  const checkoutData = useSelector((state) => state.checkout);

  const dispatch = useDispatch();

  const errorMsg = (msg) => toast.error(msg);
  const settings = UseSettings();
  const langDetection = UseLangDetection()

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setCartItems(data.data.data);
        }
      }
    }
  }, [data]);

  // handel checkout
  const handleCheckoutSubmit = () => {
    if (selectedValue !== "") {
      dispatch(
        getCheckout({
          payment_ways:
            selectedValue === "MADA" || selectedValue === "VISA MASTER"
              ? "credit_card"
              : "bank_transfer",
          payment_brand: "VISA MASTER",
        })
      );
    } else {
      errorMsg("من فضلك قم بتحديد طريقة الدفع");
    }
  };

  useEffect(() => {
    if (checkoutData) {
      if (checkoutData.data) {
        if (checkoutData.data.data) {
          if (checkoutData.data.data.data) {
            if (checkoutData.data.data.data.donation_code) {
              window.location = `/bank_transfer/${checkoutData.data.data.data.donation_code}`;
            }
            if (checkoutData.data.data.data.checkout_id) {
              setPaymentObj(checkoutData.data.data.data);
              setShowHyperPayPopup(true);
            }
          }
        }
      }
    }
  }, [checkoutData]);

  return cartItems ? (
    <div className="mt-5">
      <div>
        <div className="w-full pb-5">
          <div className="flex justify-between">
            <h2 className="w-fit text-right text-xl font-medium">
              {t('donation cart')}
            </h2>
          </div>
          <CartItemsContainer cartItems={cartItems} langDetection={langDetection}/>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="total" className="text-lg text-[#777] font-bold">
          {t('choose payment method')}:
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
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="mr-2 hidden"
                />
                <img width={25} src={Bank} alt="CreditCard" className="mx-2" />
                {t('bank transfer')}
              </label>
            ) : null}

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
              <img width={50} src={Mada} alt="CreditCard" className="mx-2" />
              {t('mada')}
            </label>

            <label
              className={`w-fit flex items-center text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-5 py-2 ${
                selectedValue === "VISA MASTER" ? "bg-mainColor text-white" : ""
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
              <img
                width={50}
                src={CreditCard}
                alt="CreditCard"
                className="ml-2"
              />
              {t('credit card')}
            </label>
          </div>
        </div>
        <p className="text-base text-secondryColor font-medium">
          {t('in the case of a bank transfer')}
        </p>
        <button
          onClick={handleCheckoutSubmit}
          className={`w-fit text-white px-10 py-5 text-base font-bold bg-mainColor hover:bg-secondryColor duration-300 ${langDetection === "en" ? 'rounded-r-full':'rounded-l-full'}`}
        >
          {t('donate now')}
        </button>
      </div>

      {showHyperPayPopup && (
        <HyperPayPopup
          showHyperPayPopup={showHyperPayPopup}
          setShowHyperPayPopup={setShowHyperPayPopup}
          paymentObj={paymentObj}
        />
      )}
    </div>
  ) : (
    <p className="text-lg text-secondryColor text-center font-semibold">
      {t('there are no items')}
    </p>
  );
};

export default Cart;
