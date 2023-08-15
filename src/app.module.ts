import { typeormConfig } from '../orm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { HealthChecAppkModule } from './health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),
    HealthChecAppkModule,
    UsersModule,
    BooksModule,
    AuthModule,
  ],
})
export class AppModule {}
