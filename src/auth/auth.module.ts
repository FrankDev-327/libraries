import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/entities/user.entity';

@Module({
    imports:[
        UsersModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '30m' },
          }),
    ],
    exports:[AuthService],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}
