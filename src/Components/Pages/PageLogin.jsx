import React, { Component } from "react";
import httpHandler from "../httpService/httpHandler";
import { withRouter } from "react-router-dom";

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      warningVisible: false,
    };
  }

  handleSubmit = async () => {
    const { email, password } = this.state;

    try {
      const res = await httpHandler.login(email, password, this.submitToCall);
      this.setState({ warningVisible: false });
      localStorage.setItem("token", res.headers["x-auth-token"]);
      this.props.history.push("/admin");
    } catch (e) {
      this.setState({ warningVisible: true, email: "", password: "" });
      console.log(e);
    }
  };

  submitToCall = (token) => {
    console.log(token);
    console.log(token["X-Auth-Token"]);
  };

  render() {
    return (
      <div className="loginContainer">
        <h3
          style={{
            visibility: this.state.warningVisible ? "visible" : "hidden",
          }}
          className="wrongLogin"
        >
          WRONG LOGIN
        </h3>
        <h1>ADMIN LOGIN</h1>
        <h2>You should not be here if you are a guest</h2>
        <form className="loginForm">
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="email"
          ></input>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="password"
          ></input>
          <button type="button" onClick={() => this.handleSubmit()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(PageLogin);
