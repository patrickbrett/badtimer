import React, { Component } from "react";
import "./App.css";
import Timer from "./Timer";
import Button from "./Button";
import Info from "./About";

class App extends Component {
  constructor(props) {
    super(props);

    const startTime = 30;
    const setupDefault = {
      hours: "0",
      minutes: "05",
      seconds: "00"
    };
    const refreshRate = 100; // times per second

    this.state = {
      initialised: false,
      time: startTime,
      maxTime: startTime,
      active: false,
      skew: 50,
      setup: setupDefault,
      isShowingInfo: false
    };

    this.componentDidMount = () => {
      setInterval(this.tick, 1000 / refreshRate);
    };

    this.tick = () => {
      this.setState(prevState => {
        let { time, active } = prevState;

        if (active && time > 0) {
          time -= 1 / refreshRate;
        }

        return { time };
      });
    };

    this.startTimer = () => {
      this.setState({ active: true });
    };

    this.pauseTimer = () => {
      this.setState({ active: false });
    };

    this.stopTimer = () => {
      let { maxTime } = this.state;

      this.setState({ active: false, time: maxTime });
    };

    this.editTimer = () => {
      let { maxTime } = this.state;

      this.setState({ active: false, time: maxTime, initialised: false });
    };

    this.updateSkew = e => {
      const { value } = e.target;
      this.setState({ skew: value });
    };

    this.updateField = (e, field) => {
      let { value } = e.target;

      if (value.match(/\d+/)) {
        value = value
          .match(/\d+/)
          .join("")
          .slice(0, 2);
      } else {
        value = "";
      }

      this.setState(prevState => {
        const { setup } = prevState;

        setup[field] = value;

        return { setup };
      });
    };

    this.checkSubmit = e => {
      if (e.key === "Enter") {
        this.finishInitialise();
      }
    };

    this.finishInitialise = () => {
      const { setup } = this.state;

      const time = +setup.hours * 3600 + +setup.minutes * 60 + +setup.seconds;

      if (time <= 0) {
        this.setState({
          setupHours: "0",
          setupMinutes: "05",
          setupSeconds: "00"
        });
      } else {
        this.setState({ time, maxTime: time, initialised: true });
      }
    };

    this.toggleShowInfo = () => {
      this.setState(prevState => ({ isShowingInfo: !prevState.isShowingInfo }));
    };
  }

  render() {
    const {
      initialised,
      time,
      maxTime,
      active,
      skew,
      setup,
      isShowingInfo
    } = this.state;

    const startButton = (
      <Button name="start" onClick={this.startTimer} text="Start" />
    );
    const pauseButton = (
      <Button name="pause" onClick={this.pauseTimer} text="Pause" />
    );
    const stopButton = (
      <Button name="stop" onClick={this.stopTimer} text="Stop" />
    );
    const resetButton = (
      <Button name="reset" onClick={this.stopTimer} text="Reset" />
    );
    const editButton = (
      <Button name="edit" onClick={this.editTimer} text="Edit" />
    );

    const skewSlider = (
      <div id="container-skew-slider">
        not bad{" "}
        <input
          id="range-slider"
          type="range"
          min="0"
          max="100"
          value={skew}
          onChange={this.updateSkew}
        />{" "}
        very bad
      </div>
    );

    const buttonsContainer = (
      <div id="container-buttons">
        {active ? pauseButton : startButton}
        {active ? stopButton : time === maxTime ? editButton : resetButton}
        {active ? null : skewSlider}
      </div>
    );

    const timer = (
      <Timer
        time={time}
        active={active}
        maxTime={maxTime}
        skew={skew}
        children={buttonsContainer}
      />
    );

    const timerSetup = (
      <div id="timer-setup">
        <input
          className="time-input"
          type="text"
          onChange={e => this.updateField(e, "hours")}
          onKeyPress={this.checkSubmit}
          value={setup.hours}
        />
        :
        <input
          className="time-input"
          type="text"
          onChange={e => this.updateField(e, "minutes")}
          onKeyPress={this.checkSubmit}
          value={setup.minutes}
        />
        :
        <input
          className="time-input"
          type="text"
          onChange={e => this.updateField(e, "seconds")}
          onKeyPress={this.checkSubmit}
          value={setup.seconds}
        />
        <Button name="save" text="Save" onClick={this.finishInitialise} />
      </div>
    );

    const containerTimer = (
      <div id="container-timer">{initialised ? timer : timerSetup}</div>
    );

    const containerInfo = <Info />;

    return (
      <div id="App">
        {isShowingInfo ? containerInfo : containerTimer}
        <div id="about-button" onClick={this.toggleShowInfo}>
          About
        </div>
      </div>
    );
  }
}

export default App;
