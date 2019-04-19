import React, { Component } from "react";

class TimerDone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flash: true
    };

    this.componentDidMount = () => {
      setInterval(this.flash, 500);
    };

    this.flash = () => {
      this.setState(prevState => ({ flash: !prevState.flash }));
    };
  }

  render() {
    return (
        <div id="timer-done">Timer Done</div>
    )
  }
}

export default TimerDone;
