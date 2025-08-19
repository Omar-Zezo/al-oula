import { t } from "i18next";
import CratItem from "./CratItem";

const CartItemsContainer = ({cartItems, langDetection}) => {
   
  return (
    <div className="w-full flex max-lg:flex-col-reverse max-lg:gap-5 justify-between mt-7">
      {/* <OrderCheckout totalCartPrice={cartItems.totalCartPrice} /> */}
      <div className="w-full">
        <div className="flex justify-end max-md:hidden">
          <h3 className="text-lg px-10 font-medium">{t('donation')}</h3>
          <div className={`w-[55%] ${langDetection === "en" ? 'ml-auto':'mr-auto'} flex justify-between text-lg font-medium`}>
            <h3 className="px-10">{t('price')}</h3>
            <h3>{t('quantity')}</h3>
            <h3 className="px-5">{t('total value')}</h3>
          </div>
        </div>
        <div className="w-full mt-5">
          {
            cartItems?.map(item=>(
              <CratItem key={item?.id} item={item} langDetection={langDetection}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default CartItemsContainer;
