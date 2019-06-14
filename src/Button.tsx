import * as React from 'react'

interface Props {
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

const Button = (props: Props) => {
  const { name, onClick, text } = props

  return (
    <button type="button" className="button" id={`button-${name}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button