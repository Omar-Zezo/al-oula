import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCompleteCode } from "../store/slices/cart/completeOrder";

const PaymentStatus = () => {
  const { data, error } = useSelector((state) => state.completeOrder);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const resourcePath = searchParams.get("resourcePath");

  useEffect(() => {
    if(id && resourcePath){
      dispatch(
        getCompleteCode({
          data: {
            id,
            resourcePath,
            payment_brand: localStorage.getItem("payment_brand"),
          },
          url: localStorage.getItem("complete_order_url"),
        })
      );
    }
  }, [id, resourcePath]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if(data.data.data){
          if(data.data.data.token){
            localStorage.setItem("token", data.data.data.token)
          }
          if(data.data.data.donation_code){
            navigate(`/reviews/${data.data.data.donation_code}`);
          }
        }
      }
    }

    if (error) {
      if (error.data) {
        localStorage.setItem("paymentStatus", JSON.stringify(error.data));
        navigate("/status-faild");
      }
    }
  }, [data, error]);

  return <div></div>;
};

export default PaymentStatus;
