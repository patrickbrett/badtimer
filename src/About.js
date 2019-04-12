import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <div id="container-about">
        <div>
          <div>
            <h1>BadTimer</h1>
          </div>
          <div id="about-text">
            <p>Because most timers don't speed up enough.</p>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
