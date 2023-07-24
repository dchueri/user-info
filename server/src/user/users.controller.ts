import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IUser } from './user.interface';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAll(): Promise<IUser[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IUser> {
    return await this.usersService.getOneById(id);
  }

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: UserCreateDTO): Promise<IUser> {
    return await this.usersService.create(createUserDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto): Promise<void> {
    await this.usersService.update(id, updateUserDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id)
  }
}
