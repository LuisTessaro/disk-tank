import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { validadeRoomName } from './home-util'

import useChat from '../../hooks/useChat'
import { BiChevronDown } from 'react-icons/bi'

const ChatRoom = ({ roomId, activeChat }) => {
  const [isActive, setIsActive] = useState(true)
  const { messages, sendMessage } = useChat(roomId)
  const [newMessage, setNewMessage] = useState('')

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(newMessage)
    setNewMessage('')
  }

  return (
    <>
      <div className={`p-2 w-full  ${activeChat === roomId ? 'block' : 'hidden'}`}>
        <p className="bg-white p-4 bg-primary text-white" onClick={() => setIsActive(false)}>Room: {roomId}</p>
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

const Home = () => {
  const history = useHistory()
  const [hidden, setHidden] = useState(false)

  const [activeChat, setActiveChat] = useState()

  const [roomName, setRoomName] = useState('')
  const [err, setErr] = useState()

  const [rooms, setRooms] = useState([])


  const handleClick = roomId => {
    const validation = validadeRoomName(roomId)

    if (!validation.status)
      return setErr(validation.errorMessage)

    setRooms(rooms => {
      return [...rooms, roomId]
    })
  }

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value)
  }

  return (
    <div className="container mx-auto h-screen w-full flex flex-col items-center justify-center">
      <input
        type="text"
        placeholder="Room name"
        value={roomName}
        onChange={handleRoomNameChange}
        className={`w-full border border-solid p-8 rounded mb-4 outline-none focus:border-blue-400 ${err ? 'border-red-500' : 'border-blue-400'}`}
      />
      {err && <h5 className="text-red-500 text-xs mb-4 text-left w-full">Invalid room name {err}</h5>}
      <div onClick={() => handleClick(roomName)} className="w-full text-center bg-green-600 text-white text-xl p-8 cursor-pointer rounded">
        Join room
      </div>
      <div className="w-1/4 chats bg-gray-400">
        <div onClick={() => setHidden(!hidden)} className="w-full flex items-center justify-between p-4 bg-gray-700 cursor-pointer">
          <p className="text-white font-bold">Chats</p>
          <BiChevronDown className={`transform  ${hidden ? 'rotate-180' : 'rotate-0'} bg-purple-900 text-4xl rounded-full text-white transition-all duration-300`} />
        </div>
        <div className="grid p-2 grid-cols-2 gap-2">
          {rooms.map((room, key) => {
            return (
              <p key={key} className="p-2 font-bold rounded text-white border-primary border border-solid cursor-pointer" onClick={() => setActiveChat(room)}>{room}</p>
            )
          })}
        </div>

        <div className={`${hidden ? 'hidden' : 'block'}`}>
          {rooms.map((room, key) => {
            return (
              <>
                <div className="" key={key}>
                  <ChatRoom activeChat={activeChat} roomId={room} />
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home