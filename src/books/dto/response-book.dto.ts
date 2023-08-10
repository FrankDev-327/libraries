import { ApiProperty } from "@nestjs/swagger";

export class ResponseBookDto {
    @ApiProperty({example: 'Book title'})
    readonly title: string;

    @ApiProperty({example: 'Some description'})
    readonly description: string;

    @ApiProperty({example: 'Some publisher'})
    readonly publisher: string;

    @ApiProperty({example: '2023-07-29 21:24:35.313657'})
    readonly created: string;

    @ApiProperty({example: '2023-07-29 21:24:35.313657'})
    readonly updated: string;
}