import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsEnum } from "class-validator";

export class CreateBookDto {
    @ApiProperty({example: 'Book title'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({example: 'Some description'})
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({example: 'Some publisher'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    publisher: string;
}