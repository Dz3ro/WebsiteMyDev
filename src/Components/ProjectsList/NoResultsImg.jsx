import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-regular-svg-icons";

function NoResultsImg(props) {
  if (props.amount > 0) return null;
  return (
    <div>
      <FontAwesomeIcon className="NoResultsPlaceHolder" icon={faFrown} />
    </div>
  );
}

export default NoResultsImg;
