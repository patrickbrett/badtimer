import React, { Component } from "react";
import "./App.css";
import Timer from "./Timer";
import Button from "./Button";
import About from "./About";
import TimeInput from "./TimeInput";

interface Props {}

interface State {
  initialised: boolean,
  time: number,
  maxTime: number,
  active: boolean,
  skew: number,
  setup: Setup,
  isShowingInfo: boolean
}

interface Setup {
  hours: string,
  minutes: string,
  seconds: string
}

type field = "hours" | "minutes" | "seconds";

class App extends Component<Props, State> {
  private readonly REFRESH_RATE: number = 100;

  constructor(props) {
    super(props);

    const TIME_DISPLAY_DEFAULT = {
      hours: "0",
      minutes: "05",
      seconds: "00"
    };

    const SKEW_INIT = 50;

    this.state = {
      initialised: false,
      time: 0,
      maxTime: 0,
      active: false,
      skew: SKEW_INIT,
      setup: TIME_DISPLAY_DEFAULT,
      isShowingInfo: false
    };
  }

  componentDidMount = () => {
    setInterval(this.tick, 1000 / this.REFRESH_RATE);
  };

  private readonly tick: TimerHandler = () => {
    this.setState(prevState => {
      let { time, active }: { time: number, active: boolean } = prevState;

      if (active && time > 0) {
        time -= 1 / this.REFRESH_RATE;
      }

      return { time };
    });
  };

  private readonly startTimer: () => void = () => {
    this.setState({ active: true });
  };

  private readonly pauseTimer : () => void = () => {
    this.setState({ active: false });
  };

  private readonly stopTimer: () => void = () => {
    let { maxTime } = this.state;

    this.setState({ active: false, time: maxTime });
  };

  private readonly editTimer: () => void = () => {
    let { maxTime } = this.state;

    this.setState({ active: false, time: maxTime, initialised: false });
  };

  private readonly updateSkew: (e) => void = e => {
    const { value } = e.target;
    this.setState({ skew: value });
  };

  private readonly updateField: (e, field: field) => void = (e, field) => {
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

  private readonly checkSubmit: (e) => void = e => {
    if (e.key === "Enter") {
      this.finishInitialise();
    }
  };

  private readonly finishInitialise: () => void = () => {
    const { setup } = this.state;

    const time: number = Number(setup.hours) * 3600 + Number(setup.minutes) * 60 + Number(setup.seconds);

    if (time <= 0) {
      this.setState({
        setup: {
          hours: "0",
          minutes: "05",
          seconds: "00"
        }
      });
    } else {
      this.setState({ time, maxTime: time, initialised: true });
    }
  };

  private readonly toggleShowInfo: () => void = () => {
    this.setState(prevState => ({ isShowingInfo: !prevState.isShowingInfo }));
  };

  render() {
    const {
      initialised,
      time,
      maxTime,
      active,
      skew,
      setup,
      isShowingInfo
    }: {
      initialised: boolean,
      time: number,
      maxTime: number,
      active: boolean,
      skew: number,
      setup: Setup,
      isShowingInfo: boolean
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

    let buttonsContainer;
    if (time > 0) {
      buttonsContainer = (
          <div id="container-buttons">
            {active ? pauseButton : startButton}
            {active ? stopButton : time === maxTime ? editButton : resetButton}
            {active ? null : skewSlider}
          </div>
      );
    } else {
      buttonsContainer = (
          <div id="container-buttons">
            {resetButton}
          </div>
      );
    }

    const timer = (
      <Timer
        time={time}
        active={active}
        maxTime={maxTime}
        skew={skew}
        children={buttonsContainer}
      />
    );

    const getTimeInput: (field) => JSX.Element = name => <TimeInput name={name} checkSubmit={this.checkSubmit} setup={setup} updateField={this.updateField} />;

    const timerSetup = (
      <div id="timer-setup">
        {getTimeInput("hours")}
        :
        {getTimeInput("minutes")}
        :
        {getTimeInput("seconds")}
        <Button name="save" text="Save" onClick={this.finishInitialise} />
      </div>
    );

    const containerTimer = (
      <div id="container-timer">{initialised ? timer : timerSetup}</div>
    );

    const containerInfo = <About toggleShowInfo={this.toggleShowInfo} />;

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