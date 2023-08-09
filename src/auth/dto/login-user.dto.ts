import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'example@gmail.com'})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({example: '123456789'})
    @IsNotEmpty()
    @IsString()
    password: string;
}