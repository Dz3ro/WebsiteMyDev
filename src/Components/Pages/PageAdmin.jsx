import React, { Component } from "react";
import httpHandler from "../httpService/httpHandler";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = async () => {
    const x = await httpHandler.testing();
    console.log(x);
  };
  render() {
    return (
      <div className="adminContainer">
        <h1>ADMIN LOGIN</h1>
        <h2>You should not be here if you are a guest</h2>
        <form className="adminForm">
          <input placeholder="email"></input>
          <input placeholder="password"></input>
          <button type="button" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PageLogin;
