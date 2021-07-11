import React, { Component } from "react";

class SliderDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  urlHasSameOriginAsWebsite = (url) => {
    if (!url) return false;
    const urlOrigin = new URL(url).origin;
    const homeOrigin = window.location.origin;

    return urlOrigin === homeOrigin;
  };

  render() {
    const {
      onButtonDescLeftClick,
      onButtonDescRightClick,
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
          onClick={() => onButtonDescLeftClick()}
          onMouseOver={() => buttonDescLeftOnHover()}
          onMouseOut={() => buttonDescLeftOnUnhover()}
          className={buttonDescLeftClass}
        >
          <span>Live</span>
        </div>

        <div
          onClick={() => onButtonDescRightClick()}
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
