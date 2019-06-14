import * as React from 'react'

interface Props {
  name: string
  onClick: () => void
  text: string
}

const Button = (props: Props) => {
  const { name, onClick, text } = props

  return (
    <button className="button" id={'button-' + name} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button