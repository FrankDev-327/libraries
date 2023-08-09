import { typeormConfig } from 'orm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthChecAppkModule } from './health-check/health-check.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),
    HealthChecAppkModule,
    UsersModule,
    BooksModule
  ],
  providers: [UsersService, BooksService],
  controllers: [UsersController, BooksController],
})
export class AppModule {}
