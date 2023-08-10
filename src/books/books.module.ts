import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BookEntity } from 'src/entities/book.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([BookEntity]),
    ],
    providers: [BooksService],
    controllers: [BooksController],
    exports:[BooksService]
})

export class BooksModule {}
