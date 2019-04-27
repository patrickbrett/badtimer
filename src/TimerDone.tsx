import * as React from "react";
import {Component} from "react";

interface Props {}

interface State {
  flash: boolean
}

class TimerDone extends Component<Props, State> {
  private flash: () => void;

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
