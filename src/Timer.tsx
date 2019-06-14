import * as React from 'react'
import TimerDone from './TimerDone'
import { Command } from './types'

const { useEffect, useState } = React

interface Props {
  duration: number;
  commandHistory: any;
  skew: number;
  children: any;
}

const Timer: (props: Props) => JSX.Element = (props) => {
  const { duration, commandHistory, skew, children } = props

  let interval = null;

  const [currentTimestamp, setCurrentTimestamp] = useState(new Date().getTime())

  const updateTime = () => {
    setCurrentTimestamp(new Date().getTime())
  }

  useEffect(()=>{
    updateTime()
    clearInterval(interval)

    if (
      commandHistory.length &&
      commandHistory[commandHistory.length - 1].commandType === 'START'
    ) {
      interval = setInterval(updateTime, 100)
    }

    return ()=>{
      clearInterval(interval)
    }
  }, [commandHistory])

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

  if (elapsedDuration <= 0) {
    elapsedDuration = 0
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

  const active = false

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

export default Timer
