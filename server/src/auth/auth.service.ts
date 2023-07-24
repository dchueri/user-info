import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../user/user.interface';
import { UsersService } from '../user/users.service';
import { User } from '../user/entities/users.entity';
import { IAuthService } from './interfaces/auth-service.interface';
import { UserPayload } from './interfaces/user-payload.interface';
import { UserToken } from './interfaces/user-token.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getOneByEmail(email);
    if (user) {
      const isValidPassword = await this.comparePassword(
        password,
        user.password,
      );
      if (isValidPassword) {
        return {
          ...user,
          password: '***',
        };
      }
    }
    throw new Error('E-mail or password provided is incorrect.');
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  login(user: IUser): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email
    };

    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      token: jwtToken,
    };
  }
}
