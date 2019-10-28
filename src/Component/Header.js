import React, { Component } from "react";
import logo192 from "./logo192.png";

class Header extends Component {
  render() {
    return (
      <div>
        <div
          className="Header"
          style={{
            color: "white",
            backgroundColor: "black",
            marginTop: "-22px",
            display: "center"
          }}
        >
          <h1>Watermelon</h1> <img src={logo192} alt="logo"/>
        </div>
      </div>
    );
  }
}

export default Header;
