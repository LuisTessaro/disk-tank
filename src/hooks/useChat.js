import { useEffect, useRef, useState } from "react"
import socketIOClient from "socket.io-client"

const useChat = (roomId) => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIOClient(process.env.REACT_APP_SOCKETIO_URL, {
      query: { roomId },
    })

    socketRef.current.on('newChatMessage', (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      }
      setMessages((messages) => [...messages, incomingMessage])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId])

  const sendMessage = (messageBody) => {
    socketRef.current.emit('newChatMessage', {
      body: messageBody,
      senderId: socketRef.current.id,
    })
  }

  return { messages, sendMessage }
}

export default useChat