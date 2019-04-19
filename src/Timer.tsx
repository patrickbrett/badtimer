import React, { Component } from "react";
import TimerDone from "./TimerDone";

class Timer extends Component {
  render() {
    let { time, maxTime, skew, active } = this.props;

    let finished = false;

    /*
    skew to distortion
    skew is between 0 and 100
    skew of zero corresponds to distortion of 1 (no change)
    skew of 100 corresponds to distortion of 0.6 (huge change)

    distortion = 1 - skew/100 * 0.4
     */

    const distortion = 1 - (skew / 100) * 0.4;

    let modifiedTime = Math.ceil(
      Math.pow(time / maxTime, distortion) * maxTime
    );
    if (isNaN(modifiedTime) || time < 0) {
      modifiedTime = 0;
      finished = true;
    }

    let prependZero = num => {
      return num < 10 ? "0" + num : num;
    };

    const hours = Math.floor(modifiedTime / 3600);
    const minutes = prependZero(Math.floor((modifiedTime % 3600) / 60));
    const seconds = prependZero(Math.floor(modifiedTime % 60));

    const timeDisplay = (
      <div id="time-display">
        {hours}:{minutes}:{seconds}
      </div>
    );

    return (
      <div id="timer" className={active ? "large" : ""}>
        {finished ? <TimerDone /> : timeDisplay}
        {this.props.children}
      </div>
    );
  }
}

export default Timer;
