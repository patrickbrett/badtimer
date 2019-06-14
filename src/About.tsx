import React from 'react'
import { version } from './package.alias.json'

interface Props {
  toggleShowInfo: () => void
}

const Button = (props: Props) => {
  const { toggleShowInfo } = props

  return (
    <div id="containerAbout">
      <div id="containerAboutInner">
        <div>
          <h1>BadTimer</h1>
        </div>
        <div id="about-text">
          <p>Because most timers don't speed up enough.</p>
          <p>v{version}</p>
          <p>
            &copy; 2019{' '}
            <a
              className="link"
              href="https://patrickbrett.net"
              target="_BLANK"
              rel="noopener noreferrer"
            >
              Patrick Brett
            </a>
          </p>
          <p>
            <a
              className="link"
              href="https://github.com/patrickbrett/badtimer"
              target="_BLANK"
              rel="noopener noreferrer"
            >
              View source on Github
            </a>
          </p>
          <div id="closeAbout" onClick={toggleShowInfo} />
        </div>
      </div>
    </div>
  )
}

export default Button
