import { getProjectTags, getProjectsAll } from "../../ProjectsDatabase";
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
  tagAllName = "All";
  projectsPerPage = 10;

  constructor(props) {
    super(props);
    this.state = {
      dataProjectTags: [],
      dataProjectsList: [],
      inputText: "",
      tags: [],
      pagesTotal: 0,
      pageActive: 0,
      projectsToDisplay: [],
      projectsToDisplayForPage: [],
    };
  }

  componentDidMount() {
    const dataProjectTags = getProjectTags();
    const dataProjectsList = getProjectsAll();
    const tags = this.createTagsArray(dataProjectTags);
    const projectsToDisplay = this.getProjectsFiltered(dataProjectsList);
    const pagesTotal = this.getPagesTotalNeed(projectsToDisplay);
    const projectsToDisplayForPage =
      this.filterListForCurrentPage(projectsToDisplay);
    const pageActive = 1;

    this.setState({
      dataProjectTags,
      dataProjectsList,
      tags,
      pagesTotal,
      pageActive,
      projectsToDisplay,
      projectsToDisplayForPage,
    });
  }

  getProjectsFiltered = (projects, input = null, tag = null) => {
    const projectsFilByInput = this.filterListByInputText(projects, input);
    const projectsFilByTag = this.filterListByTags(projectsFilByInput, tag);

    return projectsFilByTag;
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

  filterListByTags = (projects, tags) => {
    const newTags = tags ? tags : this.state.tags;
    if (newTags.length < 2) return projects;
    const tagAll = newTags.find((x) => x.name === this.tagAllName);
    if (tagAll.isSelected) return projects;

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

  createTagsArray = (dataProjectTags) => {
    if (this.state.tags.length > 1) return;
    const tagsData = dataProjectTags;
    let tags = [];

    for (const tag of tagsData) tags.push({ name: tag, isSelected: false });

    const all = { name: this.tagAllName, isSelected: true };
    tags.unshift(all);
    return tags;
  };

  handleInputChange = (inputText) => {
    this.handleStateUpdate(inputText);
  };

  handleTagSelect = (tagName) => {
    let tags = this.state.tags;
    const tag = tags.find((x) => x.name === tagName);

    if (tag.name === this.tagAllName)
      for (const tag of tags) tag.isSelected = false;
    else tags.find((x) => x.name === this.tagAllName).isSelected = false;

    tag.isSelected = !tag.isSelected;
    tags = this.enableTagAllIfNoneSelected(tags);

    this.handleStateUpdate(null, tags, null);
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

  handleStateUpdate = (newInput = null, newTags = null, newPage = null) => {
    // all the logic is here
    // this method is called from input tag and page change
    // variables are assigned to parameters if they are provided if then to state

    const inputText = newInput !== null ? newInput : this.state.inputText;
    const tags = newTags !== null ? newTags : this.state.tags;
    const pageActive = newPage ? newPage : 1;

    let projectsToDisplay;

    if (inputText !== null)
      projectsToDisplay = this.getProjectsFiltered(
        this.state.dataProjectsList,
        inputText
      );
    else if (tags !== null)
      projectsToDisplay = this.getProjectsFiltered(
        this.state.dataProjectsList,
        null,
        tags
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
      tags,
      inputText,
      pageActive,
      pagesTotal,
      projectsToDisplay,
      projectsToDisplayForPage,
    });
  };

  enableTagAllIfNoneSelected = (tags) => {
    for (const tag of tags) {
      if (tag.isSelected) return tags;
    }
    const tagAll = tags.find((x) => x.name === this.tagAllName);
    tagAll.isSelected = true;
    return tags;
  };

  hasTags = (project) => {
    const tags = this.state.tags;
    const tagsProject = project.usedTools;
    const tagsSelected = tags.filter((x) => x.isSelected);
    for (const tagSelected of tagsSelected)
      if (!tagsProject.includes(tagSelected.name)) return false;
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
          onTagSelect={(e) => this.handleTagSelect(e.name)}
          tags={this.state.tags}
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
