import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionClass: "",
      iconClass: "",
      textClass: "",
    };
  }

  setStates = (text, icon, section) => {
    this.setState({
      iconClass: icon,
      textClass: text,
      sectionClass: section,
    });
  };

  componentDidMount() {
    const { text, icon, section } = this.props.styles;
    this.setStates(text.normal, icon.normal, section.normal);
  }

  handleMouseEnter = () => {
    const { text, icon, section } = this.props.styles;
    this.setStates(text.highlight, icon.highlight, section.highlight);
  };

  handleMouseLeave = () => {
    const { text, icon, section } = this.props.styles;
    this.setStates(text.normal, icon.normal, section.normal);
  };

  render() {
    const { textClass, iconClass, sectionClass } = this.state;
    const { icon, text, linkInside } = this.props;

    if (linkInside)
      return (
        <div
          className={sectionClass}
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
        >
          <Link to={this.props.link}>
            <FontAwesomeIcon className={iconClass} id="test" icon={icon} />
            <span className={textClass}>{text}</span>
          </Link>
        </div>
      );
    return (
      <div
        className={sectionClass}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className={iconClass} id="test" icon={icon} />
          <span className={textClass}>{text}</span>
        </a>
      </div>
    );
  }
}

export default Section;
