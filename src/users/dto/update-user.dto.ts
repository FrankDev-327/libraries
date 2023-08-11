import { Roles } from '../../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'ADMIN', enum: Roles })
  @IsString()
  @IsEnum(Roles)
  role: string;
}
