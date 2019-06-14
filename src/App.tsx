import React, { Component } from 'react'
import './App.css'
import Timer from './Timer'
import Button from './Button'
import About from './About'
import TimeInput from './TimeInput'
import { Command } from './types'

interface Props {}

interface State {
  initialised: boolean;
  duration: number;
  commandHistory: Command[];
  skew: number;
  setup: Setup;
  isShowingInfo: boolean;
}

interface Setup {
  hours: string;
  minutes: string;
  seconds: string;
}

type field = 'hours' | 'minutes' | 'seconds'

class App extends Component<Props, State> {
  private readonly KEYCODE_ENTER: number

  constructor(props) {
    super(props)

    this.KEYCODE_ENTER = 13

    const TIME_DISPLAY_DEFAULT = {
      hours: '0',
      minutes: '00',
      seconds: '20',
    }

    const SKEW_INIT = 50

    this.state = {
      initialised: false,
      duration: 0,
      commandHistory: [],
      skew: SKEW_INIT,
      setup: TIME_DISPLAY_DEFAULT,
      isShowingInfo: false,
    }
  }

  private readonly handleGlobalKeypress: any = e => {
    if (e.keyCode === this.KEYCODE_ENTER) {
      console.log('enter pressed')
    }
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleGlobalKeypress)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleGlobalKeypress)
  }

  private readonly startTimer: () => void = () => {
    this.setState(prevState => {
      const { commandHistory } = {...prevState}

      commandHistory.push({
        commandType: 'START',
        timestamp: new Date().getTime()
      })

      return { commandHistory }
    })
  }

  private readonly pauseTimer: () => void = () => {
    this.setState(prevState => {
      const { commandHistory } = {...prevState}

      commandHistory.push({
        commandType: 'PAUSE',
        timestamp: new Date().getTime()
      })

      return { commandHistory }
    })
  }

  private readonly stopTimer: () => void = () => {
    this.setState({ commandHistory: [] })
  }

  private readonly editTimer: () => void = () => {
    this.setState({ initialised: false })
  }

  private readonly updateSkew: (e) => void = e => {
    const { value } = e.target
    this.setState({ skew: value })
  }

  private readonly updateField: (e, field: field) => void = (e, field) => {
    let { value } = e.target

    if (value.match(/\d+/)) {
      value = value
        .match(/\d+/)
        .join('')
        .slice(0, 2)
    } else {
      value = ''
    }

    this.setState(prevState => {
      const { setup } = prevState

      setup[field] = value

      return { setup }
    })
  }

  private readonly checkSubmit: (e) => void = e => {
    if (e.key === 'Enter') {
      this.finishInitialise()
    }
  }

  private readonly finishInitialise: () => void = () => {
    const { setup } = this.state

    const duration: number =
      Number(setup.hours) * 3600 +
      Number(setup.minutes) * 60 +
      Number(setup.seconds)

    if (duration <= 0) {
      this.setState({
        setup: {
          hours: '0',
          minutes: '05',
          seconds: '00',
        },
      })
    } else {
      this.setState({ initialised: true, duration })
    }
  }

  private readonly toggleShowInfo: () => void = () => {
    this.setState(prevState => ({ isShowingInfo: !prevState.isShowingInfo }))
  }

  render() {
    const {
      initialised,
      duration,
      commandHistory,
      skew,
      setup,
      isShowingInfo,
    } = this.state

    const active = commandHistory.length && commandHistory[commandHistory.length - 1].commandType === 'START'

    const startButton = (
      <Button name="start" onClick={this.startTimer} text="Start" />
    )
    const pauseButton = (
      <Button name="pause" onClick={this.pauseTimer} text="Pause" />
    )
    const stopButton = (
      <Button name="stop" onClick={this.stopTimer} text="Stop" />
    )
    const resetButton = (
      <Button name="reset" onClick={this.stopTimer} text="Reset" />
    )
    const editButton = (
      <Button name="edit" onClick={this.editTimer} text="Edit" />
    )

    const skewSlider = (
      <div id="container-skew-slider">
        not bad{' '}
        <input
          id="range-slider"
          type="range"
          min="0"
          max="100"
          value={skew}
          onChange={this.updateSkew}
        />{' '}
        very bad
      </div>
    )

    let buttonsContainer
    buttonsContainer = (
      <div id="container-buttons">
        {active ? pauseButton : startButton}
        {active ? stopButton : commandHistory.length ? resetButton : editButton}
        {active ? null : skewSlider}
      </div>
    )

    const timer = (
      <Timer
        duration={duration}
        commandHistory={commandHistory}
        skew={skew}
        children={buttonsContainer}
      />
    )

    const getTimeInput: (field) => JSX.Element = name => (
      <TimeInput
        name={name}
        checkSubmit={this.checkSubmit}
        setup={setup}
        updateField={this.updateField}
        isFocused={name === 'hours'}
      />
    )

    const timerSetup = (
      <div id="timer-setup">
        {getTimeInput('hours')}:{getTimeInput('minutes')}:
        {getTimeInput('seconds')}
        <Button name="save" text="Save" onClick={this.finishInitialise} />
      </div>
    )

    const containerTimer = (
      <div id="container-timer">{initialised ? timer : timerSetup}</div>
    )

    const containerInfo = <About toggleShowInfo={this.toggleShowInfo} />

    return (
      <div id="App">
        {isShowingInfo ? containerInfo : containerTimer}
        <div id="about-button" onClick={this.toggleShowInfo}>
          About
        </div>
      </div>
    )
  }
}

export default App
