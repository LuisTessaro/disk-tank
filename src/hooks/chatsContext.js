import React, { useState, createContext } from 'react'

const ChatsContext = createContext()

export const ChatsProvider = props => {
  const [chats, _setChats] = useState()

  const setChats = data => setChats(data)


  return (
    <ChatsContext.Provider
      value={{
        // MARK: Data
        chats,
        // MARK: Functions
        setChats
      }}
      {...props}
    />
  )
}

export const useFilter = () => {
  const context = React.useContext(ChatsContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a ChatsPro')
  }
  return context
}