import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { generateAuthData, generateTokenData } from '../../test/auth.genertae';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('authentication user', () => {
    test('should auth user', async () => {
      const payload = generateAuthData();
      const tokenData = generateTokenData();
      const spy = jest.spyOn(service, 'login').mockResolvedValueOnce(tokenData);
      const auth = await service.login(payload);
      expect(auth).toEqual(tokenData);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
