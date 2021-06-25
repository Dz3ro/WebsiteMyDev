import React, { Component } from "react";
import "react-dom";
import Navbar from "./Navbar/Navbar";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default MainPage;
