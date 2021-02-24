const validadeRoomName = roomName => {
  //||
  if (roomName.length < 3)
    return { status: false, errorMessage: 'roomName too short' }


  if (roomName.length > 20)
    return { status: false, errorMessage: 'roomName too long' }
  
  if (roomName.match(/\W|_/g))
    return { status: false, errorMessage: 'room cant have special characters like spaces or @' }

  return {
    status: true
  }
}

export {
  validadeRoomName
}