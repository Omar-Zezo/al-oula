import HyperPayWidget from "./HyperPayWidget";

const HyperPayPopup = ({
  showHyperPayPopup,
  setShowHyperPayPopup,
  paymentObj,
}) => {


  return (
    <div
      onClick={() => {
        setShowHyperPayPopup(false);
      }}
      className={`fixed top-0 left-0 z-[99999] ${
        showHyperPayPopup ? "flex" : "hidden"
      } justify-center items-center size-full bg-mainColor/95 payment-card`}
    >
      <div
        className="w-full lg:w-[600px] max-h-[90%] h-[500px] rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="size-full flex items-center justify-center absolute top-0 left-0">
          <HyperPayWidget paymentObj={paymentObj} />
        </div>
      </div>
    </div>
  );
};

export default HyperPayPopup;
