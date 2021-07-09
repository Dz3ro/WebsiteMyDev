import React, { Component } from "react";

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
    };
  }

  componentDidUpdate() {
    if (this.props.visibility === "hidden" && this.state.selectValue !== "") {
      this.setState({ selectValue: "" });
    }
  }

  handleValueSelect = (value) => {
    this.setState({ selectValue: value });
    this.props.onChange(value);
  };

  render() {
    const { id, options, visibility } = this.props;
    const idCapitalized = id.charAt(0).toUpperCase() + id.slice(1);
    const hasObjects = options[0] === Object(options[0]);
    let optRender;
    if (!hasObjects)
      optRender = options.map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ));
    else
      optRender = options.map((x) => (
        <option key={x._id} value={x.name}>
          {x.name}
        </option>
      ));

    return (
      <div
        style={{ visibility }}
        className="containerSelect"
        id={`container${idCapitalized}`}
      >
        <label id={`label${idCapitalized}`} htmlFor={id}>
          {idCapitalized}
        </label>
        <select
          onChange={(e) => this.handleValueSelect(e.target.value)}
          value={this.state.selectValue}
          id={`select${idCapitalized}`}
          className="adminSelect"
        >
          <option value="">Choose...</option>
          {optRender}
        </select>
      </div>
    );
  }
}

export default Selector;
