import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from 'src/entities/book.entity';

@Injectable()
export class BooksService extends Repository<BookEntity>{
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository: Repository<BookEntity>
    ) {
        super(
            bookRepository.target,
            bookRepository.manager,
            bookRepository.queryRunner 
        );
    }

    async createBook(dto: CreateBookDto): Promise<BookEntity> {
        const bookCreated = this.bookRepository.create(dto);
        return await this.bookRepository.save(bookCreated);
    }

    async getDetails(id: string): Promise<BookEntity> {
        return await this.bookRepository.findOneBy({id:id});
    }

    async getList(): Promise<BookEntity[]> {
        return await this.bookRepository.find();
    }
}
