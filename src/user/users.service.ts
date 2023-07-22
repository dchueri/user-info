import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IUser } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import * as dayjs from 'dayjs';

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
    return await this.usersRepository.findOneBy({ id, deletedAt: null })
  }

  async getOneByEmail(email: string): Promise<IUser> {
    return await this.usersRepository.findOneBy({ email, deletedAt: null })
  }

  async create(createUserDto: UserCreateDTO): Promise<IUser> {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user)
  }

  async update(id: string, updateUserDto: UserUpdateDto): Promise<IUser> {
    const updateResult = await this.usersRepository
      .createQueryBuilder()
      .update(id, updateUserDto)
      .where({ deletedAt: null })
      .execute()
    return updateResult.raw;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository
      .createQueryBuilder()
      .update(id, { deletedAt: dayjs().toISOString() })
      .where({ deletedAt: null })
      .execute()
  }
}
