import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  birthDate: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @ApiProperty()
  password: string;
}
