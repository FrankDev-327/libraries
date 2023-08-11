import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from 'src/entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService extends Repository<BookEntity> {
  constructor(
    private userService: UsersService,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {
    super(
      bookRepository.target,
      bookRepository.manager,
      bookRepository.queryRunner,
    );
  }

  async createBook(dto: CreateBookDto, currentUser): Promise<BookEntity> {
    let bookSaved, userId, user, bookCreated;

    if (dto.userId !== '') {
      userId = dto.userId;
      bookCreated = this.bookRepository.create(dto);
      bookSaved = await this.bookRepository.save(bookCreated);
      user = await this.userService.getUserInfo(dto.userId);
    } else {
      userId = currentUser.id;
      bookCreated = this.bookRepository.create(dto);
      bookSaved = await this.bookRepository.save(bookCreated);
      user = await this.userService.getUserInfo(currentUser.id);
    }

    let previousBook;
    if (user.book) {
      previousBook = user.book;
    }

    user.book = bookSaved;
    await this.userService.updateInfo(user, userId);
    await this.deleteInfo(previousBook);
    return bookSaved;
  }

  async getDetails(id: string): Promise<BookEntity> {
    return await this.bookRepository.findOneBy({ id: id });
  }

  async getList(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async updateInfo(
    dto: UpdateBookDto,
    id: string,
    currentUser,
  ): Promise<BookEntity> {
    let _id;
    if (id !== undefined) {
      _id = id;
      await this.bookRepository.update(id, { ...dto });
    } else {
      const user = await this.userService.getUserInfo(currentUser.id);
      Object.assign(user.book, { ...dto });
      _id = user.book.id;
      await this.bookRepository.save(user.book);
    }

    return await this.getDetails(_id);
  }

  async deleteInfo(dto: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.remove(dto);
  }
}
