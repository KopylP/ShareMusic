import React, { useState, Component } from "react";
import EnterNameForm from "../components/enter-name-form/enter-name-form";

export default function WithName(Wrapper) {
  return class extends Component {
    state = {
      name: null,
    };

    setName = (newName) => {
      const oldName = this.state.name;
      if (newName !== oldName) {
        this.setState({
          name: newName,
        });
      }
    };

    render() {
      const { name } = this.state;
      return name === null ? (
        <EnterNameForm onNameSubmit={this.setName} />
      ) : (
        <Wrapper name={name} {...this.props} />
      );
    }
  };
}
