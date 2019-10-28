import React, { Component } from "react";
import Login from "./Login";
import Subscribe from "./Subscribe";

class Router extends Component {
  state = {
    route: "subscribe"
  };

  navigate = route => {
    //console.log("route", route);
    if (!["subscribe", "login"].includes(route)) {
      throw new Error("Route does not exist");
    }

    this.setState({
      route
    });
  };

  render() {
    const { route } = this.state;

    return route === "subscribe" ? (
      <Subscribe navigate={this.navigate} {...this.props} />
    ) : (
      <Login navigate={this.navigate} {...this.props} />
    );
  }
}

export default Router;
