import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { usersArrayMock } from '../../test/factory';
import { randomUUID } from 'crypto';
import { UserCreateDto } from './dto/user-create.dto';
import { Reflector } from '@nestjs/core';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let service: UsersService;
  let repository: Repository<User>;
  let users = usersArrayMock(3)

  const USERS_REPOSITORY_TOKEN = getRepositoryToken(User)

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: USERS_REPOSITORY_TOKEN,
        useValue: {
          create: (createUserDto: UserCreateDto) => {
            return {
              "id": randomUUID(),
              "name": createUserDto.name,
              "email": createUserDto.email,
              "phone": createUserDto.phone,
              "birthDate": createUserDto.birthDate,
              "isActive": true,
              "createdAt": Date(),
              "updatedAt": Date(),
              "deletedAt": null
            }
          },
          save: (user: User) => user,
          findOneBy: (params: { id?: string, email?: string }) => {
            if (Object.keys(params).includes('id')) {
              return users.filter(user => user.id === params.id)[0] || null
            }
            if (Object.keys(params).includes('email')) {
              return users.filter(user => user.email === params.email)[0] || null
            }
          },
          find: jest.fn().mockReturnValue(users),
          update: jest.fn(),
          createQueryBuilder: jest.fn(() => ({
            update: jest.fn().mockReturnThis(),
            set: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            execute: jest.fn().mockReturnThis()
          }))
        }
      },
        UsersService
      ]
    }).compile();

    service = moduleFixture.get<UsersService>(UsersService);
    repository = moduleFixture.get<Repository<User>>(USERS_REPOSITORY_TOKEN);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('(GET) /users should return an users array', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body).toHaveLength(3)
  });

  it('(GET) /users/:id should return a user', async () => {
    const res = await request(app.getHttpServer()).get(`/users/${users[0].id}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.name).toBe('Test User 0')
  })

  it('(GET) /users/:id should return an error if user not exists', async () => {
    const res = await request(app.getHttpServer()).get(`/users/${randomUUID()}`)
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toBe('User not found')
  })

  it('(POST) /users should create a user and crypt password', async () => {
    const spy = jest.spyOn(repository, 'save')
    const res = await request(app.getHttpServer()).post('/users').send({
      name: 'Test User',
      email: 'new@test.com',
      phone: '+5521900000000',
      birthDate: '1995-03-16',
      password: '123456',
    })
    expect(res.status).toBe(201)
    expect(res.body.name).toEqual('Test User')
    expect(res.body.isActive).toBeTruthy()
    expect(spy.mock.lastCall[0].password).not.toEqual('123456')
  })

  it('(POST) /users/:id should return a error if new email already exists', async () => {
    const res = await request(app.getHttpServer()).post('/users').send({
      name: 'Test User',
      email: users[1].email,
      phone: '+5521900000000',
      birthDate: '1995-03-16',
      password: '123456',
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toEqual('User with this email already exists')
  })

  it('(POST) /users/:id should return an errors array to null inputs', async () => {
    const res = await request(app.getHttpServer()).post('/users')
    expect(res.status).toBe(400)
    expect(res.body.message).toEqual([
      "name must be a string",
      "name should not be empty",
      "email must be an email",
      "email should not be empty",
      "phone must be a valid phone number",
      "phone should not be empty",
      "birthDate must be a valid ISO 8601 date string",
      "birthDate should not be empty",
      "password must be a string",
      "password must be longer than or equal to 6 characters",
      "password should not be empty"
    ])
  })

  it('(PUT) /users/:id should update a user', async () => {
    const spy = jest.spyOn(repository, 'update')
    const res = await request(app.getHttpServer()).put(`/users/${users[0].id}`).send({
      name: 'Test Updated'
    })
    expect(res.status).toBe(204)
    expect(res.body).toEqual({})
    expect(spy).toBeCalledWith(users[0].id, { name: 'Test Updated' })
  })

  it('(PUT) /users/:id should return a error if new email already exists', async () => {
    const res = await request(app.getHttpServer()).put(`/users/${users[0].id}`).send({
      email: users[1].email
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toEqual('User with this email already exists')
  })

  it('(PUT) /users/:id should return a error if user not exists', async () => {
    const res = await request(app.getHttpServer()).put(`/users/${randomUUID()}`).send({
      name: 'Test Updated'
    })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toBe('User not found')
  })

  it('(PUT) /users/:id should return an errors array to null inputs', async () => {
    const res = await request(app.getHttpServer()).put(`/users/${users[0].id}`).send({
      email: '',
      name: '',
      birthDate: '',
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toEqual([
      "name should not be empty",
      "email must be an email",
      "email should not be empty",
      "birthDate must be a valid ISO 8601 date string",
      "birthDate should not be empty"
    ])
  })

  it('(DELETE) /users/:id should delete a user', async () => {
    const res = await request(app.getHttpServer()).delete(`/users/${users[0].id}`)
    expect(res.status).toBe(204)
    expect(res.body).toEqual({});
  })
});
