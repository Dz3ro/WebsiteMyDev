import _ from "lodash";
import React, { Component } from "react";
import { getProjectTools } from "../../ProjectsDatabase";
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
      projectsSelected: "",
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
    this.setState({ tools });
    this.handleComponentsVisibility();
    this.handleThingToModifyUpdate();
    this.createSchemas(tools);
  }

  createSchemas(tools) {
    const tool = tools[0];
    const toolSchema = Object.keys(tool);
    const toolSchemaFiltered = toolSchema.filter(
      (x) => x !== "_id" && x !== "__v"
    );
    this.setState({ toolSchema: toolSchemaFiltered });
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

  handleToolSelectClick = (tool) => {
    const thingIndex = this.state.tools.findIndex((x) => x.name === tool);
    const thing = thingIndex === -1 ? null : this.state.tools[thingIndex];
    this.setState({ toolSelected: tool, thingToModifyUpdated: thing });
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
    const toolSelected = thing === this.objectNameTool;
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
      this.state.projectsSelected !== "" || this.state.toolSelected !== "";

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
    const { tools, toolSelected, thingToModify } = this.state;
    const thingIndex = tools.findIndex((x) => x.name === toolSelected);
    const thing = thingIndex === -1 ? null : tools[thingIndex];

    if (!_.isEqual(thingToModify, thing))
      this.setState({ thingToModify: thing });
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

  render() {
    const {
      toolsSelectorVisibility,
      btnPerformVisibility,
      tools,
      toolSelected,
    } = this.state;
    const typeOptions = [this.objectNameProject, this.objectNameTool];
    const actionOptions = [
      this.actionNamePost,
      this.actionNamePut,
      this.actionNameDelete,
    ];

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
            options={tools}
            onChange={this.handleToolSelectClick}
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
