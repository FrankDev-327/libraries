import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from 'src/entities/book.entity';
import { UsersService } from 'src/users/users.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService extends Repository<BookEntity>{
    constructor(
        private userService: UsersService,
        private amqpConnection: AmqpConnection,
        @InjectRepository(BookEntity)
        private bookRepository: Repository<BookEntity>,
    ) {
        super(
            bookRepository.target,
            bookRepository.manager,
            bookRepository.queryRunner 
        );
    }

    async createBook(dto: CreateBookDto, userId: string): Promise<BookEntity> {
        const bookCreated = this.bookRepository.create(dto);
/*         await this.amqpConnection.publish(
            'book.relation',
            'book-relation-route',
            'book-relation-queue',
            {
                user_id: userId
            }
        ); */
        const user = await this.userService.getUserInfo(userId);
        const bookSaved = await this.bookRepository.save(bookCreated);
        user.book = bookSaved;
        await this.userService.updateInfo(user);
        
        return bookSaved;
    }

    async getDetails(id: string): Promise<BookEntity> {
        return await this.bookRepository.findOneBy({id:id});
    }

    async getList(): Promise<BookEntity[]> {
        return await this.bookRepository.find();
    }

    async updateInfo(dto: UpdateBookDto, id: string): Promise<BookEntity> {
        await this.bookRepository.update(id, {...dto});
        return await this.getDetails(id);
    }

    async deleteInfo(dto:BookEntity): Promise<BookEntity> {
        return await this.bookRepository.remove(dto);
    }
}
