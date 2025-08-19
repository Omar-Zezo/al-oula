import React from "react";
import { LineImg } from "../../images/imgs";

const LineSlider = () => {
  return (
    <div className="slider overflow-hidden">
      <div className="track relative overflow-hidden">
        <img src={LineImg} />
        <img src={LineImg} />
        <img src={LineImg} />
        <img src={LineImg} />
        <img src={LineImg} />
      </div>
    </div>
  );
};

export default LineSlider;
