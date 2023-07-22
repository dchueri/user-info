//@ts-nocheck
import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {

  async getAll(): Promise<IUser[]> {
    return 'users' 
  }

  async getOneById(id: string): Promise<IUser> {
    return 'userById' + id
  }

  async getOneByEmail(email: string): Promise<IUser> {
    return 'userByEmail' + email
  }

  async create(createUserDto: UserCreateDTO): Promise<IUser> {
    return 'createdUser'
  }

  async update(id: string, updateUserDto: UserUpdateDto): Promise<IUser> {
    return 'updatedUser'
  }

  async delete(id: string): Promise<void> {

  }
}
