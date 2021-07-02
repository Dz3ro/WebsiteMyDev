import React from "react";
import { groupItem } from "../../styles";

function ListGroup(props) {
  return (
    <div className={"listGroup"}>
      {props.tags.map((x) => (
        <div
          onClick={() => props.onTagSelect(x)}
          key={x.name}
          className={x.isSelected ? groupItem.selected : groupItem.normal}
        >
          {x.name}
        </div>
      ))}
    </div>
  );
}

export default ListGroup;
