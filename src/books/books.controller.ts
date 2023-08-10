import { BooksService } from './books.service';
import { BookEntity } from 'src/entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ResponseBookDto } from './dto/response-book.dto';
import { UserGuard } from 'src/user-guard/user-guard.guard';
import { currentUser } from 'src/current-user/current-user.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiOkResponse({ type: ResponseBookDto })
  async createBook(
    @Body() dto: CreateBookDto,
    @currentUser() currentUser,
  ): Promise<BookEntity> {
    return await this.bookService.createBook(dto, currentUser.id);
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  async getBookDetails(@Param('id') id: string): Promise<BookEntity> {
    const book = await this.bookService.getDetails(id);
    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    return book;
  }

  @Get()
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [ResponseBookDto] })
  async getBookList(): Promise<BookEntity[]> {
    return await this.bookService.getList();
  }

  @Put('/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  async updateBookInfo(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
  ): Promise<BookEntity> {
    return await this.bookService.updateInfo(dto, id);
  }

  @Delete('/:id')
  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({ type: ResponseBookDto })
  async deleteBookInfo(@Param('id') id: string): Promise<BookEntity> {
    const book = await this.bookService.getDetails(id);
    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    return await this.bookService.deleteInfo(book);
  }
}
