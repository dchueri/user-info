import { NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor() {
    super(`User not found`);
  }
}

export default UserNotFoundException;
