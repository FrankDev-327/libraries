import { typeormConfig } from 'orm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthChecAppkModule } from './health-check/health-check.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig),
    HealthChecAppkModule
  ],
})
export class AppModule {}
