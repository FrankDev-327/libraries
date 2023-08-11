import { Roles } from '../../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Franjo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Gonzalez' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'ADMIN', enum: Roles })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Roles)
  role: string;
}
