import React, { Component } from "react";

class MyName extends Component {
  render() {
    const {
      myUser: { firstName, lastName, email },
      logout
    } = this.props;
    return (
      <div className="MyName">
        <h2> Votre compte </h2>
        {firstName} {lastName} &emsp;-&emsp; {email}
        <br />
        <button onClick={logout}>Se déconnecter</button>
      </div>
    );
  }
}

export default MyName;
