import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from '../entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class BooksService {
  constructor(
    private userService: UsersService,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async createBook(dto: CreateBookDto, currentUser): Promise<BookEntity> {
    //TODO this part was made like that because an ADMIN can create author's book or his own
    const userId = dto.userId !== '' ? dto.userId : currentUser.id;

    const bookCreated = this.bookRepository.create(dto);
    const bookSaved = await this.bookRepository.save(bookCreated);
    const user = await this.userService.getUserInfo(userId);

    //TODO delete the previous user's book
    const previousBook = user?.book;
    if (previousBook) {
      await this.deleteInfo(previousBook);
    }

    user.book = bookSaved;
    await this.userService.updateInfo(user, userId);
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
    //TODO this part was made like that because an ADMIN can update author's book or his own
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
