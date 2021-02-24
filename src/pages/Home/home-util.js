const validadeRoomName = roomName => {
  //||
  if (roomName.length < 3)
    return { status: false, errorMessage: 'roomName too short' }


  if (roomName.length > 20)
    return { status: false, errorMessage: 'roomName too long' }

  return {
    status: true
  }
}

export {
  validadeRoomName
}