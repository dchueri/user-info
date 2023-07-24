import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { IUser } from './user.interface';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Pega todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get()
  async getAll(): Promise<IUser[]> {
    return await this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Pega um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IUser> {
    return await this.usersService.getOneById(id);
  }

  @ApiOperation({ summary: 'Cria um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado'
  })
  @ApiResponse({
    status: 400,
    description: 'E-mail já cadastrado'
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos'
  })
  @IsPublic()
  @Post()
  async create(@Body() createUserDto: UserCreateDto): Promise<IUser> {
    return await this.usersService.create(createUserDto)
  }

  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiResponse({
    status: 204,
    description: 'Usuário aualizado'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  @ApiResponse({
    status: 400,
    description: 'E-mail já cadastrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto): Promise<void> {
    await this.usersService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Pega um usuário pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'Usuário removido'
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado'
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id)
  }
}
