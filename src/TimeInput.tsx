import * as React from 'react'
import { Component } from 'react'

type field = 'hours' | 'minutes' | 'seconds'

interface Props {
  name: field
  checkSubmit: (e) => void
  updateField: (e, field: field) => void
  setup: Setup
}

interface State {}

interface Setup {
  hours: string
  minutes: string
  seconds: string
}

class TimeInput extends Component<Props, State> {
  render() {
    const { name, checkSubmit, updateField, setup } = this.props

    return (
      <input
        className="time-input"
        type="text"
        onChange={e => updateField(e, name)}
        onKeyPress={checkSubmit}
        value={setup[name]}
      />
    )
  }
}

export default TimeInput
