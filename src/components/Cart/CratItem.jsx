import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateCartQty } from "../../store/slices/cart/updateCart";
import { deleteItemFromCart } from "../../store/slices/cart/deleteItem";
import { SR } from "../../images/svg";

const CratItem = ({item, langDetection}) => {
  const [qty, setQty] = useState(item?.quantity);
  
  const dispatch = useDispatch()


  //incress qty
  const incressQty = () => {
    setQty(qty + 1);
  };

  //decress qty
  const decressQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  useEffect(()=>{
    dispatch(updateCartQty({
      id: item?.id,
      quantity: qty
    }));
  },[qty])

  return (
    <div className="w-full flex max-md:flex-col max-md:gap-3 items-center p-5 border border-gray-400 mb-2 relative">
      <FontAwesomeIcon
        className={`text-xl text-red-600 absolute ${langDetection === "en" ? 'right-2':'left-2'} top-2 p-1 cursor-pointer`}
        icon={faTrash}
        onClick={()=> dispatch(deleteItemFromCart(item?.id))}
      />

      <img
        width={100}
        height={130}
        className="shrink-0 object-cover rounded-md"
        loading="lazy"
        src={item?.img}
        alt="product-card"
      />

      <div className="w-[35%] max-md:w-full mr-auto flex justify-between">
        <div className="text-right mx-5 shrink-0 max-md:grow">
          <h4 className="text-lg text-secondColor max-xl:text-center font-medium mb-2 text-ellipsis overflow-hidden text-nowrap uppercase">
          {item?.service_title}
          </h4>
        </div>
      </div>

      <div className="w-[55%] max-lg:w-full h-full flex items-center">
        <p className="ml-auto flex items-center gap-1 text-lg text-secondColor">
          {item?.amount}
          <img width={15} src={SR} alt="ryal" />
        </p>
        <div className="max-xl:flex-1 flex relative items-center justify-center mx-2 py-2 px-1 border border-gray-300">
          <FontAwesomeIcon
            onClick={incressQty}
            className="text-lg absolute left-2 top-1/2 translate-y-[-50%] p-1 cursor-pointer"
            icon={faPlus}
          />
          <div className="w-[200px] max-lg:w-[50px] max-lg:h-5 h-10 flex items-center justify-center text-lg mx-1">
            {qty}
          </div>
          <FontAwesomeIcon
            onClick={decressQty}
            className="text-lg text-secondryColor absolute right-2 top-1/2 translate-y-[-50%] p-1 cursor-pointer"
            icon={faMinus}
          />
        </div>
        <p className="mr-auto flex items-center gap-1 text-lg text-secondColor">
          {item?.subtotal}
          <img width={15} src={SR} alt="ryal" />
        </p>
      </div>
    </div>
  );
};

export default CratItem;
