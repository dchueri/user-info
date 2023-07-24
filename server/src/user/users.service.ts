import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IUser } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import UserNotFoundException from '../common/exceptions/user-not-found.exception';
import UserAlreadyExistsException from '../common/exceptions/user-already-exists.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async getAll(): Promise<IUser[]> {
    return await this.usersRepository.find({
      where: {
        deletedAt: null,
      }
    })
  }

  async getOneById(id: string): Promise<IUser> {
    const user = await this.usersRepository.findOneBy({ id, deletedAt: null })
    if (!user) {
      throw new UserNotFoundException()
    }
    return user
  }

  async getOneByEmail(email: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({ email, deletedAt: null })
  }

  async create(createUserDto: UserCreateDto): Promise<IUser> {
    const existsUser = await this.getOneByEmail(createUserDto.email)
    if (existsUser) {
      throw new UserAlreadyExistsException()
    }
    const user = this.usersRepository.create(createUserDto)
    user.password = await this.hashPassword(createUserDto.password);
    return await this.usersRepository.save(user)
  }

  async update(id: string, updateUserDto: UserUpdateDto): Promise<void> {
    const user = await this.getOneById(id)
    if (!user) {
      throw new UserNotFoundException()
    }

    if (updateUserDto.email && user.email !== updateUserDto.email) {
      const emailExists = await this.getOneByEmail(updateUserDto.email)
      if (emailExists) {
        throw new UserAlreadyExistsException()
      }
    }

    await this.usersRepository.update(id, updateUserDto)
  }

  async delete(id: string): Promise<void> {
    const res = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ deletedAt: new Date().toISOString() })
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .execute()

    console.log(res)

    if (res.affected === 0) {
      throw new UserNotFoundException()
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
