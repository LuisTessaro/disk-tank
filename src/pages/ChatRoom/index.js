import React, { useState, useRef } from 'react'

import useChat from '../../hooks/useChat'

const ChatRoom = ({ roomId, activeChat }) => {
  const inputRef = useRef(null)
  const { messages, sendMessage } = useChat(roomId)
  const [newMessage, setNewMessage] = useState('')

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (newMessage.length > 0)
      sendMessage(newMessage)
    setNewMessage('')
    inputRef.current.focus()
  }

  return (
    <>
      <div className={`p-2 w-full  ${activeChat === roomId ? 'block' : 'hidden'}`}>
        <p className="py-2">Room name: {roomId}</p>
        <div className="">
          <ul className="min-chat-height bg-gray-900">
            {messages.map((message, i) => (
              <li
                key={i}
                className="m-2"
              >
                {message.ownedByCurrentUser
                  ?
                  <p className={`text-white bg-blue-500 p-2`}>{message.body}</p>
                  :
                  <p className={`text-white bg-blue-900 p-2`}>{message.body}</p>
                }
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <textarea
            ref={inputRef}
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="w-full p-2 resize-none h-20"
          />
          <button onClick={handleSendMessage} className="text-white bg-green-600 w-full p-2">
            Send
      </button>
        </div>
      </div>
    </>
  )
}

export default ChatRoom