import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "",
      cursor: "",
      iconSize: 10,
      textSize: 10,
    };
  }

  colorNormal = "#fff";
  colorHighlight = "gold";
  cursorDefault = "default";
  cursorPointer = "pointer";

  convertNumToPx = (num) => {
    num = num.toString();
    num += "px";
    return num;
  };

  componentDidMount() {
    const { icon, text } = this.props.sizes;
    this.setState({
      currentColor: this.colorNormal,
      cursor: this.cursorDefault,
      iconSize: icon.normal,
      textSize: text.normal,
    });
    console.log("ahi");
  }

  componentDidUpdate() {
    console.log(this.state.iconSize);
  }

  handleMouseEnter = () => {
    this.setState({
      currentColor: this.colorHighlight,
      cursor: this.cursorPointer,
      iconSize: this.props.sizes.icon.highlight,
      textSize: this.props.sizes.text.highlight,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      currentColor: this.colorNormal,
      cursor: this.cursorDefault,
      iconSize: this.props.sizes.icon.normal,
      textSize: this.props.sizes.text.normal,
    });
  };

  render() {
    const color = this.state.currentColor;
    const cursor = this.state.cursor;
    const iconSize = this.convertNumToPx(this.state.iconSize);
    const textSize = this.convertNumToPx(this.state.textSize);

    return (
      <div
        style={{ cursor }}
        className="section"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <FontAwesomeIcon
          style={{ color, fontSize: iconSize }}
          className="sectionPart sectionFont"
          id="test"
          icon={this.props.icon}
        />
        <span
          style={{ color, fontSize: textSize }}
          className="sectionPart sectionText"
        >
          {this.props.text}
        </span>
      </div>
    );
  }
}

export default Section;
