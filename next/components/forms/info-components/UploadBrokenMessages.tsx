import React from 'react'

interface UploadBrokenMessagesProps {
  fileBrokenMessages: string[]
}

const UploadBrokenMessages = ({ fileBrokenMessages }: UploadBrokenMessagesProps) => {
  return (
    <>
      {
        /* messages when file is broken/invalid before sending to bucket */
        fileBrokenMessages.map((message, key) => (
          <p key={key} className="w-full p-1 text-red-500">
            {message}
          </p>
        ))
      }
    </>
  )
}

export default UploadBrokenMessages
