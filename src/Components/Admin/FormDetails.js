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
    };
  }

  componentDidMount() {
    const thing = this.props.thing;
    this.setState({ thingToModify: thing });

    const newObj = {};
    console.log(`zzzzzz  ${this.props.toolSchema}`);
    for (const prop of this.props.toolSchema) newObj[prop] = "";
    this.setState({ toolSchema: newObj });
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
    }
  }

  handleInputChange = (value, prop) => {
    const { posting, toolSchema, thingToModify } = this.state;
    const clone = posting ? _.clone(toolSchema) : _.clone(thingToModify);

    clone[prop] = value;
    if (posting) this.setState({ toolSchema: clone });
    else this.setState({ thingToModify: clone });
    this.props.onChange(prop, value);
    this.handlePostSchema();
  };

  handlePostSchema() {}
  render() {
    const { thingToModify, putting, deleting, posting, toolSchema } =
      this.state;

    if (!this.state.thingName) return null;

    if (!putting && !deleting && !posting) return null;

    if (this.props.thing === null && !posting) return null;

    if (deleting) return null;

    const arr = [];

    if (posting) {
      for (const prop in toolSchema) arr.push([prop, toolSchema[prop]]);
    } else
      for (const prop in thingToModify)
        if (prop !== "_id" && prop !== "__v")
          arr.push([prop, thingToModify[prop]]);

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
