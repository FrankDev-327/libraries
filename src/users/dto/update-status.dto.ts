import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class UpdateStatusUserDto {
    @ApiProperty({example: false})
    @IsBoolean()
    active: boolean;
}