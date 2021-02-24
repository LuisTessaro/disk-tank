const { validadeRoomName } = require('./home-util')

test('text must be over 3 characters falsy', () => {
  expect(validadeRoomName('Ro')).toStrictEqual({ status: false, errorMessage: 'roomName too short' })
})

test('text must be over 3 characters', () => {
  expect(validadeRoomName('RoomName')).toStrictEqual({ status: true })
})


test('text must be under 20 characters falsy', () => {
  expect(validadeRoomName('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toStrictEqual({ status: false, errorMessage: 'roomName too long' })
})

test('text must be under 20 characters', () => {
  expect(validadeRoomName('RoomName123')).toStrictEqual({ status: true })
})

test('text must not contain special characters or numbers falsy', () => {
  expect(validadeRoomName('test room')).toStrictEqual({ status: false, errorMessage: 'room cant have special characters like spaces or @' })
})

test('text must not contain special characters or numbers', () => {
  expect(validadeRoomName('testRoom')).toStrictEqual({ status: true })
})
