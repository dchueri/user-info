import { HttpException, NotFoundException } from '@nestjs/common';

class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User with this email already exists', 400);
  }
}

export default UserAlreadyExistsException;
