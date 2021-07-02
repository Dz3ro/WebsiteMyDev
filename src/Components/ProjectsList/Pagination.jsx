import { paginationStyle } from "../../styles";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function Pagination(props) {
  const { pagesTotal, pageActive, onPagClick } = props;
  const pages = [];
  for (let i = 1; i <= pagesTotal; i++) {
    pages.push(i);
  }
  return (
    <div className="paginationContainer">
      <button
        onClick={() => onPagClick(-1)}
        className={
          pageActive === 1 ? paginationStyle.disabled : paginationStyle.normal
        }
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pages.map((x) => (
        <button
          onClick={() => onPagClick(x)}
          key={x}
          number={x}
          className={
            x === pageActive ? paginationStyle.selected : paginationStyle.normal
          }
        >
          {x}
        </button>
      ))}
      <button
        onClick={() => onPagClick(0)}
        className={
          pageActive === pagesTotal
            ? paginationStyle.disabled
            : paginationStyle.normal
        }
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Pagination;
