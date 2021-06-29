import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SliderSlideButtons(props) {
  const {
    btnLeftClass,
    btnRightClass,
    iconLeft,
    iconRight,
    slideLeft,
    slideRight,
    hoverLeft,
    hoverRight,
  } = props;
  return (
    <div>
      <div
        onMouseOver={() => hoverLeft()}
        onClick={() => slideLeft()}
        className={btnLeftClass}
      >
        <FontAwesomeIcon className="sliderButtonIcon" icon={iconLeft} />
      </div>
      <div
        onMouseOver={() => hoverRight()}
        onClick={() => slideRight()}
        className={btnRightClass}
      >
        <FontAwesomeIcon className="sliderButtonIcon" icon={iconRight} />
      </div>
    </div>
  );
}

export default SliderSlideButtons;
