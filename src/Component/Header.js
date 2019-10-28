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
            fontSize: "40px",
            backgroundColor: "black",
            marginTop: "-60px",
            display: "center"
          }}
        >
          <h1
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              Top: "50%"
            }}
          >
            <img src={logo192} alt="logo" />
            Watermelon
          </h1>
        </div>
      </div>
    );
  }
}

export default Header;
