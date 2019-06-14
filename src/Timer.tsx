import * as React from 'react'
import TimerDone from './TimerDone'
import { Command } from './types'

const { Component } = React

interface Props {
  duration: number;
  commandHistory: any;
  skew: number;
  children: any;
}

interface State {}

class Timer extends Component<Props, State> {
  interval: any = null

  componentDidUpdate = (): void => {
    const { commandHistory } = { ...this.props }

    clearInterval(this.interval)

    if (
      commandHistory.length &&
      commandHistory[commandHistory.length - 1].commandType === 'START'
    ) {
      this.interval = setInterval(() => this.forceUpdate(), 100)
    }
  }

  render() {
    const { duration, commandHistory, skew, active, children }: any = this.props

    const currentTimestamp = new Date().getTime()

    let elapsedDuration = 0
    let sectionStart = 0
    commandHistory.forEach((command: Command) => {
      if (command.commandType === 'START') {
        sectionStart = command.timestamp
      } else if (command.commandType === 'PAUSE') {
        elapsedDuration += command.timestamp - sectionStart
        sectionStart = 0
      }
    })
    if (sectionStart > 0) {
      elapsedDuration += currentTimestamp - sectionStart
    }

    /*
    skew to distortion
    skew is between 0 and 100
    skew of zero corresponds to distortion of 1 (no change)
    skew of 100 corresponds to distortion of 0.6 (huge change)

    distortion = 1 - skew/100 * 0.4
     */

    const distortion: number = 1 - (skew / 100) * 0.4

    const durationMillis = duration * 1000

    const finished = elapsedDuration >= durationMillis;

    const modifiedTime = Math.ceil(
      ((durationMillis - elapsedDuration) / durationMillis) ** distortion *
        duration
    )

    const prependZero = (num: number) =>
      num < 10 ? `0${String(num)}` : String(num)

    const hours: string = String(Math.floor(modifiedTime / 3600))
    const minutes: string = prependZero(Math.floor((modifiedTime % 3600) / 60))
    const seconds: string = prependZero(Math.floor(modifiedTime % 60))

    const timeDisplay = (
      <div id="time-display">
        {hours}:{minutes}:{seconds}
      </div>
    )

    return (
      <div id="timer" className={active ? 'large' : ''}>
        {finished ? <TimerDone /> : timeDisplay}
        {children}
      </div>
    )
  }
}

export default Timer
