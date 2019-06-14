import React, { Component, Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Timer from './Timer'
import Button from './Button'
import About from './About'
import TimeInput from './TimeInput'
import { Command } from './types'

interface Setup {
  hours: string;
  minutes: string;
  seconds: string;
}

type Field = 'hours' | 'minutes' | 'seconds'

const App = () => {
  const SKEW_INIT = 50

  const TIME_DISPLAY_DEFAULT = {
    hours: '0',
    minutes: '00',
    seconds: '20',
  }

  const [initialised, setInitialised]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [duration, setDuration]: [number, Dispatch<SetStateAction<number>>] = useState(0)
  const [commandHistory, setCommandHistory]: [Command[], Dispatch<SetStateAction<Command[]>>] = useState([])
  const [skew, setSkew]: [number, Dispatch<SetStateAction<number>>] = useState(SKEW_INIT)
  const [setup, setSetup]: [Setup, Dispatch<SetStateAction<Setup>>] = useState(TIME_DISPLAY_DEFAULT)
  const [isShowingInfo, setIsShowingInfo]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const startTimer: () => void = () => {
    setCommandHistory(prevCommandHistory => {
      const newCommandHistory = [ ...prevCommandHistory ]

      newCommandHistory.push({
        commandType: 'START',
        timestamp: new Date().getTime()
      })

      return newCommandHistory
    })
  }

  const pauseTimer: () => void = () => {
    setCommandHistory(prevCommandHistory => {
      const newCommandHistory = [ ...prevCommandHistory ]

      newCommandHistory.push({
        commandType: 'PAUSE',
        timestamp: new Date().getTime()
      })

      return newCommandHistory
    })
  }

  const stopTimer: () => void = () => {
    setCommandHistory([])
  }

  const editTimer: () => void = () => {
    setInitialised(false)
  }

  const updateSkew: (e: any) => void = e => {
    const { value } = e.target
    setSkew(value)
  }

  const updateField: (e: any, field: Field) => void = (e, field) => {
    let { value } = e.target

    console.log(value)

    if (value.match(/\d+/)) {
      value = value
        .match(/\d+/)
        .join('')
        .slice(0, 2)
    } else {
      value = ''
    }

    setSetup(prevSetup => {
      const newSetup = { ...prevSetup }
      newSetup[field] = value
      return newSetup
    })
  }

  const finishInitialise: () => void = () => {
    const newDuration: number =
      Number(setup.hours) * 3600 +
      Number(setup.minutes) * 60 +
      Number(setup.seconds)

    if (newDuration <= 0) {
      setSetup({
        hours: '0',
        minutes: '05',
        seconds: '00',
      })
    } else {
      setInitialised(true)
      setDuration(newDuration)
    }
  }

  const checkSubmit: (e) => void = e => {
    if (e.key === 'Enter') {
      finishInitialise()
    }
  }

  const toggleShowInfo: () => void = () => {
    setIsShowingInfo(prevIsShowingInfo => !prevIsShowingInfo)
  }

  const active = commandHistory.length && commandHistory[commandHistory.length - 1].commandType === 'START'

  const startButton = (
    <Button name="start" onClick={startTimer} text="Start" />
  )
  const pauseButton = (
    <Button name="pause" onClick={pauseTimer} text="Pause" />
  )
  const stopButton = (
    <Button name="stop" onClick={stopTimer} text="Stop" />
  )
  const resetButton = (
    <Button name="reset" onClick={stopTimer} text="Reset" />
  )
  const editButton = (
    <Button name="edit" onClick={editTimer} text="Edit" />
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
        onChange={updateSkew}
      />{' '}
      very bad
    </div>
  )

  const buttonsContainer = (
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
    >{buttonsContainer}</Timer>
  )

  const getTimeInput: (field: any) => JSX.Element = name => (
    <TimeInput
      name={name}
      checkSubmit={checkSubmit}
      setup={setup}
      updateField={updateField}
      isFocused={name === 'hours'}
    />
  )

  const timerSetup = (
    <div id="timer-setup">
      {getTimeInput('hours')}:{getTimeInput('minutes')}:
      {getTimeInput('seconds')}
      <Button name="save" text="Save" onClick={finishInitialise} />
    </div>
  )

  const containerTimer = (
    <div id="container-timer">{initialised ? timer : timerSetup}</div>
  )

  const containerInfo = <About toggleShowInfo={toggleShowInfo} />

  return (
    <div id="App">
      {isShowingInfo ? containerInfo : containerTimer}
      <div id="about-button" onClick={toggleShowInfo}>
        About
      </div>
    </div>
  )
}

export default App
