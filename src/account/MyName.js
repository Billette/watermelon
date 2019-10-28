import React, { Component } from "react";
import request from "../database/Request.js";

class MyName extends Component {

  state = {
    newFirstName: "",
    newLastName: "",
    newEmail: "",
    newPassword: "",
    errorNoModif: "",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayModify = () => {
    var errorNoModif = this.state.errorNoModif;

    return (
      <div>
        Changer le prénom: &ensp;{" "}
        <input
          type="text"
          name="newFirstName"
          value={this.state.newFirstName}
          onChange={this.handleChange}
        />{" "}
        &ensp; Changer le nom de famille: &ensp;{" "}
        <input
          type="text"
          name="newLastName"
          value={this.state.newLastName}
          onChange={this.handleChange}
        />{" "}
        &ensp; Changer l'adresse email: &ensp;{" "}
        <input
          type="text"
          name="newEmail"
          value={this.state.newEmail}
          onChange={this.handleChange}
        />{" "}
        &ensp; Changer le mot de passe: &ensp;{" "}
        <input
          type="text"
          name="newPassword"
          value={this.state.newPassword}
          onChange={this.handleChange}
        />{" "}
        <br></br>
        <button onClick={() => this.modifyUser(this.props.idUser)}>
          {" "}
          <h4> Valider les changements </h4>{" "}
        </button>
        {errorNoModif==="" ? null : <p style={{ color: "red" }}>{errorNoModif}</p>}
        <br></br>
      </div>
    );
  };

  modifyUser = idUser => {
    var usersKey = "Users";
    var users = request.getUsers();
    var isToModify = true;

    //get the new users without the removed user
    var newUsers = users.filter(user => user.id !== parseInt(idUser, 10));

    //get the user to modify
    var userToModify = users.find(user => user.id === parseInt(idUser, 10));

    let newFirstName= "";
    let newLastName= "";
    let newEmail= "";
    let newPassword="";

    // If all fields are empty, noting to modify
    if (
      this.state.newFirstName === "" &&
      this.state.newLastName === "" &&
      this.state.newEmail === "" &&
      this.state.newPassword === ""
    ) {
      isToModify = false;
    }

    if (isToModify === true) {
      // Check for empty text fields
      if (this.state.newFirstName !== "") {
        newFirstName = this.state.newFirstName;
      } else {
        newFirstName = userToModify.firstName;
      }

      if (this.state.newLastName !== "") {
        newLastName = this.state.newLastName;
      } else {
        newLastName = userToModify.lastName;
      }

      if (this.state.newEmail !== "") {
        newEmail = this.state.newEmail;
      } else {
        newEmail = userToModify.email;
      }

      if (this.state.newPassword !== "") {
        newPassword = this.state.newPassword;
      } else {
        newPassword = userToModify.password;
      }

      var newUser = {
        id: userToModify.id,
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword
      };

      newUsers.push(newUser);
      sessionStorage.setItem(usersKey, JSON.stringify(newUsers));

      // Reset the input text fields
      this.setState({
        newFirstName: "",
        newLastName: "",
        newEmail: "",
        newPassword: "",
        errorNoModif: "",
      });

      //Inform the super-parent (MyAccount) to re-render
      var handleToUpdate = this.props.handleToUpdate;
      handleToUpdate();
    } else {
      this.setState({
        errorNoModif: "Rien à modifier",
      })
      //console.log("Rien à modifier");
    }
  };

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
        <button onClick={logout}> <h3> Se déconnecter </h3> </button>
        <div className="displayModify"> {this.displayModify()} </div>
      </div>
    );
  }
}

export default MyName;
