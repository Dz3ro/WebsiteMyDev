import React, { Component } from "react";
import { projectCardLinks } from "../../styles";

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointedLinkCode: false,
      pointedLinkLive: false,
    };
  }

  handleUrlClickLive = () => {
    console.log("ahi");
    if (!this.props.project) return;
    const url = this.props.project.urlLive;
    if (!url) return;
    window.open(url, "_blank").focus();
  };

  handleUrlClickCode = () => {
    if (!this.props.project) return;

    const url = this.props.project.urlCode;
    if (!url) return;
    window.open(url, "_blank").focus();
  };

  handleMouseEntersLink = (linkIsForCode) => {
    if (linkIsForCode) this.setState({ pointedLinkCode: true });
    else this.setState({ pointedLinkLive: true });
  };

  handleMouseLeavesLink = (linkIsForCode) => {
    if (linkIsForCode) this.setState({ pointedLinkCode: false });
    else this.setState({ pointedLinkLive: false });
  };

  handleOnViewportDetection = () => {
    const observer = new IntersectionObserver(() => {
      observer.observe();
    });
  };

  getUsedToolsString = (project) => {
    if (!project) return null;
    const tools = project.tools;
    let str = "";

    for (const tool of tools) {
      str += tool + " ";
    }
    return str;
  };

  render() {
    const { pointedLinkCode, pointedLinkLive } = this.state;
    const project = this.props.project;
    const projectTools = this.getUsedToolsString(project);

    let classUrlLive;
    let classUrlCode;

    if (!project.urlLive) classUrlLive = projectCardLinks.disabled;
    else if (pointedLinkLive) classUrlLive = projectCardLinks.selected;
    else classUrlLive = projectCardLinks.normal;

    if (!project.urlCode) classUrlCode = projectCardLinks.disabled;
    else if (pointedLinkCode) classUrlCode = projectCardLinks.selected;
    else classUrlCode = projectCardLinks.normal;

    if (project)
      return (
        <div className="projectCardContainer">
          <img
            src={project.urlImgSec}
            alt="Screenshot of project"
            className="projectCardImage"
          ></img>

          <h1>{project.name}</h1>
          <h2>{project.description}</h2>
          <h3>{projectTools}</h3>
          <div className="projectCardLinksContainer">
            <span
              onClick={() => this.handleUrlClickLive()}
              onMouseEnter={() => this.handleMouseEntersLink(false)}
              onMouseLeave={() => this.handleMouseLeavesLink(false)}
              className={classUrlLive}
            >
              Live
            </span>
            <span
              onClick={() => this.handleUrlClickCode()}
              onMouseEnter={() => this.handleMouseEntersLink(true)}
              onMouseLeave={() => this.handleMouseLeavesLink(true)}
              className={classUrlCode}
            >
              Code
            </span>
          </div>
        </div>
      );
    return (
      <div className="projectCardContainer">
        <div className="projectCardImage"></div>
        <h1>Dummy Title</h1>
        <h2>
          short description short description short description short
          description short description short description short description
          short description short description short description short
          description short description
        </h2>
        <h3>Node Typescript React Redux </h3>
        <div className="projectCardLinksContainer">
          <span
            onMouseEnter={() => this.handleMouseEntersLink(false)}
            onMouseLeave={() => this.handleMouseLeavesLink(false)}
            className={
              pointedLinkLive
                ? projectCardLinks.selected
                : projectCardLinks.normal
            }
          >
            Live
          </span>
          <span
            onMouseEnter={() => this.handleMouseEntersLink(true)}
            onMouseLeave={() => this.handleMouseLeavesLink(true)}
            className={
              pointedLinkCode
                ? projectCardLinks.selected
                : projectCardLinks.normal
            }
          >
            Code
          </span>
        </div>
      </div>
    );
  }
}

export default ProjectCard;
