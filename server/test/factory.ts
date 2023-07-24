import { randomUUID } from "crypto"
import { IUser } from "src/user/user.interface"

export const userMock = (index: number) => {
  return {
    "id": randomUUID(),
    "name": `Test User ${index}`,
    "password": "123456",
    "email": `test${index}@test.com`,
    "birthDate": "1995-03-16",
    "isActive": true,
    "createdAt": "2023-07-24T12:05:04.995Z",
    "updatedAt": "2023-07-24T12:05:04.995Z",
    "deletedAt": null
  }
}

export const usersArrayMock = (quantity: number) => {
  const array = []
  for (let i = 0; i < quantity; i++) {
    array.push(userMock(i))
  }
  return array
}
