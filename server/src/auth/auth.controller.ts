import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import UserNotFoundException from '../common/exceptions/user-not-found.exception';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/auth-request.interface';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ summary: 'Autentica um usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado',
  })
  @ApiResponse({
    status: 401,
    description: 'E-mail ou senha incorretos',
  })
  @ApiBody({ type: LoginDto })
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    const jwt = this.authService.login(req.user);
    if (!jwt) {
      throw new UserNotFoundException();
    }
    return jwt;
  }
}
