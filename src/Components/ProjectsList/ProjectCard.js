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
    const tools = project.usedTools;
    let str = "";

    for (const tool of tools) {
      str += tool + " ";
    }
    return str;
  };

  render() {
    const { pointedLinkCode, pointedLinkLive } = this.state;
    const project = this.props.data;
    const projectTools = this.getUsedToolsString(project);
    if (project)
      return (
        <div className="projectCardContainer">
          <div className="projectCardImage"></div>
          <h1>{project.name}</h1>
          <h2>{project.descriptionLong}</h2>
          <h3>{projectTools}</h3>
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
