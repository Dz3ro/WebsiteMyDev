import React, { Component } from "react";

class SliderSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="sliderSlide">
        <div className="imgContainer">
          <img src={this.props.projectImg} alt={this.props.altText} />
        </div>
      </div>
    );
  }
}

export default SliderSlide;
