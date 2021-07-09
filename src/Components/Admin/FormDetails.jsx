import _ from "lodash";
import React, { Component } from "react";

class FormDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thingToModify: {},
      putting: false,
      deleting: false,
      posting: false,
      thingName: "",
      toolSchema: {},
      projectSchema: {},
    };
  }

  componentDidMount() {
    const thing = this.props.thing;
    this.setState({ thingToModify: thing });

    const newObjTools = {};
    const newObjProjects = {};

    for (const prop of this.props.toolSchema) newObjTools[prop] = "";
    for (const prop of this.props.projectSchema) newObjProjects[prop] = "";

    this.setState({ toolSchema: newObjTools, projectSchema: newObjProjects });
  }

  componentDidUpdate() {
    const { thing, putting, deleting, posting, thingName } = this.props;

    if (this.state.thingName !== thingName) this.setState({ thingName });

    if (
      !_.isEmpty(thing) &&
      thing !== null &&
      thing._id !== this.state.thingToModify._id
    )
      this.setState({ thingToModify: thing });

    if (putting !== this.state.putting) this.setState({ putting });
    if (deleting !== this.state.deleting) this.setState({ deleting });
    if (posting !== this.state.posting) this.setState({ posting });

    if (_.isEmpty(this.state.toolSchema) && this.props.toolSchema.length > 0) {
      const newObj = {};
      for (const prop of this.props.toolSchema) newObj[prop] = "";
      this.setState({ toolSchema: newObj });

      if (
        _.isEmpty(this.state.projectSchema) &&
        this.props.projectSchema.length > 0
      ) {
        const newObj = {};
        for (const prop of this.props.projectSchema) newObj[prop] = "";
        this.setState({ projectSchema: newObj });
      }
    }
  }

  handleInputChange = (value, prop) => {
    const { posting, toolSchema, thingToModify, projectSchema, thingName } =
      this.state;

    if (this.props.thingName === "Tool") {
      const clone = posting ? _.clone(toolSchema) : _.clone(thingToModify);
      clone[prop] = value;
      if (posting) this.setState({ toolSchema: clone });
      else this.setState({ thingToModify: clone });
      this.props.onChange(prop, value);
    } else if (this.props.thingName === "Project") {
      const clone = posting ? _.clone(projectSchema) : _.clone(thingToModify);
      clone[prop] = value;
      if (posting) this.setState({ projectSchema: clone });
      else this.setState({ thingToModify: clone });
      this.props.onChange(prop, value);
    }
  };

  fillArrayLogic(schema) {
    const { thingToModify, posting, toolSchema, projectSchema, thingName } =
      this.state;
    const arr = [];
    if (posting) {
      for (const prop in schema) arr.push([prop, schema[prop]]);
    } else
      for (const prop in thingToModify) arr.push([prop, thingToModify[prop]]);

    const newArr = arr.filter((x) => !x.includes("_id") && !x.includes("__v"));
    return newArr;
  }
  FillArrayTool() {
    const { thingToModify, posting, toolSchema, projectSchema, thingName } =
      this.state;
    const arr = [];
    if (posting && thingName === "Tool") {
      for (const prop in toolSchema) arr.push([prop, toolSchema[prop]]);
    } else
      for (const prop in thingToModify) arr.push([prop, thingToModify[prop]]);

    const newArr = arr.filter((x) => !x.includes("_id") && !x.includes("__v"));
    return newArr;
  }

  render() {
    const {
      thingToModify,
      putting,
      deleting,
      posting,
      toolSchema,
      projectSchema,
      thingName,
    } = this.state;

    if (!this.state.thingName) return null;

    if (!putting && !deleting && !posting) return null;

    if (this.props.thing === null && !posting) return null;

    if (deleting) return null;

    const arr =
      thingName === "Tool"
        ? this.fillArrayLogic(toolSchema)
        : this.fillArrayLogic(projectSchema);

    return (
      <div className="adminFormDetails">
        {arr.map((x) => (
          <div className="adminFormDetailsChild" key={x[0]}>
            <label>{x[0]}</label>
            <input
              onChange={(e) => this.handleInputChange(e.target.value, x[0])}
              value={x[1]}
            ></input>
          </div>
        ))}
      </div>
    );
  }
}

export default FormDetails;
