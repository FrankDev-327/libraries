import { BooksService } from './books.service';
import { BookEntity } from 'src/entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ResponseBookDto } from './dto/response-book.dto';
import { UserGuard } from 'src/user-guard/user-guard.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';


@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(
        private bookService: BooksService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new book' })
    @ApiOkResponse({ type: ResponseBookDto })
    async createBook(@Body() dto: CreateBookDto): Promise<BookEntity> {
        return await this.bookService.createBook(dto);
    }

    @Get("/:id")
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get info about book by id' })
    @ApiOkResponse({ type: ResponseBookDto })
    async getBookDetails(@Param('id') id: string): Promise<BookEntity> {
        return await this.bookService.getDetails(id);
    }

    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get all books' })
    @ApiOkResponse({ type: [ResponseBookDto] })
    async getBookList(): Promise<BookEntity[]> {
        return await this.bookService.getList();
    }
}
