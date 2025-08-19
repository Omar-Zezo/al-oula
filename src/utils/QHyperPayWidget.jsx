import { useEffect } from "react";
import UseSettings from "../hooks/UseSettings";

const QHyperPayWidget = ({
  paymentObj,
}) => {
  useEffect(()=>{
    if(paymentObj){
      localStorage.setItem("complete_order_url", paymentObj?.route)
    }
  },[paymentObj])

  const settings = UseSettings()


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${paymentObj?.checkout_id}`;
    script.async = true;
    document.body.appendChild(script);
    // document.body.style.direction = "ltr"
    script.onload = () => {
      window.wpwlOptions = {
        locale: "ar",
        style: "plain",
        paymentTarget: "_top",
        autofocus: "card.number",
        applePay: {
          displayName: "albir",
          total: { label: "albir, INC." },
          merchantCapabilities: ["supports3DS"],
          countryCode: "SA",
          supportedNetworks: ["masterCard", "visa", "mada"],
        },
      };
    };
    return () => {
      document.body.removeChild(script);
    };
  }, [paymentObj]);

  return (
    <form
      action={`${settings?.FrontEnd_URL}/payment-status`}
      className="paymentWidgets"
      data-brands={paymentObj?.payment_brand}
    ></form>
  );
};

export default QHyperPayWidget;
