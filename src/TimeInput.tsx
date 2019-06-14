import * as React from 'react'
import { Component } from 'react'

type field = 'hours' | 'minutes' | 'seconds'

interface Props {
  name: field
  checkSubmit: (e) => void
  updateField: (e, field: field) => void
  setup: Setup
  isFocused: boolean
}

interface Setup {
  hours: string
  minutes: string
  seconds: string
}

const TimeInput = (props: Props) => {
  const { name, checkSubmit, updateField, setup, isFocused } = props

  return (
    <input
      className="time-input"
      type="text"
      onChange={e => updateField(e, name)}
      onKeyPress={checkSubmit}
      value={setup[name]}
      autoFocus={isFocused}
    />
  )
}

export default TimeInput
