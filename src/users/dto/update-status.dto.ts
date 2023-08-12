import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusUserDto {
  @ApiProperty({ example: false })
  @IsBoolean()
  active: boolean;
}
