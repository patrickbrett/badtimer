import * as React from "react";
import TimerDone from "./TimerDone";
import {Component} from "react";

class Timer extends Component {
  props: any;

  render() {
    let { time, maxTime, skew, active }: { time: number, maxTime: number, skew: number, active: boolean } = this.props;

    let finished: boolean = false;

    /*
    skew to distortion
    skew is between 0 and 100
    skew of zero corresponds to distortion of 1 (no change)
    skew of 100 corresponds to distortion of 0.6 (huge change)

    distortion = 1 - skew/100 * 0.4
     */

    const distortion: number = 1 - (skew / 100) * 0.4;

    let modifiedTime: number = Math.ceil(
      Math.pow(time / maxTime, distortion) * maxTime
    );

    if (isNaN(modifiedTime) || time < 0) {
      modifiedTime = 0;
      finished = true;
    }

    let prependZero = (num: number) => num < 10 ? "0" + String(num) : String(num);

    const hours: string = String(Math.floor(modifiedTime / 3600));
    const minutes: string = prependZero(Math.floor((modifiedTime % 3600) / 60));
    const seconds: string = prependZero(Math.floor(modifiedTime % 60));

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
