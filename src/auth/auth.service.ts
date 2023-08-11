import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparing } from '../utils/helper';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ResponseLogin } from './dto/response-login.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService extends Repository<UserEntity> {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
  ) {
    super(
      authRepository.target,
      authRepository.manager,
      authRepository.queryRunner,
    );
  }

  async login(dto: LoginUserDto): Promise<ResponseLogin> {
    const userData = await this.authRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!userData)
      throw new NotFoundException(
        'This identification does not exsti or password is wrong.',
      );
    const comparePass = await comparing(dto.password, userData.password);

    if (!comparePass)
      throw new NotFoundException(
        'This identification does not exsti or password is wrong.',
      );
    return {
      token: await this.jwtService.signAsync({
        id: userData.id,
        role: userData.role,
      }),
    };
  }
}
