import React, { useState, createContext } from 'react'

const ChatsContext = createContext()

export const ChatsProvider = props => {
  const [data, _setData] = useState()

  const setData = data => _setData(data)


  return (
    <ChatsContext.Provider
      value={{
        // MARK: Data
        data,
        // MARK: Functions
        setData
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