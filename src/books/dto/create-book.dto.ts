import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: '0120b3c2-6059-45f0-80dc-55524f567e35le' })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Book title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Some description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Some publisher' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  publisher: string;
}
