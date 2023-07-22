import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString, IsString, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
