import React, { Component } from "react";

class SliderDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      buttonDescLeftOnHover,
      buttonDescLeftOnUnhover,
      buttonDescRightOnHover,
      buttonDescRightOnUnhover,
      buttonDescLeftClass,
      buttonDescRightClass,
      projectName,
      projectDesc,
    } = this.props;
    return (
      <div className="sliderDesc">
        <div
          onMouseOver={() => buttonDescLeftOnHover()}
          onMouseOut={() => buttonDescLeftOnUnhover()}
          className={buttonDescLeftClass}
        >
          <span>Live</span>
        </div>
        <div
          onMouseOver={() => buttonDescRightOnHover()}
          onMouseOut={() => buttonDescRightOnUnhover()}
          className={buttonDescRightClass}
        >
          <span>Code</span>
        </div>

        <h1>{projectName}</h1>
        <h2>{projectDesc}</h2>
      </div>
    );
  }
}

export default SliderDesc;
