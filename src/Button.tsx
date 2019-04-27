import * as React from "react";
import { Component } from "react";

interface Props {
  name: string,
  onClick: () => void,
  text: string
}

interface State {}

class Button extends Component<Props, State> {
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
