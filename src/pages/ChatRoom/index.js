import React from 'react'

import useChat from '../../hooks/useChat'

const ChatRoom = (props) => {
  const { roomId } = props.match.params
  const { messages, sendMessage } = useChat(roomId)
  const [newMessage, setNewMessage] = React.useState('')

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`text-white ${message.ownedByCurrentUser ? "bg-blue-500" : "bg-blue-900"}`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className=""
      />
      <button onClick={handleSendMessage} className="">
        Send
      </button>
    </div>
  )
}

export default ChatRoom