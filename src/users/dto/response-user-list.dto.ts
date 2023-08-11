import { Roles } from '../../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ReponseUserListDto {
  @ApiProperty({ example: 'b0e54296-9716-45f5-aae6-014efc40f295' })
  readonly id: string;

  @ApiProperty({ example: 'Franjo' })
  readonly name: string;

  @ApiProperty({ example: 'Gonzalez' })
  readonly lastName: string;

  @ApiProperty({ example: 'example@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'ADMIN', enum: Roles })
  readonly role: string;

  @ApiProperty({ example: true })
  readonly sctive: boolean;

  @ApiProperty({ example: '2023-07-29 21:24:35.313657' })
  readonly created: string;

  @ApiProperty({ example: '2023-07-29 21:24:35.313657' })
  readonly updated: string;
}
