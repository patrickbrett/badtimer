import React, { Component } from "react";

class Button extends Component {
  render() {
    const { name, onClick, text } = this.props;
    return (
      <button className="button" id={"button-" + name} onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;
