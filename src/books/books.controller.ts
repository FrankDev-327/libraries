import { BooksService } from './books.service';
import { RoleGuard } from 'src/auth/role/role.guard';
import { BookEntity } from 'src/entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UsersService } from 'src/users/users.service';
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
  constructor(
    private userService: UsersService,
    private bookService: BooksService,
  ) {}

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiOkResponse({ type: ResponseBookDto })
  @Post()
  async createBook(
    @Body() dto: CreateBookDto,
    @currentUser() currentUser,
  ): Promise<BookEntity> {
    return await this.bookService.createBook(dto, currentUser);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  @Get('/:id')
  async getBookDetails(@Param('id') id: string): Promise<BookEntity> {
    const book = await this.bookService.getDetails(id);
    if (!book) {
      throw new NotFoundException('Book does not exist');
    }

    return book;
  }

  @Roles('ADMIN')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({ type: [ResponseBookDto] })
  @Get()
  async getBookList(): Promise<BookEntity[]> {
    return await this.bookService.getList();
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Update info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  @Put('/:id?')
  async updateBookInfo(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
    @currentUser() currentUser,
  ): Promise<BookEntity> {
    return await this.bookService.updateInfo(dto, id, currentUser);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({ type: ResponseBookDto })
  @Delete('/:id?')
  async deleteBookInfo(
    @Param('id') id: string,
    @currentUser() currentUser,
  ): Promise<BookEntity> {
    let _id = currentUser.id;
    if (id !== undefined) {
      _id = id;
    }

    const userBook = await this.userService.getUserInfo(_id);
    if (!userBook.book) {
      throw new NotFoundException('You do not have any book created');
    }

    const bookDeleted = userBook.book;
    userBook.book = null;
    await this.userService.updateInfo(userBook, userBook.id);
    return await this.bookService.deleteInfo(bookDeleted);
  }
}
