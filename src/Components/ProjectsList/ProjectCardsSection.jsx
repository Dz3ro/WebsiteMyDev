import {
  getProjectToolsNames,
  getProjects,
  getProjectTools,
} from "../../ProjectsDatabase";
import { paginationStyle } from "../../styles";
import React, { Component } from "react";
import ProjectCard from "./ProjectCard";
import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import NoResultsImg from "./NoResultsImg";
// import { InView } from "react-intersection-observer";

// InView is commeted out for now it is a brary to call function when div
// shows on viewport gonna use it on animations on appear

class ProjectCardsSection extends Component {
  toolAllName = "All";
  projectsPerPage = 10;

  constructor(props) {
    super(props);
    this.state = {
      dataProjectTags: [],
      dataProjectsList: [],
      inputText: "",
      tools: [],
      pagesTotal: 0,
      pageActive: 0,
      projectsToDisplay: [],
      projectsToDisplayForPage: [],
    };
  }

  async componentDidMount() {
    //const dataProjectTools = await getProjectToolsNames();
    const dataProjectTools = await getProjectTools();
    const dataProjectsList = await getProjects();
    const tools = this.createTagsArray(dataProjectTools);
    const projectsToDisplay = this.getProjectsFiltered(dataProjectsList);
    const pagesTotal = this.getPagesTotalNeed(projectsToDisplay);
    const projectsToDisplayForPage =
      this.filterListForCurrentPage(projectsToDisplay);
    const pageActive = 1;

    this.setState({
      dataProjectTags: dataProjectTools,
      dataProjectsList,
      tools: tools,
      pagesTotal,
      pageActive,
      projectsToDisplay,
      projectsToDisplayForPage,
    });
  }

  getProjectsFiltered = (projects, input = null, tag = null) => {
    const projectsFilByInput = this.filterListByInputText(projects, input);
    const projectsFilByTools = this.filterListByTags(projectsFilByInput, tag);

    return projectsFilByTools;
  };

  filterListByInputText = (projects, input) => {
    const filtered = [];
    let inputText;

    if (input || input === "") inputText = input.toLowerCase();
    else inputText = this.state.inputText.toLowerCase();

    for (const project of projects) {
      const name = project.name.toLowerCase();
      if (name.includes(inputText)) filtered.push(project);
    }
    return filtered;
  };

  filterListByTags = (projects, tools) => {
    const newTools = tools ? tools : this.state.tools;
    if (newTools.length < 2) return projects;
    const toolAll = newTools.find((x) => x.name === this.toolAllName);
    if (toolAll.isSelected) return projects;

    const projectsFiltered = projects.filter((x) => this.hasTags(x));
    return projectsFiltered;
  };

  filterListForCurrentPage = (projects, newPageActive = null) => {
    let pageActive = newPageActive !== null ? newPageActive : 1;

    const start = pageActive * this.projectsPerPage - this.projectsPerPage;
    const projectsCopy = [...projects];
    const finalList = projectsCopy.splice(start, this.projectsPerPage);
    return finalList;
  };

  getPagesTotalNeed = (projects) => {
    const pagesTotal = Math.ceil(projects.length / this.projectsPerPage);
    return pagesTotal;
  };

  createTagsArray = (dataProjectTools) => {
    if (this.state.tools.length > 1) return;
    const toolsData = dataProjectTools;
    let tools = [];

    for (const tool of toolsData)
      tools.push({ name: tool.name, isSelected: false });

    const all = { name: this.toolAllName, isSelected: true };
    tools.unshift(all);
    return tools;
  };

  handleInputChange = (inputText) => {
    this.handleStateUpdate(inputText);
  };

  handleToolSelect = (toolName) => {
    let tools = this.state.tools;
    const tool = tools.find((x) => x.name === toolName);

    if (tool.name === this.toolAllName)
      for (const tool of tools) tool.isSelected = false;
    else tools.find((x) => x.name === this.toolAllName).isSelected = false;

    tool.isSelected = !tool.isSelected;
    tools = this.enableTagAllIfNoneSelected(tools);

    this.handleStateUpdate(null, tools, null);
  };

  handlePaginationClick = (pageNumber) => {
    const active = this.state.pageActive;

    // Logic makes sure method returns if user clicks on page that is already active or
    // next on last or previous on first
    if (
      pageNumber === active ||
      (pageNumber === -1 && active === 1) ||
      (pageNumber === 0 && active === this.state.pagesTotal)
    )
      return;
    let newPage;

    if (pageNumber === 0) newPage = this.state.pageActive + 1;
    else if (pageNumber === -1) newPage = this.state.pageActive - 1;
    else newPage = pageNumber;

    this.handleStateUpdate(null, null, newPage);
  };

  handleStateUpdate = (newInput = null, newTools = null, newPage = null) => {
    // all the logic is here
    // this method is called from input tag and page change
    // variables are assigned to parameters if they are provided if then to state

    const inputText = newInput !== null ? newInput : this.state.inputText;
    const tools = newTools !== null ? newTools : this.state.tools;
    const pageActive = newPage ? newPage : 1;

    let projectsToDisplay;

    if (inputText !== null)
      projectsToDisplay = this.getProjectsFiltered(
        this.state.dataProjectsList,
        inputText
      );
    else if (tools !== null)
      projectsToDisplay = this.getProjectsFiltered(
        this.state.dataProjectsList,
        null,
        tools
      );
    else if (newPage !== null)
      projectsToDisplay = this.getProjectsFiltered(this.state.dataProjectsList);

    let projectsToDisplayForPage;
    if (newPage === null)
      projectsToDisplayForPage =
        this.filterListForCurrentPage(projectsToDisplay);
    else
      projectsToDisplayForPage = this.filterListForCurrentPage(
        projectsToDisplay,
        newPage
      );

    const pagesTotal = this.getPagesTotalNeed(projectsToDisplay);

    this.setState({
      tools: tools,
      inputText,
      pageActive,
      pagesTotal,
      projectsToDisplay,
      projectsToDisplayForPage,
    });
  };

  enableTagAllIfNoneSelected = (tools) => {
    for (const tool of tools) {
      if (tool.isSelected) return tools;
    }
    const tagAll = tools.find((x) => x.name === this.toolAllName);
    tagAll.isSelected = true;
    return tools;
  };

  hasTags = (project) => {
    const tools = this.state.tools;
    const toolsProject = project.tools;
    const toolsSelected = tools.filter((x) => x.isSelected);
    for (const toolSelected of toolsSelected)
      if (!toolsProject.includes(toolSelected.name)) return false;
    return true;
  };

  getResultMessage = (amount) => {
    if (amount === 1) return `FOUND ${amount} PROJECT`;
    if (amount > 1) return `FOUND ${amount} PROJECTS`;
    return `FOUND NO PROJECTS`;
  };

  render() {
    const { projectsToDisplay, projectsToDisplayForPage } = this.state;
    const amount = projectsToDisplay.length;
    const msg = this.getResultMessage(amount);

    return (
      <div className="projectsCardSection">
        <h1 className="searchHeader">{msg}</h1>
        <input
          onChange={(e) => this.handleInputChange(e.target.value)}
          placeholder="Project name..."
        />
        <ListGroup
          onTagSelect={(e) => this.handleToolSelect(e.name)}
          tags={this.state.tools}
        />
        <NoResultsImg amount={amount} />

        <div className="projectListSection">
          {projectsToDisplayForPage.map((project) => {
            return <ProjectCard key={project._id} data={project} />;
          })}
        </div>
        <Pagination
          paginationStyle={paginationStyle}
          pageActive={this.state.pageActive}
          pagesTotal={this.state.pagesTotal}
          onPagClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default ProjectCardsSection;
