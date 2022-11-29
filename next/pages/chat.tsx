import { DirectLine } from 'botframework-directlinejs'
import ReactWebChat from 'botframework-webchat'
import React, { useRef, useState } from 'react'

import Close from '../assets/images/close.svg'
import Message from '../assets/images/message.svg'

const token = 'bvhl_qg-4ho.2TlPRJ9vN5qxHn5KJ0OZLHY9Sd3D8LBQFjtR3wULFLM'
const YOUR_USER_ID = 'YOUR_USER_ID'

const Chat = () => {
  const [showChat, setShowChat] = useState(false)
  const dir = useRef(new DirectLine({ token }))
  const style = {
    display: showChat ? 'inherit' : 'none',
  }
  return (
    <>
      <div
        className="floating-button text-white"
        onClick={() => setShowChat((currentState) => !currentState)}
      >
        {showChat ? <Close /> : <Message />}
      </div>
      {dir?.current ? (
        <div className="webchat" style={style}>
          <ReactWebChat directLine={dir?.current} userID={YOUR_USER_ID} />
        </div>
      ) : (
        <div />
      )}
    </>
  )
}

export default Chat
