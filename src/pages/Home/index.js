import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'

import { validadeRoomName } from './home-util'

import { BiChevronDown } from 'react-icons/bi'
import { FaTimesCircle } from 'react-icons/fa'

import ChatRoom from '../ChatRoom'
import Header from '../../components/Header'

const Home = () => {
  // const history = useHistory()
  const [hidden, setHidden] = useState(true)
  const [noRooms, setNoRooms] = useState()

  const [activeChat, setActiveChat] = useState()

  const [roomName, setRoomName] = useState('')
  const [err, setErr] = useState()

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    setHidden(false)
    setActiveChat('testelocal')

    setRooms(rooms => {
      return [...rooms, 'testelocal']
    })
  }, [])

  useEffect(() => setNoRooms(rooms.length === 0), [rooms])


  const handleClick = roomId => {
    const validation = validadeRoomName(roomId)

    if (!validation.status)
      return setErr(validation.errorMessage)

    if (rooms.includes(roomId))
      return setErr('You are already in that room')

    setHidden(false)
    setActiveChat(roomId)

    setRooms(rooms => {
      return [...rooms, roomId]
    })
  }

  const handleCloseChat = roomId => {
    setRooms(rooms => {
      return rooms.filter(e => e !== roomId)
    })
  }

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value)
  }

  return (
    <div className="h-screen">
      <img src="https://wallpaperaccess.com/full/4016047.jpg" className="bg-img" />
      <Header />
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <div className="text-white max-out">
        </div>
        <input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={handleRoomNameChange}
          className={`w-64 border border-solid p-8 rounded mb-4 outline-none focus:border-blue-400 ${err ? 'border-red-500' : 'border-blue-400'}`}
        />
        {err && <h5 className="text-red-500 text-xs mb-4 text-left w-64">Invalid room name {err}</h5>}
        <div onClick={() => handleClick(roomName)} className="w-64 text-center bg-green-600 text-white text-xl p-8 cursor-pointer rounded">
          Join room
        </div>
        <div className="chat-container chats bg-gray-400">
          <div onClick={() => setHidden(!hidden)} className="w-full flex items-center justify-between p-4 bg-gray-700 cursor-pointer">
            <p className="text-white font-bold">Chats</p>
            <BiChevronDown className={`transform  ${hidden ? 'rotate-180' : 'rotate-0'} bg-purple-900 text-4xl rounded-full text-white transition-all duration-300`} />
          </div>
          <div className={`${hidden ? 'hidden' : 'block'} grid grid-cols-2 gap-2 ${noRooms ? 'p-0' : 'p-2'}`}>
            {rooms.map((room, key) => {
              return (
                <div key={key} onClick={() => setActiveChat(room)} className="rounded text-white border-primary border border-solid cursor-pointer flex items-center justify-between p-2">
                  <p className="font-bold">{room}</p>
                  <FaTimesCircle onClick={() => handleCloseChat(room)} className="text-red-500" />
                </div>
              )
            })}
          </div>

          <div className={`${hidden ? 'hidden' : 'block'}`}>
            {rooms.map((room, key) => {
              return (
                <div className="" key={key}>
                  <ChatRoom activeChat={activeChat} roomId={room} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home