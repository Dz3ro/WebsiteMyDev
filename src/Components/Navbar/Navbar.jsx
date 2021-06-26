import React, { Component } from "react";
import "react-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Section from "./Section";
import { navbar as navStyles } from "../../styles";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    const linkGithub = "https://github.com/Dz3ro";
    const linkStack = "https://stackoverflow.com/users/13002098/dzero";
    return (
      <div className={navStyles.navbar}>
        <Section
          linkInside={true}
          link="/"
          styles={navStyles}
          icon={faHome}
          text="Home"
        />
        <Section
          linkInside={true}
          link="contact"
          styles={navStyles}
          icon={faEnvelope}
          text="Contact"
        />
        <Section
          linkInside={false}
          link={linkGithub}
          styles={navStyles}
          icon={faGithub}
          text="Github"
        />
        <Section
          linkInside={false}
          link={linkStack}
          styles={navStyles}
          icon={faStackOverflow}
          text="Stack overflow"
        />
      </div>
    );
  }
}

export default Navbar;
