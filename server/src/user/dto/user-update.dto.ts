import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, IsString, MinLength, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'phone must be a valid phone number (e.g. +55900000000' })
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  @ApiProperty()
  birthDate: string;

  @IsOptional()
  @MinLength(6)
  @IsString()
  @ApiProperty()
  password: string;
}
