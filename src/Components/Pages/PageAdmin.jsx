import _ from "lodash";
import React, { Component } from "react";
import { getProjects, getProjectTools } from "../../ProjectsDatabase";
import Selector from "../Admin/Selector";
import FormDetails from "../Admin/FormDetails";
import httpHandler from "../httpService/httpHandler";

class PageAdmin extends Component {
  objectNameTool = "Tool";
  objectNameProject = "Project";
  actionNamePost = "Post";
  actionNamePut = "Put";
  actionNameDelete = "Delete";

  cssVisible = "visible";
  cssHidden = "hidden";

  constructor(props) {
    super(props);
    this.state = {
      thing: "",
      action: "",
      tools: [],
      toolSelected: "",
      toolsSelectorVisibility: this.cssHidden,
      projects: [],
      projectSelected: "",
      projectsSelectorVisibility: this.cssHidden,
      btnPerformVisibility: this.cssHidden,
      formDetailsVisibility: this.cssHidden,
      thingToModify: {},
      thingToModifyUpdated: {},
      toolSchema: [],
      projectSchema: [],
    };
  }

  async componentDidMount() {
    const tools = await getProjectTools();
    const projects = await getProjects();
    this.handleComponentsVisibility();
    this.handleThingToModifyUpdate();
    const toolSchema = this.getObjectSchema(tools);
    const projectSchema = this.getObjectSchema(projects);
    this.setState({ tools, projects, toolSchema, projectSchema });
  }

  getObjectSchema(objectsDatabase) {
    const object = objectsDatabase[0];
    const objectSchema = Object.keys(object);
    const objectSchemaFiltered = objectSchema.filter(
      (x) => x !== "_id" && x !== "__v"
    );
    return objectSchemaFiltered;
  }

  componentDidUpdate() {
    this.handleComponentsVisibility();
    this.handleToolSelectUpdate();
    this.handleThingToModifyUpdate();
  }

  handleChooseType = (value) => {
    this.setState({ thing: value });
  };

  handleChooseAction = (value) => {
    this.setState({ action: value });
  };

  handleObjectSelectClick = (obj) => {
    if (this.state.thing === this.objectNameTool) {
      const thingIndex = this.state.tools.findIndex((x) => x.name === obj);
      const thing = thingIndex === -1 ? null : this.state.tools[thingIndex];
      this.setState({ toolSelected: obj, thingToModifyUpdated: thing });
    } else if (this.state.thing === this.objectNameProject) {
      console.log("ahgi");
      const thingIndex = this.state.projects.findIndex((x) => x.name === obj);
      const thing = thingIndex === -1 ? null : this.state.projects[thingIndex];
      this.setState({ projectSelected: obj, thingToModifyUpdated: thing });
    }
  };

  handleToolSelectUpdate = () => {
    const { toolsSelectorVisibility, toolSelected } = this.state;
    if (toolsSelectorVisibility === this.cssHidden && toolSelected !== "")
      this.setState({ toolSelected: "" });
  };

  handleComponentsVisibility() {
    this.handleSelectorsVisibilityTool();
    this.handleBtnPerformVisibility();
  }

  handleSelectorsVisibilityTool() {
    const { thing, action, toolsSelectorVisibility } = this.state;
    const toolSelected =
      thing === this.objectNameTool || this.objectNameProject;
    const putOrDel =
      action === this.actionNamePut || action === this.actionNameDelete;
    const visible = toolsSelectorVisibility === this.cssVisible;

    if (!toolSelected && visible)
      this.setState({ toolsSelectorVisibility: this.cssHidden });
    else if (toolSelected && putOrDel && !visible)
      this.setState({ toolsSelectorVisibility: this.cssVisible });
    else if (toolSelected && !putOrDel && visible)
      this.setState({ toolsSelectorVisibility: this.cssHidden });
  }

  handleBtnPerformVisibility() {
    const visibleType =
      this.state.toolsSelectorVisibility === this.cssVisible ||
      this.state.projectsSelectorVisibility === this.cssVisible;

    const typeSelected = this.state.thing !== "";
    const visibleButton = this.state.btnPerformVisibility === this.cssVisible;
    const toolOrProjectSelected =
      this.state.projectSelected !== "" || this.state.toolSelected !== "";

    const posting = this.state.action === this.actionNamePost;

    if (typeSelected && posting && !visibleButton) {
      this.setState({ btnPerformVisibility: this.cssVisible });
    } else if (visibleType && toolOrProjectSelected && !visibleButton)
      this.setState({ btnPerformVisibility: this.cssVisible });
    else if (visibleType && !toolOrProjectSelected && !posting && visibleButton)
      this.setState({ btnPerformVisibility: this.cssHidden });
    else if (!visibleType && visibleButton && !posting)
      this.setState({ btnPerformVisibility: this.cssHidden });
  }

  handleThingToModifyUpdate() {
    const {
      tools,
      projects,
      projectSelected: projectSelected,
      toolSelected,
      thingToModify,
    } = this.state;
    if (this.state.thing === this.objectNameTool) {
      const thingIndex = tools.findIndex((x) => x.name === toolSelected);
      const thing = thingIndex === -1 ? null : tools[thingIndex];

      if (!_.isEqual(thingToModify, thing))
        this.setState({ thingToModify: thing });
    } else if (this.state.thing === this.objectNameProject) {
      const thingIndex = projects.findIndex((x) => x.name === projectSelected);
      const thing = thingIndex === -1 ? null : projects[thingIndex];
      if (!_.isEqual(thingToModify, thing))
        this.setState({ thingToModify: thing });
    }
  }

  handleThingToModifyValueChange = (prop, value) => {
    let clone = _.clone(this.state.thingToModifyUpdated);
    clone[prop] = value;

    this.setState({ thingToModifyUpdated: clone });
  };

  handleBtnPerformLogic = async () => {
    const { action, thing, thingToModifyUpdated } = this.state;
    if (action === this.actionNamePut && thing === this.objectNameTool)
      this.setState({ btnPerformVisibility: this.cssHidden });

    if (thing === this.objectNameTool && action === this.actionNamePost)
      this.handleToolPost(thingToModifyUpdated);
    else if (thing === this.objectNameTool && action === this.actionNamePut)
      this.handleToolUpdate(thingToModifyUpdated);
    else if (thing === this.objectNameTool && action === this.actionNameDelete)
      this.handleToolDelete(thingToModifyUpdated);
    else if (thing === this.objectNameProject && action === this.actionNamePost)
      this.handleProjectPost(thingToModifyUpdated);
    else if (thing === this.objectNameProject && action === this.actionNamePut)
      this.handleProjectUpdate(thingToModifyUpdated);
    else if (
      thing === this.objectNameProject &&
      action === this.actionNameDelete
    )
      this.handleProjectDelete(thingToModifyUpdated);
  };

  async handleToolPost(tool) {
    await httpHandler
      .toolPost(tool)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  async handleToolUpdate(tool) {
    await httpHandler
      .toolUpdate(tool)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  async handleToolDelete(tool) {
    await httpHandler
      .toolDelete(tool)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  async handleProjectPost(project) {
    await httpHandler
      .projectPost(project)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  async handleProjectUpdate(project) {
    await httpHandler
      .projectUpdate(project)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  async handleProjectDelete(project) {
    await httpHandler
      .projectDelete(project)
      .then(() => {
        console.log("SUCCESS");
        window.location.reload();
      })
      .catch((e) => console.log(`fail ${e}`));
  }

  render() {
    const {
      toolsSelectorVisibility,
      btnPerformVisibility,
      tools,
      toolSelected,
      projects,
      thing,
    } = this.state;
    const typeOptions = [this.objectNameProject, this.objectNameTool];
    const actionOptions = [
      this.actionNamePost,
      this.actionNamePut,
      this.actionNameDelete,
    ];

    const options = thing === "Tool" ? tools : projects;

    return (
      <div className="adminContainerContainer">
        <div className="adminContainer">
          <Selector
            visibility={this.cssVisible}
            id={"thing"}
            options={typeOptions}
            onChange={this.handleChooseType}
          />
          <Selector
            visibility={this.cssVisible}
            id={"action"}
            options={actionOptions}
            onChange={this.handleChooseAction}
          />
          <Selector
            visibility={toolsSelectorVisibility}
            id={"tools"}
            options={options}
            onChange={this.handleObjectSelectClick}
          />
          <button
            onClick={() => this.handleBtnPerformLogic()}
            style={{ visibility: btnPerformVisibility }}
            className="btnAdminPerform"
          >
            Perform
          </button>
        </div>
        <FormDetails
          projectSchema={this.state.projectSchema}
          toolSchema={this.state.toolSchema}
          posting={this.state.action === this.actionNamePost}
          deleting={this.state.action === this.actionNameDelete}
          putting={this.state.action === this.actionNamePut}
          onChange={this.handleThingToModifyValueChange}
          thing={this.state.thingToModify}
          thingName={this.state.thing}
        />
      </div>
    );
  }
}

export default PageAdmin;
