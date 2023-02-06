import { DirectLine } from 'botframework-directlinejs'
import ReactWebChat from 'botframework-webchat'
import { uniqueId } from 'lodash'
import React, { useRef, useState } from 'react'

import Close from '../../assets/images/close.svg'
import Message from '../../assets/images/message.svg'

const token = 'bvhl_qg-4ho.2TlPRJ9vN5qxHn5KJ0OZLHY9Sd3D8LBQFjtR3wULFLM'

// after mail comunication, they said no context is saved anywhere so there is no need to have persistent ID
const YOUR_USER_ID = uniqueId('bratislavask_')

const Chat = () => {
  const [showChat, setShowChat] = useState(false)
  const dir = useRef(new DirectLine({ token }))
  const style = {
    display: showChat ? 'inherit' : 'none',
  }

  const styleOptions = {
    botAvatarImage:
      'https://www.ukraineslovakia.sk/wp-content/uploads/2022/06/Screenshot-2022-06-08-at-16.12.40.png',
    botAvatarInitials: '',
    userAvatarInitials: 'A',
    hideUploadButton: true,
    suggestedActionBackground: 'red',
    suggestedActionHeight: '30px',
    bubbleBorderColor: 'red',
  }
  return (
    <>
      <div
        className="floating-button text-white"
        onClick={() => setShowChat((currentState) => !currentState)}
        onKeyDown={() => setShowChat((currentState) => !currentState)}
      >
        {showChat ? <Close /> : <Message />}
      </div>
      {dir?.current && (
        <div className="webchat" style={style}>
          <ReactWebChat
            directLine={dir?.current}
            userID={YOUR_USER_ID}
            styleOptions={styleOptions}
          />
        </div>
      )}
    </>
  )
}

export default Chat
