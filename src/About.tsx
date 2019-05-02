import React, { Component } from "react";

// @ts-ignore
import { version } from "./package.alias.json";

interface Props {
  toggleShowInfo: () => void
}

interface State {}

class Button extends Component<Props, State> {
  render() {
    return (
      <div id="containerAbout">
        <div id="containerAboutInner">
          <div>
            <h1>BadTimer</h1>
          </div>
          <div id="about-text">
            <p>Because most timers don't speed up enough.</p>
            <p>v{version}</p>
            <p>
              &copy; 2019{" "}
              <a
                className="link"
                href="https://patrickbrett.net"
                target="_BLANK"
              >
                Patrick Brett
              </a>
            </p>
            <p>
              <a
                className="link"
                href="https://github.com/patrickbrett/badtimer"
                target="_BLANK"
              >
                View source on Github
              </a>
            </p>
            <div id="closeAbout" onClick={this.props.toggleShowInfo}>X</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
