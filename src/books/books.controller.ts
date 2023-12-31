import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
import { BooksService } from './books.service';
import { RoleGuard } from '../auth/role/role.guard';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { UsersService } from '../users/users.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseBookDto } from './dto/response-book.dto';
import { UserGuard } from '../user-guard/user-guard.guard';
import { UserLogged } from '../current-user/user.logged.decorator';
import { CurrentUserDto } from 'src/current-user/dto/current.user.dto';

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
  @ApiBearerAuth('JWT-auth')
  @Post()
  async createBook(
    @Body() dto: CreateBookDto,
    @UserLogged() currentUser: CurrentUserDto,
  ): Promise<BookEntity> {
    return await this.bookService.createBook(dto, currentUser);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Get info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  @ApiBearerAuth('JWT-auth')
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
  @ApiBearerAuth('JWT-auth')
  @Get()
  async getBookList(): Promise<BookEntity[]> {
    return await this.bookService.getList();
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Update info about book by id' })
  @ApiOkResponse({ type: ResponseBookDto })
  @ApiBearerAuth('JWT-auth')
  @Put('/:id?') //TODO optional parameter
  async updateBookInfo(
    @Param('id') id: string,
    @Body() dto: UpdateBookDto,
    @UserLogged() currentUser: CurrentUserDto,
  ): Promise<BookEntity> {
    return await this.bookService.updateInfo(dto, id, currentUser);
  }

  @Roles('ADMIN', 'AUTHOR')
  @UseGuards(UserGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete book' })
  @ApiOkResponse({ type: ResponseBookDto })
  @ApiBearerAuth('JWT-auth')
  @Delete('/:id?') //TODO optional parameter
  async deleteBookInfo(
    @Param('id') id: string,
    @UserLogged() currentUser: CurrentUserDto,
  ): Promise<BookEntity> {
    //TODO this part was made like that because an ADMIN can delete author's book
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
