import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { BooksController } from './books.controller';
import { BookEntity } from '../entities/book.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([BookEntity])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
