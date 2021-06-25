import React, { Component } from "react";
import "react-dom";
import { faGithub, faThemeisle } from "@fortawesome/free-brands-svg-icons";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: {
        icon: {
          normal: 0,
          highlight: 0,
        },
        text: {
          normal: 0,
          highlight: 0,
        },
      },
    };
  }

  iconSizeNormal;
  iconSizeHighlight;
  textSizeNormal;
  textSizeHighlight;

  getFontSizeFromElement = (className) => {
    let size = getComputedStyle(
      document.getElementsByClassName(className)[0]
    ).getPropertyValue("font-size");
    size = size.slice(0, -2);
    size = parseInt(size);
    return size;
  };

  componentDidMount() {
    let { icon, text } = this.state.sizes;
    icon.normal = this.getFontSizeFromElement("sectionFont");
    text.normal = this.getFontSizeFromElement("sectionText");
    icon.highlight = icon.normal * 1.5;
    text.highlight = text.normal * 1.5;

    const sizes = { icon, text };
    this.setState({ sizes });
    //console.log(this.sizes);
  }
  render() {
    return (
      <div className="navbar">
        <Section sizes={this.state.sizes} icon={faHome} text="Home" />
        <Section sizes={this.state.sizes} icon={faEnvelope} text="Contact" />
        <Section sizes={this.state.sizes} icon={faGithub} text="Github" />
        <Section
          sizes={this.state.sizes}
          icon={faStackOverflow}
          text="Stack overflow"
        />
      </div>
    );
  }
}

export default Navbar;
