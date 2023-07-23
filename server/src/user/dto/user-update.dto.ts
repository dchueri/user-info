import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, IsString, MinLength, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('BR', { message: 'phone must be a valid phone number (e.g. +55900000000' })
  phone: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  birthDate: string;

  @IsOptional()
  @MinLength(6)
  @IsString()
  password: string;
}
